import React, { Component, PropTypes } from 'react'
import format from 'd3-format'

const sliderStyle = {
  display: 'block',
  paddingBottom: '8px',
  zIndex: '2'
}

const handleStyle = {
  cursor: 'move'
}

const f = format.format('0.3P')

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
      }, () => {
        this.props.dragChange(true)
      })
    }
  }

  dragEnd (e) {
    e.stopPropagation()
    this.setState({
      dragging: false
    }, () => {
      this.props.dragChange(false)
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
      }, () => {
        this.props.dragChange(true)
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

  render () {
    const selection = this.props.selection
    const selectionWidth = Math.abs(this.props.scale(selection[1]) - this.props.scale(selection[0]))

    return (
      <svg
        style={sliderStyle}
        height={this.props.height - 10}
        width={this.props.width}
        onMouseDown={this.dragFromSVG.bind(this)}
        onDoubleClick={this.props.reset}
      >
        <rect
          height={4}
          fill={'#f1f1f1'}
          x={this.props.padding}
          y={10}
          width={this.props.innerWidth}
        />
        <rect
          height={4}
          fill={this.props.selectionColor}
          x={ this.props.scale(this.props.selectionSorted[0]) }
          y={10}
          width={selectionWidth}
        />
        {
          this.props.selection.map((m, i) => {
            return (
              <g transform={'translate(' + this.props.scale(m) + ', 0)'} key={i}>
                <circle
                  style={handleStyle}
                  r={10}
                  cx={0}
                  cy={12.5}
                  fill='#ddd'
                  strokeWidth='1'
                />
                <circle
                  style={handleStyle}
                  onMouseDown={this.dragStart.bind(this, i)}
                  r={9}
                  cx={0}
                  cy={12}
                  fill='white'
                  stroke='#ccc'
                  strokeWidth='1'
                />
                <text
                  textAnchor='middle'
                  x={0}
                  y={36}
                  fill='#666'
                  fontSize={12}
                >
                  {f(m)}
                </text>
              </g>
            )
          })
        }
      </svg>
    )
  }
}

Slider.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  selection: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectionSorted: PropTypes.arrayOf(PropTypes.number).isRequired,
  start: PropTypes.number,
  end: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  innerWidth: PropTypes.number,
  padding: PropTypes.number,
  bucketSize: PropTypes.number,
  selectionColor: PropTypes.string,
  histogramPadding: PropTypes.number,
  scale: PropTypes.func,
  reset: PropTypes.func,
  dragChange: PropTypes.func,
  onChange: PropTypes.func
}
