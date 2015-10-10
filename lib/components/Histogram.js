import React, { Component } from 'react'

export default class Histogram extends Component {
  render () {
    return (
      <div>Nothing to see here, yet!</div>
    )
  }
}

Histogram.propTypes = {
  data: React.propTypes.arrayOf(React.propTypes.number).isRequired,
  start: React.propTypes.number,
  end: React.propTypes.number,
  bucketSize: React.propTypes.number
}
