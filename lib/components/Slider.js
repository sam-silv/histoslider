import React, { Component, PropTypes } from 'react'
import arrays from 'd3-arrays'

const sliderStyle = {
  display: 'block'
}

export default class Slider extends Component {
  render () {
    const selection = this.props.selection.sort(arrays.ascending)
    const innerHeight = this.props.height - this.props.padding
    const innerWidth = this.props.width - this.props.padding * 2
    const selectionWidth = ((selection[1] - selection[0]) / this.props.end) * innerWidth

    return (
      <svg style={sliderStyle} height={this.props.height} width={this.props.width}>
        <rect
          height={innerHeight}
          width={this.props.width - this.props.padding * 2 }
          x={this.props.padding}
          y={0}
          fill='#fafafa'
        />
        <rect
          height={2}
          fill='#2ecc71'
          x={ Math.max((((this.props.selection[0] - this.props.start) / this.props.end) * innerWidth) + this.props.padding, this.props.padding) }
          y={(innerHeight / 2) - 1}
          width={selectionWidth}
        />
        <circle
          r={innerHeight / 2}
          cx={ (((this.props.selection[0] - this.props.start) / this.props.end) * innerWidth) + this.props.padding }
          cy={innerHeight / 2}
          fill='white' stroke='#2ecc71' strokeWidth='2'
        />
        <circle
          r={innerHeight / 2}
          cx={ Math.min((((this.props.selection[1] - this.props.start) / this.props.end) * innerWidth) + this.props.padding, this.props.width ) }
          cy={innerHeight / 2}
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
