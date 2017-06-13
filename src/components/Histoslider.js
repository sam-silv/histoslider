import React, { Component } from "react";
import PropTypes from "prop-types";
import { max, min } from "d3-array";
import { scaleLinear as linear } from "d3-scale";

import Histogram from "./Histogram";
import Slider from "./Slider";

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

  reset = () => {
    this.props.onChange(null);
  };

  render() {
    const { style, data, width } = this.props;
    const sortedData = data.sort((a, b) => a.x0 - b.x0);
    const extent = [
      min(sortedData, ({ x0 }) => x0),
      max(sortedData, ({ x }) => x)
    ];
    const maxValue = max(sortedData, ({ y }) => y);
    const scale = linear().domain(extent).range([0, width]);

    // FIXME
    const selection = this.props.selection || extent;

    const overrides = {
      selection,
      data: sortedData,
      scale,
      max: maxValue,
      dragChange: this.dragChange,
      reset: this.reset
    };

    return (
      <div
        style={Object.assign({}, style, {
          width
        })}
        className="Histoslider Histoslider--wrapper"
      >
        {(!this.props.showOnDrag || this.state.dragging) &&
          <Histogram {...Object.assign({}, this.props, overrides)} />}
        <Slider {...Object.assign({}, this.props, overrides)} />
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
  selectionColor: PropTypes.string,
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
  handleLabelFormat: PropTypes.string
};

Histoslider.defaultProps = {
  selectionColor: "coral",
  showOnDrag: false,
  width: 400,
  height: 200,
  barBorderRadius: 3,
  barPadding: 1,
  style: {},
  histogramStyle: {},
  sliderStyle: {},
  barStyle: {},
  handleLabelFormat: "0.3P"
};

export default Histoslider;
