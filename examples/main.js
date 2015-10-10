import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Histoslider from '../lib/components/Histoslider'

const main = document.getElementById('main')

class App extends Component {

  histogramChanged (newSelection) {
    this.setState({
      selection: newSelection
    })
  }

  render () {
    return (
      <div>
        <div>
          Selection: { this.state && this.state.selection ? this.state.selection : 'none' }
        </div>
        <Histoslider
          data={[1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 6, 7, 7, 7, 7, 8, 8, 9, 9, 9, 9, 9]}
          onChange={this.histogramChanged.bind(this)}
        />
      </div>
    )
  }
}

ReactDOM.render(React.createElement(App), main)
