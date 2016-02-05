import React, { Component, PropTypes } from 'react'
import arrays from 'd3-array'

const histogramStyle = {
  display: 'block'
}

export default class Histogram extends Component {

  selectBucket (bucket) {
    this.props.onChange([bucket.start, bucket.end])
  }

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
    const selection = this.props.selection

    let style = this.props.showOnDrag ? { position: 'absolute', left: '-1px', right: '-1px', backgroundColor: '#fafafa', border: '1px solid #eaeaea', borderBottom: 'none', bottom: 'calc(100% - ' + this.props.padding + 'px)' } : {}

    return (
      <div>
        <svg style={Object.assign({}, style, histogramStyle)} width={this.props.width} height={this.props.height}>
          <g transform={'translate(' + this.props.padding + ',' + this.props.height + ')'}>
            <g transform='scale(1,-1)'>
            {
              buckets.map((bucket, i) => {
                let opacity = 0

                if (selection[0] > bucket.end || selection[1] < bucket.start) {
                  opacity = 0
                } else if (selection[0] <= bucket.start && selection[1] >= bucket.end) {
                  // Entire block is covered
                  opacity = 1
                } else if (selection[0] > bucket.start && selection[1] > bucket.end) {
                  opacity = 1 - (selection[0] - bucket.start) / (bucket.end - bucket.start)
                  // Some of left block is covered
                } else if (selection[1] < bucket.end && selection[0] < bucket.start) {
                  // Some of right block is covered
                  opacity = (selection[1] - bucket.start) / (bucket.end - bucket.start)
                } else {
                  // Parital match
                  opacity = (selection[1] - selection[0]) / (bucket.end - bucket.start)
                }

                return (
                  <g key={i} transform={'translate(' + (i * bucketWidth) + ', 0)'}>
                    <rect
                      fill='#f1f1f1'
                      width={bucketWidth - this.props.histogramPadding}
                      height={(bucket.values.length / max) * innerHeight}
                      rx={this.props.barBorderRadius}
                      ry={this.props.barBorderRadius}
                      x={this.props.histogramPadding / 2 }
                    />
                    <rect
                      fill={this.props.selectionColor}
                      onClick={this.selectBucket.bind(this, bucket)}
                      onDoubleClick={this.props.reset.bind(this)}
                      style={{ opacity, cursor: 'pointer' }}
                      width={bucketWidth - this.props.histogramPadding}
                      height={(bucket.values.length / max) * innerHeight}
                      rx={this.props.barBorderRadius}
                      ry={this.props.barBorderRadius}
                      x={this.props.histogramPadding / 2 }
                    />
                  </g>
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
  selection: PropTypes.arrayOf(PropTypes.number).isRequired,
  start: PropTypes.number,
  end: PropTypes.number,
  bucketSize: PropTypes.number,
  width: PropTypes.number,
  innerWidth: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number,
  selectionColor: PropTypes.string,
  histogramPadding: PropTypes.number,
  showOnDrag: PropTypes.bool,
  reset: PropTypes.func,
  onChange: PropTypes.func,
  barBorderRadius: PropTypes.number
}

Histogram.defaultProps = {
  barBorderRadius: 0,
  histogramPadding: 1
}
