import React, { Component, PropTypes } from 'react'

export default class Slider extends Component {
  render () {
    return (
      <div>Nothing to see here, yet!</div>
    )
  }
}

Slider.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  start: PropTypes.number,
  end: PropTypes.number,
  bucketSize: PropTypes.number
}
