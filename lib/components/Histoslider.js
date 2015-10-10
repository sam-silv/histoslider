import React, { Component, PropTypes } from 'react'
import arrays from 'd3-arrays'

import Histogram from './Histogram'
import Slider from './Slider'
import DragLayer from './DragLayer'

const histosliderStyle = {
  position: 'relative'
}

export default class Histoslider extends Component {

  render () {
    const extent = arrays.extent(this.props.data)
    const start = this.props.start || extent[0]
    const end = this.props.end || extent[1]
    const range = this.props.start - this.props.end
    const innerWidth = this.props.width - (this.props.padding * 2)
    let selection = this.props.selection ? this.props.selection : [start, end + this.props.bucketSize]
    selection.sort(arrays.ascending)
    selection = [Math.max(start, selection[0]), Math.min(end + this.props.bucketSize, selection[1])]

    // TODO: selection layer
    return (
      <div style={Object.assign(histosliderStyle, { width: this.props.width })} className='Histoslider Histoslider-wrapper'>
        <DragLayer {...Object.assign({}, this.props, { start, end, extent, selection, range, innerWidth })} />
        <Histogram {...Object.assign({}, this.props, { start, end, extent, selection, range, innerWidth, height: this.props.histogramHeight })} />
        <Slider {...Object.assign({}, this.props, { start, end, extent, selection, range, innerWidth, height: this.props.height - this.props.histogramHeight })} />
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
  histogramPadding: 2,
  histogramHeight: 260,
  width: 600,
  height: 300,
  style: {
    border: '1px solid red'
  }
}
