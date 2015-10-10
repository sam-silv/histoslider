import React, { Component, PropTypes } from 'react'
import arrays from 'd3-arrays'

const sliderStyle = {
  display: 'block',
  marginTop: '-10px'
}

const handleStyle = {
  cursor: 'move',
  filter: ' drop-shadow( -5px -5px 5px #000 )',
  WebkitFilter: 'drop-shadow( -5px -5px 5px #000 )',
}


export default class Slider extends Component {

  componentDidMount () {
    window.addEventListener('mousemove', this.mouseMove.bind(this), false)
    window.addEventListener('mouseup', this.dragEnd.bind(this), false)
  }

  componentWilUnmount () {
    window.removeEventListener('mousemove', this.mouseMove.bind(this), false)
    window.removeEventListener('mouseup', this.dragEnd.bind(this), false)
  }

  constructor () {
    super()
    this.state = {
      dragging: false
    }
  }

  dragStart (index, e) {
    e.stopPropagation()
    if (!this.state.dragging) {
      this.setState({
        dragging: true,
        dragIndex: index
      })
    }
  }

  dragEnd (e) {
    e.stopPropagation()
    this.setState({
      dragging: false
    })
  }

  dragFromSVG (e) {
    if (!this.state.dragging) {
      let selection = [...this.props.selection]
      let selected = this.props.scale.invert(e.nativeEvent.layerX)
      let dragIndex

      if (Math.abs(selected - selection[0]) > Math.abs(selected - selection[1])) {
        selection[1] = selected
        dragIndex = 0
      } else {
        selection[0] = selected
        dragIndex = 1
      }

      this.props.onChange(selection)
      this.setState({
        dragging: true,
        dragIndex
      })
    }
  }

  mouseMove (e) {
    if (this.state.dragging) {
      let selection = [...this.props.selection]
      selection[this.state.dragIndex] = this.props.scale.invert(e.layerX)
      this.props.onChange(selection)
    }
  }

  reset () {
    this.props.onChange(null)
  }

  render () {
    const selection = this.props.selection
    const innerHeight = this.props.height - this.props.padding
    const selectionWidth = Math.abs(this.props.scale(selection[1]) - this.props.scale(selection[0]))

    return (
      <svg
        style={sliderStyle}
        height={this.props.height - 10}
        width={this.props.width}
        onMouseDown={this.dragFromSVG.bind(this)}
        onDoubleClick={this.reset.bind(this)}
      >
        <rect
          height={4}
          fill='#f1f1f1'
          x={ this.props.scale(this.props.selectionSorted[0]) }
          y={(innerHeight / 2) - 2}
          width={selectionWidth}
        />
        <rect
          height={2}
          fill='#2ecc71'
          x={ this.props.scale(this.props.selectionSorted[0]) }
          y={(innerHeight / 2) - 1}
          width={selectionWidth}
        />
        <circle
          style={handleStyle}
          onMouseDown={this.dragStart.bind(this, 0)}
          r={innerHeight / 2.2}
          cx={ this.props.scale(selection[0]) }
          cy={innerHeight / 2}
          fill='white'
          stroke='#d1d1d1'
          strokeWidth='1'
        />
        <circle
          style={handleStyle}
          onMouseDown={this.dragStart.bind(this, 1)}
          r={innerHeight / 2.2}
          cx={this.props.scale(selection[1]) }
          cy={innerHeight / 2}
          fill='white'
          stroke='#d1d1d1'
          strokeWidth='1'
        />
      </svg>
    )
  }
}

Slider.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  start: PropTypes.number,
  end: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  bucketSize: PropTypes.number,
  selection: PropTypes.arrayOf(PropTypes.number).isRequired,
  histogramPadding: PropTypes.number
}
