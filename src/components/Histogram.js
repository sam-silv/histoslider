import React, { Component } from "react";
import PropTypes from "prop-types";
import { Motion, spring } from "react-motion";

class Histogram extends Component {
  selectBucket(bucket) {
    this.props.onChange([bucket.x0, bucket.x]);
  }

  render() {
    const {
      height,
      data,
      histogramStyle,
      showOnDrag,
      selection,
      histogramPadding,
      reset,
      selectedColor,
      unselectedColor,
      selectBucket,
      scale,
      barBorderRadius,
      barStyle,
      padding,
      barPadding,
      width,
      max,
      dragging,
      occlusionColor
    } = this.props;

    const selectionSorted = Array.from(selection).sort((a, b) => +a - +b);
    const showHistogramPredicate = showOnDrag
      ? dragging ? true : false
      : true;
    const h = showHistogramPredicate ? height : 0;
    const o = showHistogramPredicate ? 1 : 0;

    return (
      <Motion style={{ height: spring(h), opacity: spring(o) }}>
        {s => {
          return (
            <div
              style={Object.assign({}, s, {
                overflow: "hidden",
                position: showOnDrag && "absolute",
                bottom: showOnDrag && `calc(100% - ${padding}px)`,
                position: "absolute",
                top: 0
              })}
            >
              <svg
                style={Object.assign(
                  {
                    display: "block",
                    backgroundColor: "white"
                  },
                  histogramStyle
                )}
                width={width}
                height={height}
              >
                <g transform={`translate(0, ${height})`}>
                  <g transform="scale(1,-1)">
                    {data.map((bucket, i) => {
                      let opacity = 0;

                      if (
                        selectionSorted[0] > bucket.x ||
                        selectionSorted[1] < bucket.x0
                      ) {
                        opacity = 0;
                      } else if (
                        selectionSorted[0] <= bucket.x0 &&
                        selectionSorted[1] >= bucket.x
                      ) {
                        // Entire block is covered
                        opacity = 1;
                      } else if (
                        selectionSorted[0] > bucket.x0 &&
                        selectionSorted[1] > bucket.x
                      ) {
                        opacity =
                          1 -
                          (selectionSorted[0] - bucket.x0) /
                            (bucket.x - bucket.x0);
                        // Some of left block is covered
                      } else if (
                        selectionSorted[1] < bucket.x &&
                        selectionSorted[0] < bucket.x0
                      ) {
                        // Some of right block is covered
                        opacity =
                          (selectionSorted[1] - bucket.x0) /
                          (bucket.x - bucket.x0);
                      } else {
                        // Parital match
                        opacity =
                          (selectionSorted[1] - selectionSorted[0]) /
                          (bucket.x - bucket.x0);
                      }

                      let bucket_y = typeof bucket.y === 'number' ? [ bucket.y ] : bucket.y;
                      let width = scale(bucket.x) - scale(bucket.x0) - barPadding

                      return (
                        <g
                          key={i}
                          transform={`translate(${scale(bucket.x0) +
                            barPadding / 2} 0)`}
                        >
                          {
                            bucket_y.map((k, i) => 
                                <rect
                                  key={i}
                                  fill={selectedColor}
                                  className={'bar-' + i}
                                  onClick={this.selectBucket.bind(this, bucket)}
                                  onDoubleClick={reset.bind(this)}
                                  style={Object.assign(
                                    {
                                      // opacity: 0.1 + 0.9 * (selection[0] > selection[1] ? (1 - opacity) : opacity), 
                                      cursor: "pointer" 
                                    },
                                    barStyle
                                  )}
                                  width={width}
                                  height={k / max * height}
                                  rx={barBorderRadius}
                                  ry={barBorderRadius}
                                  x={0}
                                  y={bucket_y.slice(0, i).reduce((a, b) => a + b, 0) / max * height}
                                />)
                          }
                        </g>
                      );
                    })}
                  </g>
                </g>
                  {
                    selection[0] < selection[1] ? <g>
                      <rect
                        width={scale(selectionSorted[0])}
                        fill={'rgba(255,255,255,.9)'}
                        height={height}
                        x={0}
                        y={0}
                      />
                      <rect
                        width={width - scale(selectionSorted[1])}
                        fill={occlusionColor}
                        height={height}
                        x={scale(selectionSorted[1])}
                        y={0}
                      />
                    </g>
                    : <rect
                      width={scale(selectionSorted[1] - selectionSorted[0])}
                      fill={occlusionColor}
                      height={height}
                      x={scale(selectionSorted[0])}
                      y={0}
                    />
                  }
                  
              </svg>
            </div>
          );
        }}
      </Motion>
    );
  }
}

Histogram.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x0: PropTypes.number,
      x: PropTypes.number,
      y: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number)
      ])
    })
  ).isRequired,
  selection: PropTypes.arrayOf(PropTypes.number).isRequired,
  barBorderRadius: PropTypes.number,
  bucketSize: PropTypes.number,
  width: PropTypes.number,
  innerWidth: PropTypes.number,
  height: PropTypes.number,
  showOnDrag: PropTypes.bool,
  reset: PropTypes.func,
  onChange: PropTypes.func
};

Histogram.defaultProps = {
  histogramPadding: 1
};

export default Histogram;
