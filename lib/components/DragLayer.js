import React, { Component, PropTypes } from 'react'

const dragLayerStyle = {
  position: 'absolute',
  backgroundColor: 'red',
  opacity: 0
}

export default class DragLayer extends Component {

  handleDragStart (e) {
    this.setState({
      dragStartX: e.nativeEvent.layerX / this.props.innerWidth * 10
    })
  }

  handleDrag (e) {
    if (e.nativeEvent.layerX < 0) return
    this.props.onChange([this.state.dragStartX, e.nativeEvent.layerX / this.props.innerWidth * 10])
  }

  render () {
    // TODO: remove drag proxy
    const range = this.props.end - this.props.start + this.props.bucketSize
    const left = Math.max((this.props.selection[0] - this.props.bucketSize) / range * this.props.innerWidth + this.props.padding, this.props.padding)
    const right = Math.max(this.props.width - ((this.props.selection[1] - this.props.bucketSize) / range * this.props.innerWidth) - this.props.padding, this.props.padding)

    const dragAreaStyle = Object.assign({}, dragLayerStyle, {
      top: this.props.padding,
      left: this.props.padding,
      bottom: this.props.padding,
      right: this.props.padding,
      zIndex: '200'
    })

    const selectedAreaStyle = Object.assign({}, dragLayerStyle, {
      top: this.props.padding,
      left,
      bottom: this.props.padding,
      right
    })

    return (
      <div>
        <div style={selectedAreaStyle} />
        <div draggable onDragStart={this.handleDragStart.bind(this)} onDrag={this.handleDrag.bind(this)} style={dragAreaStyle} />
      </div>
    )
  }
}

DragLayer.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  padding: PropTypes.number,
  selection: PropTypes.arrayOf(PropTypes.number).isRequired,
}
