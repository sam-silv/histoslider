"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactMotion = require("react-motion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Histogram = function (_Component) {
  _inherits(Histogram, _Component);

  function Histogram() {
    _classCallCheck(this, Histogram);

    return _possibleConstructorReturn(this, (Histogram.__proto__ || Object.getPrototypeOf(Histogram)).apply(this, arguments));
  }

  _createClass(Histogram, [{
    key: "selectBucket",
    value: function selectBucket(bucket) {
      this.props.onChange([bucket.x0, bucket.x]);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          height = _props.height,
          data = _props.data,
          histogramStyle = _props.histogramStyle,
          showOnDrag = _props.showOnDrag,
          selection = _props.selection,
          histogramPadding = _props.histogramPadding,
          reset = _props.reset,
          selectedColor = _props.selectedColor,
          unselectedColor = _props.unselectedColor,
          selectBucket = _props.selectBucket,
          scale = _props.scale,
          barBorderRadius = _props.barBorderRadius,
          barStyle = _props.barStyle,
          padding = _props.padding,
          barPadding = _props.barPadding,
          width = _props.width,
          max = _props.max,
          dragging = _props.dragging;


      var selectionSorted = Array.from(selection).sort(function (a, b) {
        return +a - +b;
      });
      var showHistogramPredicate = showOnDrag ? dragging ? true : false : true;
      var h = showHistogramPredicate ? height : 0;
      var o = showHistogramPredicate ? 1 : 0;

      return _react2.default.createElement(
        _reactMotion.Motion,
        { style: { height: (0, _reactMotion.spring)(h), opacity: (0, _reactMotion.spring)(o) } },
        function (s) {
          return _react2.default.createElement(
            "div",
            {
              style: Object.assign({}, s, {
                zIndex: 0,
                overflow: "hidden",
                position: showOnDrag && "absolute",
                bottom: showOnDrag && "calc(100% - " + padding + "px)"
              })
            },
            _react2.default.createElement(
              "svg",
              {
                style: Object.assign({
                  display: "block",
                  backgroundColor: "white"
                }, histogramStyle),
                width: width,
                height: height
              },
              _react2.default.createElement(
                "g",
                { transform: "translate(0, " + height + ")" },
                _react2.default.createElement(
                  "g",
                  { transform: "scale(1,-1)" },
                  data.map(function (bucket, i) {
                    var opacity = 0;

                    if (selectionSorted[0] > bucket.x || selectionSorted[1] < bucket.x0) {
                      opacity = 0;
                    } else if (selectionSorted[0] <= bucket.x0 && selectionSorted[1] >= bucket.x) {
                      // Entire block is covered
                      opacity = 1;
                    } else if (selectionSorted[0] > bucket.x0 && selectionSorted[1] > bucket.x) {
                      opacity = 1 - (selectionSorted[0] - bucket.x0) / (bucket.x - bucket.x0);
                      // Some of left block is covered
                    } else if (selectionSorted[1] < bucket.x && selectionSorted[0] < bucket.x0) {
                      // Some of right block is covered
                      opacity = (selectionSorted[1] - bucket.x0) / (bucket.x - bucket.x0);
                    } else {
                      // Parital match
                      opacity = (selectionSorted[1] - selectionSorted[0]) / (bucket.x - bucket.x0);
                    }
                    return _react2.default.createElement(
                      "g",
                      {
                        key: i,
                        transform: "translate(" + (scale(bucket.x0) + barPadding / 2) + " 0)"
                      },
                      _react2.default.createElement("rect", {
                        fill: unselectedColor,
                        width: scale(bucket.x) - scale(bucket.x0) - barPadding,
                        height: bucket.y / max * height,
                        rx: barBorderRadius,
                        ry: barBorderRadius,
                        x: 0
                      }),
                      _react2.default.createElement("rect", {
                        fill: selectedColor,
                        onClick: _this2.selectBucket.bind(_this2, bucket),
                        onDoubleClick: reset.bind(_this2),
                        style: Object.assign({ opacity: opacity, cursor: "pointer" }, barStyle),
                        width: scale(bucket.x) - scale(bucket.x0) - barPadding,
                        height: bucket.y / max * height,
                        rx: barBorderRadius,
                        ry: barBorderRadius,
                        x: 0
                      })
                    );
                  })
                )
              )
            )
          );
        }
      );
    }
  }]);

  return Histogram;
}(_react.Component);

Histogram.propTypes = {
  data: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    x0: _propTypes2.default.number,
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
  })).isRequired,
  selection: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
  barBorderRadius: _propTypes2.default.number,
  bucketSize: _propTypes2.default.number,
  width: _propTypes2.default.number,
  innerWidth: _propTypes2.default.number,
  height: _propTypes2.default.number,
  showOnDrag: _propTypes2.default.bool,
  reset: _propTypes2.default.func,
  onChange: _propTypes2.default.func
};

Histogram.defaultProps = {
  histogramPadding: 1
};

exports.default = Histogram;