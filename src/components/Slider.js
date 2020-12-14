import React, { Component } from "react";
import PropTypes from "prop-types";
import { format as d3Format } from "d3-format";

const handleStyle = {
  cursor: "move",
  userSekect: "none",
  MozUserSelect: "none",
  KhtmlUserSelect: "none",
  WebkitUserSelect: "none",
  OUserSelect: "none",
};

// Map keycodes to positive or negative values
export const mapToKeyCode = (code) => {
  const codes = {
    37: -1,
    38: 1,
    39: 1,
    40: -1,
  };
  return codes[code] || null;
};

class Slider extends Component {
  constructor() {
    super();
    this.state = {
      dragging: false,
      defaultOffset: 0,
    };
  }

  componentDidMount() {
    window.addEventListener("mouseup", this.dragEnd, false);
    window.addEventListener("touchend", this.dragEnd, false);
    window.addEventListener("resize", this.handleResize, false);
    if (this.refs.slider) {
      this.setState({
        defaultOffset: this.refs.slider.getBoundingClientRect().left,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this.dragEnd, false);
    window.removeEventListener("touchend", this.dragEnd, false);
    window.addEventListener("resize", this.handleResize, false);
  }

  handleResize = () => {
    if (this.refs.slider) {
      this.setState({
        defaultOffset: this.refs.slider.getBoundingClientRect().left,
      });
    }
  };

  dragStart = (index, e) => {
    e.stopPropagation();
    if (this.state.dragging) return;
    this.setState(
      {
        dragging: true,
        dragIndex: index,
      },
      () => {
        this.props.dragChange(true);
      }
    );
  };

  dragEnd = (e) => {
    e.stopPropagation();
    this.setState(
      {
        dragging: false,
        dragIndex: null,
      },
      () => {
        this.props.dragChange(false);
      }
    );
  };

  getOffsetXFromEvent = (e, isTouch) => {
    const { defaultOffset } = this.state;
    let offsetX = 0;
    if (!isTouch) return e.nativeEvent.pageX - defaultOffset;
    else offsetX = e.targetTouches[0].pageX - defaultOffset;
    Math.round(offsetX);
    return offsetX;
  };

  dragFromSVG = (e, isTouch) => {
    if (this.state.dragging) return;
    let selection = [...this.props.selection];
    let selected = this.props.scale.invert(
      this.getOffsetXFromEvent(e, isTouch)
    );

    let dragIndex;

    if (Math.abs(selected - selection[0]) > Math.abs(selected - selection[1])) {
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
        dragIndex,
      },
      () => {
        this.props.dragChange(true);
      }
    );
  };

  mouseMove = (e, isTouch) => {
    if (!this.state.dragging) return;
    let selection = [...this.props.selection];
    selection[this.state.dragIndex] = this.props.scale.invert(
      this.getOffsetXFromEvent(e, isTouch)
    );
    this.props.onChange(selection);
  };

  keyDown = (index, e) => {
    const direction = mapToKeyCode(e.keyCode);
    const { keyboardStep } = this.props;
    let selection = [...this.props.selection];
    selection[index] = Math.round(selection[index] + direction * keyboardStep);
    this.props.onChange(selection);
  };

  render() {
    const {
      selection,
      scale,
      format,
      handleLabelFormat,
      formatLabelFunction,
      width,
      height,
      reset,
      innerWidth,
      selectedColor,
      unselectedColor,
      sliderStyle,
      showLabels,
    } = this.props;
    const selectionWidth = Math.abs(scale(selection[1]) - scale(selection[0]));
    const selectionSorted = Array.from(selection).sort((a, b) => +a - +b);
    const defaultLabelFormatFunction = d3Format(handleLabelFormat);
    const f = formatLabelFunction || defaultLabelFormatFunction;
    return (
      <svg
        style={sliderStyle}
        height={height}
        width={width}
        onMouseDown={(e) => this.dragFromSVG(e, false)}
        onMouseMove={(e) => this.mouseMove(e, false)}
        onTouchMove={(e) => this.mouseMove(e, true)}
        ref="slider"
      >
        <rect height={4} fill={unselectedColor} x={0} y={10} width={width} />
        <rect
          height={4}
          fill={selectedColor}
          x={scale(selectionSorted[0])}
          y={10}
          width={selectionWidth}
        />
        {selection.map((m, i) => {
          return (
            <g
              tabIndex={0}
              onKeyDown={this.keyDown.bind(this, i)}
              transform={`translate(${this.props.scale(m)}, 0)`}
              key={`handle-${i}`}
              style={{ outline: "none" }}
            >
              <circle
                className="circle-external"
                style={handleStyle}
                r={10}
                cx={0}
                cy={12.5}
                fill="#ddd"
                strokeWidth="1"
              />
              <circle
                className="circle-internal"
                style={handleStyle}
                r={9}
                cx={0}
                cy={12}
                fill="white"
                stroke="#ccc"
                strokeWidth="1"
              />
              <circle
                className="circle-transparent"
                style={handleStyle}
                onMouseDown={this.dragStart.bind(this, i)}
                onTouchStart={this.dragStart.bind(this, i)}
                r={30}
                cx={0}
                cy={12.5}
                fill="transparent"
                strokeWidth="1"
              />
              {showLabels ? (
                <text
                  style={handleStyle}
                  textAnchor="middle"
                  x={0}
                  y={36}
                  fill="#666"
                  fontSize={12}
                >
                  {f(m)}
                </text>
              ) : null}
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
      y: PropTypes.number,
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
  keyboardStep: PropTypes.number,
  dragChange: PropTypes.func,
  onChange: PropTypes.func,
  handleLabelFormat: PropTypes.string,
  formatLabelFunction: PropTypes.func,
  sliderStyle: PropTypes.object,
  showLabels: PropTypes.bool,
  labelStyle: PropTypes.object,
};

Slider.defaultProps = {
  sliderStyle: {
    display: "block",
    paddingBottom: "8px",
    zIndex: 6,
    overflow: "visible",
  },
  keyboardStep: 1,
  showLabels: true,
};

export default Slider;
