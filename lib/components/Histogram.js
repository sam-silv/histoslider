import React, { Component, PropTypes } from 'react'
import arrays from 'd3-arrays'

export default class Histogram extends Component {

  bucket (data, start, end, bucketSize) {
    const sorted = data.sort(arrays.ascending)
    let buckets = []
    let s = start
    let i = 0
    let max = 0

    while (s < (end + bucketSize)) {
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
    const { buckets, max } = this.bucket(this.props.data, this.props.start, this.props.end, this.props.bucketSize)
    const bucketWidth = this.props.width / buckets.length

    return (
        <svg width={this.props.width} height={this.props.height}>
          <g transform={'translate(0,' + this.props.height + ')'}>
            <g transform='scale(1,-1)'>
            {
              buckets.map((bucket, i) => {
                return <rect fill='red' key={i} width={bucketWidth - this.props.histogramPadding} height={(bucket.values.length / max) * this.props.height} x={i * bucketWidth} />
              })
            }
            </g>
          </g>
        </svg>
    )
  }
}

Histogram.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  start: PropTypes.number,
  end: PropTypes.number,
  bucketSize: PropTypes.number,
  width: PropTypes.number,
  histogramPadding: PropTypes.number,
  height: PropTypes.number
}

Histogram.defaultProps = {
  histogramPadding: 2
}
