"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var stressTestData = function stressTestData(n) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var multiplier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return Array.from(Array(n)).map(function (d, i) {
    return {
      x0: (i + offset) * multiplier,
      x: (i + 1 + offset) * multiplier,
      y: (i % 5 + 1) * 10
    };
  });
};

var stackedBarTestData = function stackedBarTestData(n) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var multiplier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return Array.from(Array(n)).map(function (d, i) {
    return {
      x0: (i + offset) * multiplier,
      x: (i + 1 + offset) * multiplier,
      y: [(i % 5 + 1) * 3, (i % 7 + 1) * (i % 3), (i % 2 + 3) * (i % 5) * 2]
    };
  });
};

var buckets = [{
  x0: 0,
  x: 1,
  y: 8
}, {
  x0: 1,
  x: 2,
  y: 2
}, {
  x0: 2,
  x: 3,
  y: 0
}, {
  x0: 3,
  x: 4,
  y: 2
}];

// Stateful container for testing interaction

var HistosliderContainer = function (_Component) {
  _inherits(HistosliderContainer, _Component);

  function HistosliderContainer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, HistosliderContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HistosliderContainer.__proto__ || Object.getPrototypeOf(HistosliderContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      selection: null
    }, _this.setSelection = function (selection) {
      (0, _addonActions.action)("setSelection");
      _this.setState({ selection: selection });
    }, _this.render = function () {
      return _react2.default.createElement(_.Histoslider
      // An array of data to show on the slider
      , _extends({ data: buckets
        // A function to handle a change in the selection
        , selection: _this.state.selection,
        onChange: _this.setSelection
      }, _this.props));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return HistosliderContainer;
}(_react.Component);

(0, _react3.storiesOf)("Histogram", module);
(0, _react3.storiesOf)("Slider", module);
(0, _react3.storiesOf)("Histoslider", module).add("Open", function () {
  return _react2.default.createElement(HistosliderContainer, null);
}).add("Show on drag", function () {
  return _react2.default.createElement(HistosliderContainer, { showOnDrag: true });
}).add("Disable histogram", function () {
  return _react2.default.createElement(HistosliderContainer, { disableHistogram: true });
}).add("More data", function () {
  return _react2.default.createElement(HistosliderContainer, { data: stressTestData(50), width: 800 });
}).add("Non zero start", function () {
  return _react2.default.createElement(HistosliderContainer, { data: stressTestData(200, 2000, 10), width: 800 });
}).add("Stacked Bar Test", function () {
  return _react2.default.createElement(HistosliderContainer, { data: stackedBarTestData(50), width: 800 });
}).add("Stepping in lots of 100", function () {
  return _react2.default.createElement(HistosliderContainer, {
    keyboardStep: 100,
    data: stressTestData(20, 1, 10),
    width: 800
  });
});