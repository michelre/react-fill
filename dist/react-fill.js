!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n(require("ramda"),require("voca/chars"),require("voca/words"),require("react")):"function"==typeof define&&define.amd?define(["ramda","voca/chars","voca/words","react"],n):"object"==typeof exports?exports.ReactFill=n(require("ramda"),require("voca/chars"),require("voca/words"),require("react")):e.ReactFill=n(e.ramda,e["voca/chars"],e["voca/words"],e.react)}(this,function(__WEBPACK_EXTERNAL_MODULE_0__,__WEBPACK_EXTERNAL_MODULE_3__,__WEBPACK_EXTERNAL_MODULE_4__,__WEBPACK_EXTERNAL_MODULE_2__){return function(e){function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}var t={};return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="/dist/",n(n.s=1)}([function(module,exports){eval('module.exports = __WEBPACK_EXTERNAL_MODULE_0__;\n\n//////////////////\n// WEBPACK FOOTER\n// external "ramda"\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22ramda%22?')},function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(2);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _ramda = __webpack_require__(0);\n\nvar _ramda2 = _interopRequireDefault(_ramda);\n\nvar _chars = __webpack_require__(3);\n\nvar _chars2 = _interopRequireDefault(_chars);\n\nvar _words = __webpack_require__(4);\n\nvar _words2 = _interopRequireDefault(_words);\n\nvar _utils = __webpack_require__(5);\n\n__webpack_require__(6);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar ReactFill = function (_React$Component) {\n  _inherits(ReactFill, _React$Component);\n\n  function ReactFill(props) {\n    _classCallCheck(this, ReactFill);\n\n    var _this = _possibleConstructorReturn(this, (ReactFill.__proto__ || Object.getPrototypeOf(ReactFill)).call(this, props));\n\n    var tokens = (0, _words2.default)(props.text);\n    var missingIndexes = (0, _utils.getRandoms)(props.nbBlanks, tokens.length - 1);\n    var data = _ramda2.default.map(function (idx) {\n      return [idx + '-' + tokens[idx], { original: tokens[idx], value: '' }];\n    }, missingIndexes);\n\n    _this.refs = {};\n    _this.keys = _ramda2.default.map(function (idx) {\n      return idx + '-' + tokens[idx];\n    }, missingIndexes);\n    _this.state = {\n      missingWords: _ramda2.default.fromPairs(data),\n      tokens: tokens,\n      focusKey: _ramda2.default.head(_this.keys),\n      completeKeys: [],\n      points: 0\n    };\n    _this.startTime = new Date().getTime();\n    return _this;\n  }\n\n  _createClass(ReactFill, [{\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      this.refs[this.state.focusKey].focus();\n    }\n  }, {\n    key: 'focusNextKey',\n    value: function focusNextKey(newPoints, key) {\n      var completeAction = this.props.completeAction;\n      var _state = this.state,\n          focusKey = _state.focusKey,\n          points = _state.points,\n          completeKeys = _state.completeKeys;\n\n      var newCompleteKeys = _ramda2.default.union(completeKeys, [key]);\n      var nextKey = (0, _utils.findNextKey)(this.keys, key, newCompleteKeys);\n      this.setState({ focusKey: nextKey, completeKeys: newCompleteKeys });\n      if (nextKey) {\n        this.setState({ points: newPoints });\n        this.refs[nextKey].focus();\n      }\n      if (!nextKey) {\n        this.endTime = new Date().getTime();\n        completeAction({ duration: this.endTime - this.startTime, points: newPoints });\n      }\n    }\n  }, {\n    key: 'handleTab',\n    value: function handleTab(lensState, originalValue, key) {\n      var points = this.state.points;\n\n      this.setState(_ramda2.default.set(lensState, originalValue, this.state));\n      this.focusNextKey(points, key);\n    }\n  }, {\n    key: 'onKeyPressAction',\n    value: function onKeyPressAction(e, key) {\n      var _state$missingWords$k = this.state.missingWords[key],\n          original = _state$missingWords$k.original,\n          value = _state$missingWords$k.value;\n      var _state2 = this.state,\n          points = _state2.points,\n          completeKeys = _state2.completeKeys;\n\n      var originalChars = (0, _chars2.default)(original);\n      var valueChars = (0, _chars2.default)(value);\n      var currentIdx = valueChars.length === 0 ? 0 : valueChars.length;\n      var lensState = _ramda2.default.lensPath(['missingWords', key, 'value']);\n      if (e.keyCode === 9) {\n        this.handleTab(lensState, original, key);\n        e.preventDefault();\n      }\n      if (e.key === originalChars[currentIdx]) {\n        this.setState(_ramda2.default.set(lensState, '' + value + e.key, this.state));\n        if (currentIdx === originalChars.length - 1) {\n          this.focusNextKey(points + 1, key);\n        }\n      }\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _this2 = this;\n\n      var mapIndex = _ramda2.default.addIndex(_ramda2.default.map);\n      var _state3 = this.state,\n          missingWords = _state3.missingWords,\n          tokens = _state3.tokens;\n\n      return _react2.default.createElement(\n        'div',\n        null,\n        mapIndex(function (token, idx) {\n          var k = idx + '-' + token;\n          if (missingWords[k]) {\n            return _react2.default.createElement(\n              'div',\n              { className: 'missing-word', key: k },\n              _react2.default.createElement('input', {\n                ref: function ref(input) {\n                  return _this2.refs = _ramda2.default.merge(_this2.refs, _defineProperty({}, k, input));\n                },\n                id: k,\n                value: missingWords[k].value,\n                onKeyDown: function onKeyDown(e) {\n                  return _this2.onKeyPressAction(e, k);\n                }\n              }),\n              _react2.default.createElement(\n                'label',\n                { htmlFor: k },\n                mapIndex(function (char, idx) {\n                  var valueChar = (0, _chars2.default)(missingWords[k].value)[idx];\n                  return valueChar || _react2.default.createElement('i', { key: idx, className: 'dot' });\n                }, (0, _chars2.default)(missingWords[k].original))\n              ),\n              '\\xA0'\n            );\n          } else {\n            return _react2.default.createElement(\n              'span',\n              { key: k },\n              token,\n              '\\xA0'\n            );\n          }\n        }, tokens)\n      );\n    }\n  }]);\n\n  return ReactFill;\n}(_react2.default.Component);\n\nexports.default = ReactFill;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/ReactFill.js\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/ReactFill.js?")},function(module,exports){eval('module.exports = __WEBPACK_EXTERNAL_MODULE_2__;\n\n//////////////////\n// WEBPACK FOOTER\n// external "react"\n// module id = 2\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22react%22?')},function(module,exports){eval('module.exports = __WEBPACK_EXTERNAL_MODULE_3__;\n\n//////////////////\n// WEBPACK FOOTER\n// external "voca/chars"\n// module id = 3\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22voca/chars%22?')},function(module,exports){eval('module.exports = __WEBPACK_EXTERNAL_MODULE_4__;\n\n//////////////////\n// WEBPACK FOOTER\n// external "voca/words"\n// module id = 4\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22voca/words%22?')},function(module,exports,__webpack_require__){"use strict";eval('\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.findNextKey = exports.getRandoms = undefined;\n\nvar _ramda = __webpack_require__(0);\n\nvar _ramda2 = _interopRequireDefault(_ramda);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar getRandoms = exports.getRandoms = function getRandoms(nbRandoms, end) {\n  var acc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];\n\n  if (nbRandoms === 0) return _ramda2.default.sort(function (a, b) {\n    return a - b;\n  }, acc);\n  var number = Math.floor(Math.random() * end + 1);\n  var foundNumber = _ramda2.default.find(function (n) {\n    return n === number;\n  }, acc);\n  if (!foundNumber) return getRandoms(nbRandoms - 1, end, _ramda2.default.union(acc, [number]));\n  return getRandoms(nbRandoms, end, acc);\n};\n\nvar findNextKey = exports.findNextKey = function findNextKey(allKeys, currentKey, completeKeys) {\n  var differenceWithCompleteKeys = _ramda2.default.difference(allKeys, completeKeys);\n  if (differenceWithCompleteKeys.length === 0) return null;\n  var nextKey = allKeys[allKeys.indexOf(currentKey) + 1];\n  if (!nextKey && differenceWithCompleteKeys.length > 0) {\n    return allKeys[0];\n  }\n  return nextKey;\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/utils.js\n// module id = 5\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/utils.js?')},function(module,exports){eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./scss/style.scss\n// module id = 6\n// module chunks = 0\n\n//# sourceURL=webpack:///./scss/style.scss?")}])});