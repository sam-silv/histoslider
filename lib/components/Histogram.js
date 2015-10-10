import React, { Component, PropTypes } from 'react'

export default class Histogram extends Component {
  render () {
    return (
      <div>Nothing to see here, yet!</div>
    )
  }
}

Histogram.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  start: PropTypes.number,
  end: PropTypes.number,
  bucketSize: PropTypes.number
}
