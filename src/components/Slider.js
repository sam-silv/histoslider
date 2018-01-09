import React, { Component } from "react";
import PropTypes from "prop-types";
import { format as d3Format } from "d3-format";

const handleStyle = {
  cursor: "move",
  userSekect: "none",
  MozUserSelect: "none",
  KhtmlUserSelect: "none",
  WebkitUserSelect: "none",
  OUserSelect: "none"
};

// Map keycodes to positive or negative values
export const mapToKeyCode = code => {
  const codes = {
    37: -1,
    38: 1,
    39: 1,
    40: -1
  };
  return codes[code] || null;
};

class Slider extends Component {
  componentDidMount() {
    window.addEventListener("mouseup", this.dragEnd, false);
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this.dragEnd, false);
  }

  constructor() {
    super();
    this.state = {
      dragging: false
    };
    this._mouseMove = this.mouseMove.bind(this)
  }

  dragStart = (index, e) => {
    e.stopPropagation();

    if (!this.state.dragging) {
      window.addEventListener("mousemove", this._mouseMove, false);

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
  };

  dragEnd = e => {
    window.removeEventListener("mousemove", this._mouseMove, false);

    e.stopPropagation();
    this.setState(
      {
        dragging: false,
        dragIndex: null
      },
      () => {
        this.props.dragChange(false);
      }
    );
  };

  dragFromSVG = e => {
    if (!this.state.dragging) {
      window.addEventListener("mousemove", this._mouseMove, false);

      let selection = [...this.props.selection];
      let selected = this.props.scale.invert(e.clientX - this.svg.getBoundingClientRect().x);
      let dragIndex = 2;

      let dy = e.clientY - this.svg.getBoundingClientRect().y

      if(dy < (this.props.height - this.props.sliderHeight)){
        this.setState({
          dragging: true,
          dragIndex: 1,
        }, () => {
          this.props.dragChange(true)
          this.props.onChange([selected, selected])
        })
      } else {
        this.setState({
          dragging: true,
          dragIndex,
          dragReference: selected - selection[0],
          dragWindow: selection[1] - selection[0]
        }, () => {
          this.props.dragChange(true)
        })              
      } 

    }
  };

  mouseMove = e => {
    if (this.state.dragging) {
      let selection = [...this.props.selection];
      let pos = this.props.scale.invert(e.clientX - this.svg.getBoundingClientRect().x);


      if(this.state.dragIndex < 2){
        selection[this.state.dragIndex] = pos;  
      }else{
        selection = [
          pos - this.state.dragReference,
          pos - this.state.dragReference + this.state.dragWindow
        ]
      }
      
      this.props.onChange(selection);
    }
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
      width,
      height,
      reset,
      innerWidth,
      selectedColor,
      unselectedColor,
      sliderStyle
    } = this.props;
    const selectionWidth = Math.abs(scale(selection[1]) - scale(selection[0]));
    const selectionSorted = Array.from(selection).sort((a, b) => +a - +b);
    const f = d3Format(handleLabelFormat);
    return (
      <svg
        style={sliderStyle}
        height={height}
        width={width}
        onMouseDown={this.dragFromSVG}
        onDoubleClick={reset}
        ref={e => this.svg = e}
      >
        <rect height={4} fill={unselectedColor} x={0} y={height-40 + 10} width={width} />
        {selection[0] < selection[1] ? <rect
          height={4}
          fill={selectedColor}
          x={scale(selectionSorted[0])}
          y={height-40 + 10}
          className='selected-slider-range'
          width={selectionWidth}
        /> : [
          <rect
            key='left'
            className='selected-slider-range'
            height={4}
            fill={selectedColor}
            x={0}
            y={height-40 + 10}
            width={scale(selectionSorted[0])}
          />,
          <rect
            key='right'
            className='selected-slider-range'
            height={4}
            fill={selectedColor}
            x={scale(selectionSorted[1])}
            y={height-40 + 10}
            width={width - scale(selectionSorted[1])}
          />
        ]}
        {selection.map((m, i) => {
          return (
            <g
              tabIndex={0}
              onKeyDown={this.keyDown.bind(this, i)}
              transform={`translate(${this.props.scale(m)}, 0)`}
              key={`handle-${i}`}
            >
              <circle
                style={handleStyle}
                onMouseDown={this.dragStart.bind(this, i)}
                r={9}
                cx={0}
                cy={height - 38 + 10}
                fill="white"
                stroke="#ccc"
                strokeWidth="1"
              />
              <text
                style={handleStyle}
                textAnchor={i == 0 ? "start" : "end"}
                x={i == 0 ? -9 : 9}
                y={height - 15 + 10}
                fill="#666"
                fontSize={12}
              >
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
      y: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number)
      ])
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
  sliderStyle: PropTypes.object
};

Slider.defaultProps = {
  sliderStyle: {
    display: "block",
    zIndex: 6,
    overflow: "visible",
    position: "relative"
  },
  keyboardStep: 1
};

export default Slider;
