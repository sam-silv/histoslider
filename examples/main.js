import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Histoslider from '../lib/components/Histoslider'

import arrays from 'd3-arrays'

const main = document.getElementById('main')

class App extends Component {

  histogramChanged (newSelection) {
    this.setState({
      selection: newSelection
    })
  }

  constructor () {
    super()
    this.state = {
      selection: [4, 2]
    }
  }

  changeX (e) {
    this.setState({
      selection: [+e.target.value, this.state.selection[1]]
    })
  }

  changeY (e) {
    this.setState({
      selection: [this.state.selection[0], +e.target.value]
    })
  }

  render () {
    const data = [1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 5, 5, 6, 7, 7, 7, 7, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 3, 2, 3, 3, 3, 3, 3]
    let selection = this.state.selection ? arrays.extent([...this.state.selection]) : null
    return (
      <div>
        <div style={{ margin: '0 0 1rem 0' }}>
          <p>
            <b>Selection</b>
          </p>
          <p>{ selection ? JSON.stringify(this.state.selection) : 'None' }</p>
          <p>{ selection ? JSON.stringify(data.filter(m => { return m >= selection[0] && m <= selection[1]})) : 'None' }</p>
        </div>
        <Histoslider
          selection={this.state.selection}
          padding={20}
          data={data}
          onChange={this.histogramChanged.bind(this)}
        />
      </div>
    )
  }
}

ReactDOM.render(React.createElement(App), main)
