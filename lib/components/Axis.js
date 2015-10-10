import React, { Component, PropTypes } from 'react'

const axisStyle = {
  marginTop: '-8px',
  marginBottom: '12px'
}

export default class Axis extends Component {

  render () {

    const marks = [this.props.start, this.props.end/2, this.props.end]


    return (
      <svg
        style={axisStyle}
        height={this.props.height}
        width={this.props.width}
      >

      <line
        x1={this.props.padding}
        x2={this.props.padding + this.props.innerWidth}
        y1={0}
        y2={0}
        stroke='#ccc'
      />

      {marks.map((m, i) => {
        return (
          <g key={i} transform={'translate(' + this.props.scale(m) + ', 0)'}>
            <line
              x1='0'
              x2='0'
              y1='0'
              y2='6'
              stroke='#ccc'
            />
            <text
              textAnchor='middle'
              x='0'
              y='22'
              fill='#999'
            >
              {m}
            </text>
          </g>
        )
      })}
      </svg>
    )
  }
}

Axis.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  bucketSize: PropTypes.number,
}
