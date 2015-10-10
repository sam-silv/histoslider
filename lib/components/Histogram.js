import React, { Component, PropTypes } from 'react'
import arrays from 'd3-arrays'

const histogramStyle = {
  display: 'block'
}

export default class Histogram extends Component {

  bucket (data, start, end, bucketSize) {
    const sorted = data.sort(arrays.ascending)
    let buckets = []
    let s = start
    let i = 0
    let max = 0

    while (s < (end)) {
      let values = []

      while (sorted[i] < (s + bucketSize)) {
        if (sorted[i] < start) continue
        values.push(data[i])
        i++
      }

      buckets.push({
        start: s,
        end: s + bucketSize,
        values
      })

      max = values.length > max ? values.length : max
      s += bucketSize
    }

    return {
      buckets,
      max
    }
  }

  render () {
    const innerHeight = this.props.height - this.props.padding
    const { buckets, max } = this.bucket(this.props.data, this.props.start, this.props.end, this.props.bucketSize)
    const bucketWidth = this.props.innerWidth / buckets.length

    return (
      <div>
        <svg style={histogramStyle} width={this.props.width} height={this.props.height}>
          <g transform={'translate(' + this.props.padding + ',' + this.props.height + ')'}>
            <g transform='scale(1,-1)'>
            {
              buckets.map((bucket, i) => {
                const fill = (bucket.start >= this.props.selection[0] && bucket.end <= this.props.selection[1]) ? '#2ecc71' : '#f1f1f1'
                return (
                  <rect
                    fill={fill}
                    key={i}
                    width={bucketWidth - this.props.histogramPadding}
                    height={(bucket.values.length / max) * innerHeight}
                    x={i * bucketWidth + (this.props.histogramPadding / 2)}
                  />
                )
              })
            }
            </g>
          </g>
        </svg>
      </div>
    )
  }
}

Histogram.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  start: PropTypes.number,
  end: PropTypes.number,
  bucketSize: PropTypes.number,
  width: PropTypes.number,
  padding: PropTypes.number,
  histogramPadding: PropTypes.number,
  height: PropTypes.number
}

Histogram.defaultProps = {
  histogramPadding: 1
}
