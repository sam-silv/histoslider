import React, { Component } from "react";
import PropTypes from "prop-types";

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
      barPadding,
      width,
      max
    } = this.props;

    return (
      <div>
        <svg
          style={Object.assign(
            {
              display: "block"
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

                if (selection[0] > bucket.x || selection[1] < bucket.x0) {
                  opacity = 0;
                } else if (
                  selection[0] <= bucket.x0 &&
                  selection[1] >= bucket.x
                ) {
                  // Entire block is covered
                  opacity = 1;
                } else if (
                  selection[0] > bucket.x0 &&
                  selection[1] > bucket.x
                ) {
                  opacity =
                    1 - (selection[0] - bucket.x0) / (bucket.x - bucket.x0);
                  // Some of left block is covered
                } else if (
                  selection[1] < bucket.x &&
                  selection[0] < bucket.x0
                ) {
                  // Some of right block is covered
                  opacity = (selection[1] - bucket.x0) / (bucket.x - bucket.x0);
                } else {
                  // Parital match
                  opacity =
                    (selection[1] - selection[0]) / (bucket.x - bucket.x0);
                }
                return (
                  <g
                    key={i}
                    transform={`translate(${scale(bucket.x0) +
                      barPadding / 2} 0)`}
                  >
                    <rect
                      fill={unselectedColor}
                      width={scale(bucket.x) - scale(bucket.x0) - barPadding}
                      height={bucket.y / max * height}
                      rx={barBorderRadius}
                      ry={barBorderRadius}
                      x={0}
                    />
                    <rect
                      fill={selectedColor}
                      onClick={this.selectBucket.bind(this, bucket)}
                      onDoubleClick={reset.bind(this)}
                      style={Object.assign(
                        { opacity, cursor: "pointer" },
                        barStyle
                      )}
                      width={scale(bucket.x) - scale(bucket.x0) - barPadding}
                      height={bucket.y / max * height}
                      rx={barBorderRadius}
                      ry={barBorderRadius}
                      x={0}
                    />
                  </g>
                );
              })}
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

Histogram.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x0: PropTypes.number,
      x: PropTypes.number,
      y: PropTypes.number
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
