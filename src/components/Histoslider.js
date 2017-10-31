import React, { Component } from "react";
import PropTypes from "prop-types";
import { max, min } from "d3-array";
import { scaleLinear as linear } from "d3-scale";

import Histogram from "./Histogram";
import Slider from "./Slider";

const SLIDER_HEIGHT = 30;

class Histoslider extends Component {
  constructor() {
    super();
    this.state = {
      dragging: false
    };
  }

  dragChange = dragging => {
    // TODO - debounce
    this.setState({ dragging });
  };

  onChange = selection => {
    const { data, onChange } = this.props;
    const sortedData = data.sort((a, b) => +a.x0 - +b.x0);
    const extent = [
      min(sortedData, ({ x0 }) => +x0),
      max(sortedData, ({ x }) => +x)
    ];
    onChange(selection.map(d => Math.max(extent[0], Math.min(extent[1], +d))));
  };

  reset = () => {
    this.props.onChange(null);
  };

  render() {
    const {
      style,
      data,
      width,
      height,
      padding,
      sliderHeight,
      disableHistogram
    } = this.props;

    const innerHeight = height - padding * 2;
    const innerWidth = width - padding * 2;
    const histogramHeight = innerHeight - sliderHeight;

    const sortedData = data.sort((a, b) => +a.x0 - +b.x0);
    const extent = [
      min(sortedData, ({ x0 }) => +x0),
      max(sortedData, ({ x }) => +x)
    ];
    const maxValue = max(sortedData, ({ y }) => Array.isArray(y) ? y.reduce((a, b) => a + b) : (+y) );
    const scale = linear().domain(extent).range([0, innerWidth]);
    scale.clamp(true);

    const selection = this.props.selection || extent;

    const overrides = {
      selection,
      data: sortedData,
      scale,
      max: maxValue,
      dragChange: this.dragChange,
      onChange: this.onChange,
      reset: this.reset,
      width: innerWidth,
      dragging: this.state.dragging
    };

    return (
      <div
        style={Object.assign({}, style, {
          width,
          padding,
          boxSizing: "border-box",
          position: "relative"
        })}
        className="Histoslider Histoslider--wrapper"
      >
        {!disableHistogram &&
          <Histogram
            {...Object.assign({}, this.props, overrides, {
              height: histogramHeight
            })}
          />}
        <Slider
          {...Object.assign({}, this.props, overrides, {
            height: sliderHeight
          })}
        />
      </div>
    );
  }
}

Histoslider.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x0: PropTypes.number,
      x: PropTypes.number,
      y: PropTypes.number
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedColor: PropTypes.string,
  unselectedColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  selection: PropTypes.arrayOf(PropTypes.number),
  barStyle: PropTypes.object,
  barBorderRadius: PropTypes.number,
  barPadding: PropTypes.number,
  histogramStyle: PropTypes.object,
  sliderStyle: PropTypes.object,
  showOnDrag: PropTypes.bool,
  style: PropTypes.object,
  handleLabelFormat: PropTypes.string,
  disableHistogram: PropTypes.bool
};

Histoslider.defaultProps = {
  selectedColor: "#0074D9",
  unselectedColor: "#DDDDDD",
  showOnDrag: false,
  width: 400,
  height: 200,
  barBorderRadius: 0,
  barPadding: 3,
  padding: 20,
  sliderHeight: 25,
  handleLabelFormat: "0.3P"
};

export default Histoslider;
