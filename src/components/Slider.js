import React, { Component } from "react";
import PropTypes from "prop-types";
import { format as d3Format } from "d3-format";

const sliderStyle = {
  display: "block",
  paddingBottom: "8px",
  zIndex: "2"
};

const handleStyle = {
  cursor: "move"
};

class Slider extends Component {
  componentDidMount() {
    window.addEventListener("mousemove", this.mouseMove.bind(this), false);
    window.addEventListener("mouseup", this.dragEnd.bind(this), false);
  }

  componentWilUnmount() {
    window.removeEventListener("mousemove", this.mouseMove.bind(this), false);
    window.removeEventListener("mouseup", this.dragEnd.bind(this), false);
  }

  constructor() {
    super();
    this.state = {
      dragging: false
    };
  }

  dragStart(index, e) {
    e.stopPropagation();
    if (!this.state.dragging) {
      this.setState(
        {
          dragging: true,
          dragIndex: index
        },
        () => {
          this.props.dragChange(true);
        }
      );
    }
  }

  dragEnd(e) {
    e.stopPropagation();
    this.setState(
      {
        dragging: false
      },
      () => {
        this.props.dragChange(false);
      }
    );
  }

  dragFromSVG(e) {
    if (!this.state.dragging) {
      let selection = [...this.props.selection];
      let selected = this.props.scale.invert(e.nativeEvent.layerX);
      let dragIndex;

      if (
        Math.abs(selected - selection[0]) > Math.abs(selected - selection[1])
      ) {
        selection[1] = selected;
        dragIndex = 0;
      } else {
        selection[0] = selected;
        dragIndex = 1;
      }

      this.props.onChange(selection);
      this.setState(
        {
          dragging: true,
          dragIndex
        },
        () => {
          this.props.dragChange(true);
        }
      );
    }
  }

  mouseMove(e) {
    if (this.state.dragging) {
      let selection = [...this.props.selection];
      selection[this.state.dragIndex] = this.props.scale.invert(e.layerX);
      this.props.onChange(selection);
    }
  }

  render() {
    const {
      selection,
      scale,
      format,
      handleLabelFormat,
      width,
      height,
      reset,
      innerWidth,
      selectionColor
    } = this.props;
    const selectionWidth = Math.abs(scale(selection[1]) - scale(selection[0]));
    const selectionSorted = selection.sort();
    const f = d3Format(handleLabelFormat);
    return (
      <svg
        style={sliderStyle}
        height={height}
        width={width}
        onMouseDown={this.dragFromSVG.bind(this)}
        onDoubleClick={reset}
      >
        <rect height={4} fill={"#f1f1f1"} x={0} y={10} width={innerWidth} />
        <rect
          height={4}
          fill={selectionColor}
          x={scale(selectionSorted[0])}
          y={10}
          width={selectionWidth}
        />
        {selection.map((m, i) => {
          return (
            <g
              transform={`translate(${this.props.scale(m)}, 0)`}
              key={`handle-${i}`}
            >
              <circle
                style={handleStyle}
                r={10}
                cx={0}
                cy={12.5}
                fill="#ddd"
                strokeWidth="1"
              />
              <circle
                style={handleStyle}
                onMouseDown={this.dragStart.bind(this, i)}
                r={9}
                cx={0}
                cy={12}
                fill="white"
                stroke="#ccc"
                strokeWidth="1"
              />
              <text textAnchor="middle" x={0} y={36} fill="#666" fontSize={12}>
                {f(m)}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }
}

Slider.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x0: PropTypes.number,
      x: PropTypes.number,
      y: PropTypes.number
    })
  ).isRequired,
  selection: PropTypes.arrayOf(PropTypes.number).isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  innerWidth: PropTypes.number,
  padding: PropTypes.number,
  bucketSize: PropTypes.number,
  selectionColor: PropTypes.string,
  histogramPadding: PropTypes.number,
  scale: PropTypes.func,
  reset: PropTypes.func,
  dragChange: PropTypes.func,
  onChange: PropTypes.func,
  handleLabelFormat: PropTypes.string
};

export default Slider;
