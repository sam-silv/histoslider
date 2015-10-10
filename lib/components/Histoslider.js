import React, { Component, PropTypes } from 'react'
import arrays from 'd3-arrays'
import s from 'd3-scale'

import Histogram from './Histogram'
import Slider from './Slider'

const histosliderStyle = {
  position: 'relative',
  backgroundColor: '#fafafa'
}

export default class Histoslider extends Component {

  render () {
    const extent = arrays.extent(this.props.data)
    const start = this.props.start || extent[0]
    const end = this.props.end || extent[1] + this.props.bucketSize
    const innerWidth = this.props.width - (this.props.padding * 2)
    const scale = s.linear().domain([start, end]).range([this.props.padding, innerWidth + this.props.padding]).clamp(true)
    let selection = this.props.selection ? this.props.selection : [start, end]
    selection.sort(arrays.ascending)

    // TODO: selection layer
    return (
      <div style={Object.assign(histosliderStyle, { width: this.props.width })} className='Histoslider Histoslider-wrapper'>
        <Histogram {...Object.assign({}, this.props, { start, end, extent, selection, innerWidth, scale, height: this.props.histogramHeight })} />
        <Slider {...Object.assign({}, this.props, { start, end, extent, selection, scale, innerWidth, height: this.props.height - this.props.histogramHeight })} />
      </div>
    )
  }
}

Histoslider.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  start: PropTypes.number,
  end: PropTypes.number,
  bucketSize: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  selection: PropTypes.arrayOf(PropTypes.number),
  histogramHeight: PropTypes.number,
  histogramPadding: PropTypes.number,
  histogramVisible: PropTypes.bool,
  style: PropTypes.object
}

Histoslider.defaultProps = {
  bucketSize: 1,
  histogramVisible: true,
  histogramPadding: 5,
  histogramHeight: 250,
  width: 600,
  height: 300,
  style: {
    border: '1px solid red'
  }
}
