import React, { Component, PropTypes } from 'react'
import arrays from 'd3-arrays'

const sliderStyle = {
  display: 'block'
}

export default class Slider extends Component {
  render () {
    const selection = this.props.selection.sort(arrays.ascending)
    const selectionWidth = ((selection[1] - selection[0]) / this.props.end) * this.props.width

    return (
      <svg style={sliderStyle} height={this.props.height} width={this.props.width}>
        <rect
          height={this.props.height}
          width={this.props.width - this.props.histogramPadding}
          x={this.props.histogramPadding / 2}
          y={0}
          fill='#fafafa'
        />
        <rect
          height={2}
          fill='#2ecc71'
          x={ ((this.props.selection[0] - this.props.start) / this.props.end) * this.props.width }
          y={(this.props.height / 2) - 1}
          width={selectionWidth}
        />
        <circle
          r={this.props.height / 3}
          cy={this.props.height / 2}
          cx={ ((this.props.selection[0] - this.props.start) / this.props.end) * this.props.width }
          fill='white' stroke='#2ecc71' strokeWidth='2'
        />
        <circle
          r={this.props.height / 3}
          cx={((this.props.selection[1] - this.props.start) / this.props.end) * this.props.width }
          cy={this.props.height / 2}
          fill='white' stroke='#2ecc71'
          strokeWidth='2'
        />
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
  selection: PropTypes.arrayOf(PropTypes.number).isRequired,
  histogramPadding: PropTypes.number
}
