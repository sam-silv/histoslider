import React, { Component, PropTypes } from 'react'

const sliderStyle = {
  display: 'block'
}


export default class Slider extends Component {
  render () {
    return (
      <svg style={sliderStyle} height={this.props.height} width={this.props.width}>
        <rect height={this.props.height} width={this.props.width - this.props.histogramPadding} x={this.props.histogramPadding / 2} y={0} />
      </svg>
    )
  }
}

Slider.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  start: PropTypes.number,
  end: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  bucketSize: PropTypes.number,
  histogramPadding: PropTypes.number
}
