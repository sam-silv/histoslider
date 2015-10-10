import React, { Component, PropTypes } from 'react'
import Histogram from './Histogram'
import Slider from './Slider'

export default class Histoslider extends Component {
  render () {
    return (
      <div className='Histoslider Histoslider-wrapper'>
        <Slider {...this.props} />
        <Histogram {...this.props} />
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
  histogramVisible: PropTypes.bool,
  style: PropTypes.object
}

Histoslider.defaultProps = {
  bucketSize: 1,
  histogramVisible: true,
  style: {
    border: '1px solid red'
  }
}
