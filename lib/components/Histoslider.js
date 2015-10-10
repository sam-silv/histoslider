import React, { Component, PropTypes } from 'react'
import arrays from 'd3-arrays'

import Histogram from './Histogram'
import Slider from './Slider'

export default class Histoslider extends Component {

  constructor () {
    super()
    this.state = {
      selection: {}
    }
  }

  render () {
    const extent = arrays.extent(this.props.data)
    const start = this.props.start || extent[0]
    const end = this.props.end || extent[1]
    return (
      <div className='Histoslider Histoslider-wrapper'>
        <Histogram {...Object.assign({}, this.props, { start, end, extent })} />
        <Slider {...Object.assign({}, this.props, { start, end, extent })} />
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
  histogramVisible: PropTypes.bool,
  style: PropTypes.object
}

Histoslider.defaultProps = {
  bucketSize: 1,
  histogramVisible: true,
  width: 600,
  height: 200,
  style: {
    border: '1px solid red'
  }
}
