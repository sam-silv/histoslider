"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Array = require("d3-array");

var _d3Scale = require("d3-scale");

var _Histogram = require("./Histogram");

var _Histogram2 = _interopRequireDefault(_Histogram);

var _Slider = require("./Slider");

var _Slider2 = _interopRequireDefault(_Slider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SLIDER_HEIGHT = 30;

var Histoslider = function (_Component) {
  _inherits(Histoslider, _Component);

  function Histoslider() {
    _classCallCheck(this, Histoslider);

    var _this = _possibleConstructorReturn(this, (Histoslider.__proto__ || Object.getPrototypeOf(Histoslider)).call(this));

    _this.dragChange = function (dragging) {
      // TODO - debounce
      _this.setState({ dragging: dragging });
    };

    _this.onChange = function (selection) {
      var _this$props = _this.props,
          data = _this$props.data,
          onChange = _this$props.onChange;

      var sortedData = data.sort(function (a, b) {
        return +a.x0 - +b.x0;
      });
      var extent = [(0, _d3Array.min)(sortedData, function (_ref) {
        var x0 = _ref.x0;
        return +x0;
      }), (0, _d3Array.max)(sortedData, function (_ref2) {
        var x = _ref2.x;
        return +x;
      })];
      onChange(selection.map(function (d) {
        return Math.max(extent[0], Math.min(extent[1], +d));
      }));
    };

    _this.reset = function () {
      _this.props.onChange(null);
    };

    _this.state = {
      dragging: false
    };
    return _this;
  }

  _createClass(Histoslider, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          style = _props.style,
          data = _props.data,
          width = _props.width,
          height = _props.height,
          padding = _props.padding,
          sliderHeight = _props.sliderHeight,
          disableHistogram = _props.disableHistogram;


      var innerHeight = height - padding * 2;
      var innerWidth = width - padding * 2;
      var histogramHeight = innerHeight - sliderHeight;

      var sortedData = data.sort(function (a, b) {
        return +a.x0 - +b.x0;
      });
      var extent = [(0, _d3Array.min)(sortedData, function (_ref3) {
        var x0 = _ref3.x0;
        return +x0;
      }), (0, _d3Array.max)(sortedData, function (_ref4) {
        var x = _ref4.x;
        return +x;
      })];
      var maxValue = (0, _d3Array.max)(sortedData, function (_ref5) {
        var y = _ref5.y;
        return +y;
      });
      var scale = (0, _d3Scale.scaleLinear)().domain(extent).range([0, innerWidth]);
      scale.clamp(true);

      var selection = this.props.selection || extent;

      var overrides = {
        selection: selection,
        data: sortedData,
        scale: scale,
        max: maxValue,
        dragChange: this.dragChange,
        onChange: this.onChange,
        reset: this.reset,
        width: innerWidth,
        dragging: this.state.dragging
      };

      return _react2.default.createElement(
        "div",
        {
          style: Object.assign({}, style, {
            width: width,
            padding: padding,
            boxSizing: "border-box",
            position: "relative"
          }),
          className: "Histoslider Histoslider--wrapper"
        },
        !disableHistogram && _react2.default.createElement(_Histogram2.default, Object.assign({}, this.props, overrides, {
          height: histogramHeight
        })),
        _react2.default.createElement(_Slider2.default, Object.assign({}, this.props, overrides, {
          height: sliderHeight
        }))
      );
    }
  }]);

  return Histoslider;
}(_react.Component);

Histoslider.propTypes = {
  data: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    x0: _propTypes2.default.number,
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
  })).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  selectedColor: _propTypes2.default.string,
  unselectedColor: _propTypes2.default.string,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  selection: _propTypes2.default.arrayOf(_propTypes2.default.number),
  barStyle: _propTypes2.default.object,
  barBorderRadius: _propTypes2.default.number,
  barPadding: _propTypes2.default.number,
  histogramStyle: _propTypes2.default.object,
  sliderStyle: _propTypes2.default.object,
  showOnDrag: _propTypes2.default.bool,
  style: _propTypes2.default.object,
  handleLabelFormat: _propTypes2.default.string,
  disableHistogram: _propTypes2.default.bool
};

Histoslider.defaultProps = {
  selectedColor: "#0074D9",
  unselectedColor: "#DDDDDD",
  showOnDrag: false,
  width: 400,
  height: 200,
  barBorderRadius: 2,
  barPadding: 3,
  padding: 20,
  sliderHeight: 25,
  handleLabelFormat: "0.3P"
};

exports.default = Histoslider;