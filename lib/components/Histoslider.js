import React, { Component, PropTypes } from 'react'
import arrays from 'd3-arrays'

import Histogram from './Histogram'
import Slider from './Slider'

export default class Histoslider extends Component {

  render () {
    const extent = arrays.extent(this.props.data)
    const start = this.props.start || extent[0]
    const end = this.props.end || extent[1]
    const selection = this.props.selection ? this.props.selection : extent

    // TODO: selection layer
    return (
      <div className='Histoslider Histoslider-wrapper'>
        <Histogram {...Object.assign({}, this.props, { start, end, extent, selection, height: this.props.histogramHeight })} />
        <Slider {...Object.assign({}, this.props, { start, end, extent, selection, height: this.props.height - this.props.histogramHeight })} />
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
  histogramHeight: 80,
  width: 250,
  height: 100,
  style: {
    border: '1px solid red'
  }
}
