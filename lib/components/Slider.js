"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapToKeyCode = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Format = require("d3-format");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var handleStyle = {
  cursor: "move",
  userSekect: "none",
  MozUserSelect: "none",
  KhtmlUserSelect: "none",
  WebkitUserSelect: "none",
  OUserSelect: "none"
};

// Map keycodes to positive or negative values
var mapToKeyCode = exports.mapToKeyCode = function mapToKeyCode(code) {
  var codes = {
    37: -1,
    38: 1,
    39: 1,
    40: -1
  };
  return codes[code] || null;
};

var Slider = function (_Component) {
  _inherits(Slider, _Component);

  _createClass(Slider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("mouseup", this.dragEnd, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("mouseup", this.dragEnd, false);
    }
  }]);

  function Slider() {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this));

    _this.dragStart = function (index, e) {
      e.stopPropagation();

      if (!_this.state.dragging) {
        window.addEventListener("mousemove", _this._mouseMove, false);

        _this.setState({
          dragging: true,
          dragIndex: index
        }, function () {
          _this.props.dragChange(true);
        });
      }
    };

    _this.dragEnd = function (e) {
      window.removeEventListener("mousemove", _this._mouseMove, false);

      e.stopPropagation();
      _this.setState({
        dragging: false,
        dragIndex: null
      }, function () {
        _this.props.dragChange(false);
      });
    };

    _this.dragFromSVG = function (e) {
      if (!_this.state.dragging) {
        window.addEventListener("mousemove", _this._mouseMove, false);

        var selection = [].concat(_toConsumableArray(_this.props.selection));
        var selected = _this.props.scale.invert(e.clientX - _this.svg.getBoundingClientRect().x);
        var dragIndex = 2;

        var dy = e.clientY - _this.svg.getBoundingClientRect().y;

        if (dy < _this.props.height - _this.props.sliderHeight) {
          _this.setState({
            dragging: true,
            dragIndex: 1
          }, function () {
            _this.props.dragChange(true);
            _this.props.onChange([selected, selected]);
          });
        } else {
          _this.setState({
            dragging: true,
            dragIndex: dragIndex,
            dragReference: selected - selection[0],
            dragWindow: selection[1] - selection[0]
          }, function () {
            _this.props.dragChange(true);
          });
        }
      }
    };

    _this.mouseMove = function (e) {
      if (_this.state.dragging) {
        var selection = [].concat(_toConsumableArray(_this.props.selection));
        var pos = _this.props.scale.invert(e.clientX - _this.svg.getBoundingClientRect().x);

        if (_this.state.dragIndex < 2) {
          selection[_this.state.dragIndex] = pos;
        } else {
          selection = [pos - _this.state.dragReference, pos - _this.state.dragReference + _this.state.dragWindow];
        }

        _this.props.onChange(selection);
      }
    };

    _this.keyDown = function (index, e) {
      var direction = mapToKeyCode(e.keyCode);
      var keyboardStep = _this.props.keyboardStep;

      var selection = [].concat(_toConsumableArray(_this.props.selection));
      selection[index] = Math.round(selection[index] + direction * keyboardStep);
      _this.props.onChange(selection);
    };

    _this.state = {
      dragging: false
    };
    _this._mouseMove = _this.mouseMove.bind(_this);
    return _this;
  }

  _createClass(Slider, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          selection = _props.selection,
          scale = _props.scale,
          format = _props.format,
          handleLabelFormat = _props.handleLabelFormat,
          width = _props.width,
          height = _props.height,
          reset = _props.reset,
          innerWidth = _props.innerWidth,
          selectedColor = _props.selectedColor,
          unselectedColor = _props.unselectedColor,
          sliderStyle = _props.sliderStyle;

      var selectionWidth = Math.abs(scale(selection[1]) - scale(selection[0]));
      var selectionSorted = Array.from(selection).sort(function (a, b) {
        return +a - +b;
      });
      var f = (0, _d3Format.format)(handleLabelFormat);
      return _react2.default.createElement(
        "svg",
        {
          style: sliderStyle,
          height: height,
          width: width,
          onMouseDown: this.dragFromSVG,
          onDoubleClick: reset,
          ref: function ref(e) {
            return _this2.svg = e;
          }
        },
        _react2.default.createElement("rect", { height: 4, fill: unselectedColor, x: 0, y: height - 40, width: width }),
        selection[0] < selection[1] ? _react2.default.createElement("rect", {
          height: 4,
          fill: selectedColor,
          x: scale(selectionSorted[0]),
          y: height - 40,
          width: selectionWidth
        }) : [_react2.default.createElement("rect", {
          key: "left",
          height: 4,
          fill: selectedColor,
          x: 0,
          y: height - 40,
          width: scale(selectionSorted[0])
        }), _react2.default.createElement("rect", {
          key: "right",
          height: 4,
          fill: selectedColor,
          x: scale(selectionSorted[1]),
          y: height - 40,
          width: width - scale(selectionSorted[1])
        })],
        selection.map(function (m, i) {
          return _react2.default.createElement(
            "g",
            {
              tabIndex: 0,
              onKeyDown: _this2.keyDown.bind(_this2, i),
              transform: "translate(" + _this2.props.scale(m) + ", 0)",
              key: "handle-" + i
            },
            _react2.default.createElement("circle", {
              style: handleStyle,
              onMouseDown: _this2.dragStart.bind(_this2, i),
              r: 9,
              cx: 0,
              cy: height - 38,
              fill: "white",
              stroke: "#ccc",
              strokeWidth: "1"
            }),
            _react2.default.createElement(
              "text",
              {
                style: handleStyle,
                textAnchor: "middle",
                x: 0,
                y: height - 10,
                fill: "#666",
                fontSize: 12
              },
              f(m)
            )
          );
        })
      );
    }
  }]);

  return Slider;
}(_react.Component);

Slider.propTypes = {
  data: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    x0: _propTypes2.default.number,
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
  })).isRequired,
  selection: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
  height: _propTypes2.default.number,
  width: _propTypes2.default.number,
  innerWidth: _propTypes2.default.number,
  padding: _propTypes2.default.number,
  bucketSize: _propTypes2.default.number,
  selectionColor: _propTypes2.default.string,
  histogramPadding: _propTypes2.default.number,
  scale: _propTypes2.default.func,
  reset: _propTypes2.default.func,
  keyboardStep: _propTypes2.default.number,
  dragChange: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  handleLabelFormat: _propTypes2.default.string,
  sliderStyle: _propTypes2.default.object
};

Slider.defaultProps = {
  sliderStyle: {
    display: "block",
    zIndex: 6,
    overflow: "visible",
    position: "relative"
  },
  keyboardStep: 1
};

exports.default = Slider;