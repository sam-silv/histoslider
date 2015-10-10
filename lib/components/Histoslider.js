import React, { Component } from 'react'

export default class Histoslider extends Component {
  render () {
    return (
      <div>Nothing here yet</div>
    )
  }
}

Histoslider.propTypes = {
  data: React.propTypes.arrayOf(React.propTypes.number).isRequired,
  onChange: React.PropTypes.func.isRequired,
  start: React.propTypes.number,
  end: React.propTypes.number,
  bucketSize: React.propTypes.number,
  histogramVisible: React.propTypes.bool,
  style: React.PropTypes.object
}

Histoslider.defaultProps = {
  bucketSize: 1,
  histogramVisible: true,
  style: {
    border: '1px solid red'
  }
}
