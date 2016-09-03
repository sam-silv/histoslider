'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Array = require('d3-array');

var _d3Scale = require('d3-scale');

var _Histogram = require('./Histogram');

var _Histogram2 = _interopRequireDefault(_Histogram);

var _Slider = require('./Slider');

var _Slider2 = _interopRequireDefault(_Slider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var histosliderStyle = {
  position: 'relative',
  backgroundColor: '#fafafa',
  border: '1px solid #eaeaea'
};

var Histoslider = function (_Component) {
  _inherits(Histoslider, _Component);

  function Histoslider() {
    _classCallCheck(this, Histoslider);

    var _this = _possibleConstructorReturn(this, (Histoslider.__proto__ || Object.getPrototypeOf(Histoslider)).call(this));

    _this.state = {
      dragging: false
    };
    return _this;
  }

  _createClass(Histoslider, [{
    key: 'dragChange',
    value: function dragChange(dragging) {
      this.setState({ dragging: dragging });
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.props.onChange(null);
    }
  }, {
    key: 'render',
    value: function render() {
      var extent = (0, _d3Array.extent)(this.props.data);
      var start = this.props.start >= 0 ? this.props.start : Math.floor(extent[0] / this.props.bucketSize) * this.props.bucketSize;
      var end = this.props.end >= 0 ? this.props.end : Math.ceil(extent[1] / this.props.bucketSize) * this.props.bucketSize;

      var innerWidth = this.props.width - this.props.padding * 2;
      var scale = (0, _d3Scale.scaleLinear)().domain([start, end]).range([this.props.padding, innerWidth + this.props.padding]).clamp(true);
      var selection = this.props.selection ? this.props.selection : [start, end];
      var selectionSorted = (0, _d3Array.extent)(selection);

      // TODO: selection layer
      return _react2.default.createElement(
        'div',
        { style: Object.assign(histosliderStyle, { width: this.props.width, paddingTop: this.props.padding }), className: 'Histoslider Histoslider-wrapper' },
        !this.props.showOnDrag || this.state.dragging ? _react2.default.createElement(_Histogram2.default, Object.assign({}, this.props, {
          start: start,
          end: end,
          reset: this.reset.bind(this),
          extent: extent,
          selection: selectionSorted,
          innerWidth: innerWidth,
          scale: scale,
          height: this.props.height - 40
        })) : null,
        _react2.default.createElement(_Slider2.default, Object.assign({}, this.props, { start: start, end: end, dragChange: this.dragChange.bind(this), reset: this.reset.bind(this), extent: extent, selection: selection, selectionSorted: selectionSorted, scale: scale, innerWidth: innerWidth, height: 50 }))
      );
    }
  }]);

  return Histoslider;
}(_react.Component);

exports.default = Histoslider;


Histoslider.propTypes = {
  data: _react.PropTypes.arrayOf(_react.PropTypes.number).isRequired,
  onChange: _react.PropTypes.func.isRequired,
  start: _react.PropTypes.number,
  end: _react.PropTypes.number,
  selectionColor: _react.PropTypes.string,
  bucketSize: _react.PropTypes.number,
  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  padding: _react.PropTypes.number,
  selection: _react.PropTypes.arrayOf(_react.PropTypes.number),
  histogramHeight: _react.PropTypes.number,
  histogramPadding: _react.PropTypes.number,
  showOnDrag: _react.PropTypes.bool,
  style: _react.PropTypes.object,
  barBorderRadius: _react.PropTypes.number
};

Histoslider.defaultProps = {
  bucketSize: 1,
  selectionColor: '#2ecc71',
  showOnDrag: false,
  histogramPadding: 4,
  padding: 20,
  width: 400,
  height: 200,
  barBorderRadius: 0,
  style: {
    border: '1px solid red'
  }
};
module.exports = exports['default'];
//# sourceMappingURL=Histoslider.js.map