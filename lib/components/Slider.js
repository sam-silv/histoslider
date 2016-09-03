'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Format = require('d3-format');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sliderStyle = {
  display: 'block',
  paddingBottom: '8px',
  zIndex: '2'
};

var handleStyle = {
  cursor: 'move'
};

var f = (0, _d3Format.format)('0.3P');

var Slider = function (_Component) {
  _inherits(Slider, _Component);

  _createClass(Slider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('mousemove', this.mouseMove.bind(this), false);
      window.addEventListener('mouseup', this.dragEnd.bind(this), false);
    }
  }, {
    key: 'componentWilUnmount',
    value: function componentWilUnmount() {
      window.removeEventListener('mousemove', this.mouseMove.bind(this), false);
      window.removeEventListener('mouseup', this.dragEnd.bind(this), false);
    }
  }]);

  function Slider() {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this));

    _this.state = {
      dragging: false
    };
    return _this;
  }

  _createClass(Slider, [{
    key: 'dragStart',
    value: function dragStart(index, e) {
      var _this2 = this;

      e.stopPropagation();
      if (!this.state.dragging) {
        this.setState({
          dragging: true,
          dragIndex: index
        }, function () {
          _this2.props.dragChange(true);
        });
      }
    }
  }, {
    key: 'dragEnd',
    value: function dragEnd(e) {
      var _this3 = this;

      e.stopPropagation();
      this.setState({
        dragging: false
      }, function () {
        _this3.props.dragChange(false);
      });
    }
  }, {
    key: 'dragFromSVG',
    value: function dragFromSVG(e) {
      var _this4 = this;

      if (!this.state.dragging) {
        var selection = [].concat(_toConsumableArray(this.props.selection));
        var selected = this.props.scale.invert(e.nativeEvent.layerX);
        var dragIndex = void 0;

        if (Math.abs(selected - selection[0]) > Math.abs(selected - selection[1])) {
          selection[1] = selected;
          dragIndex = 0;
        } else {
          selection[0] = selected;
          dragIndex = 1;
        }

        this.props.onChange(selection);
        this.setState({
          dragging: true,
          dragIndex: dragIndex
        }, function () {
          _this4.props.dragChange(true);
        });
      }
    }
  }, {
    key: 'mouseMove',
    value: function mouseMove(e) {
      if (this.state.dragging) {
        var selection = [].concat(_toConsumableArray(this.props.selection));
        selection[this.state.dragIndex] = this.props.scale.invert(e.layerX);
        this.props.onChange(selection);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var selection = this.props.selection;
      var selectionWidth = Math.abs(this.props.scale(selection[1]) - this.props.scale(selection[0]));

      return _react2.default.createElement(
        'svg',
        {
          style: sliderStyle,
          height: this.props.height - 10,
          width: this.props.width,
          onMouseDown: this.dragFromSVG.bind(this),
          onDoubleClick: this.props.reset
        },
        _react2.default.createElement('rect', {
          height: 4,
          fill: '#f1f1f1',
          x: this.props.padding,
          y: 10,
          width: this.props.innerWidth
        }),
        _react2.default.createElement('rect', {
          height: 4,
          fill: this.props.selectionColor,
          x: this.props.scale(this.props.selectionSorted[0]),
          y: 10,
          width: selectionWidth
        }),
        this.props.selection.map(function (m, i) {
          return _react2.default.createElement(
            'g',
            { transform: 'translate(' + _this5.props.scale(m) + ', 0)', key: i },
            _react2.default.createElement('circle', {
              style: handleStyle,
              r: 10,
              cx: 0,
              cy: 12.5,
              fill: '#ddd',
              strokeWidth: '1'
            }),
            _react2.default.createElement('circle', {
              style: handleStyle,
              onMouseDown: _this5.dragStart.bind(_this5, i),
              r: 9,
              cx: 0,
              cy: 12,
              fill: 'white',
              stroke: '#ccc',
              strokeWidth: '1'
            }),
            _react2.default.createElement(
              'text',
              {
                textAnchor: 'middle',
                x: 0,
                y: 36,
                fill: '#666',
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

exports.default = Slider;


Slider.propTypes = {
  data: _react.PropTypes.arrayOf(_react.PropTypes.number).isRequired,
  selection: _react.PropTypes.arrayOf(_react.PropTypes.number).isRequired,
  selectionSorted: _react.PropTypes.arrayOf(_react.PropTypes.number).isRequired,
  start: _react.PropTypes.number,
  end: _react.PropTypes.number,
  height: _react.PropTypes.number,
  width: _react.PropTypes.number,
  innerWidth: _react.PropTypes.number,
  padding: _react.PropTypes.number,
  bucketSize: _react.PropTypes.number,
  selectionColor: _react.PropTypes.string,
  histogramPadding: _react.PropTypes.number,
  scale: _react.PropTypes.func,
  reset: _react.PropTypes.func,
  dragChange: _react.PropTypes.func,
  onChange: _react.PropTypes.func
};
module.exports = exports['default'];
//# sourceMappingURL=Slider.js.map