"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineMap = void 0;

var _BaseShape2 = require("./BaseShape");

var _common = require("../common");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var LineMap = /*#__PURE__*/function (_BaseShape) {
  _inherits(LineMap, _BaseShape);

  var _super = _createSuper(LineMap);

  function LineMap(startPoint, endPoint, style) {
    var _this;

    _classCallCheck(this, LineMap);

    _this = _super.call(this, [startPoint, new _common.Vector(endPoint.x, startPoint.y), endPoint, new _common.Vector(startPoint.x, endPoint.y)], style);
    _this.lineList = [];
    return _this;
  }

  _createClass(LineMap, [{
    key: "pointInBound",
    value: function pointInBound(point) {
      return false;
    }
  }, {
    key: "pointInShape",
    value: function pointInShape(point) {
      return false;
    }
  }, {
    key: "addLine",
    value: function addLine(star, end) {
      this.lineList.push([star, end]);
    }
  }, {
    key: "move",
    value: function move(x, y) {
      var point = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

      _get(_getPrototypeOf(LineMap.prototype), "move", this).call(this, x, y, point);

      for (var index = 0; index < this.lineList.length; index++) {
        this.lineList[index][0].move(x, y);
        this.lineList[index][1].move(x, y);
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this$paint;

      (_this$paint = this.paint) === null || _this$paint === void 0 ? void 0 : _this$paint.beginPath();

      for (var index = 0; index < this.lineList.length; index++) {
        var _this$paint2, _this$paint3, _this$paint4;

        var line = this.lineList[index];
        (_this$paint2 = this.paint) === null || _this$paint2 === void 0 ? void 0 : _this$paint2.moveTo(line[0].x, line[0].y);
        (_this$paint3 = this.paint) === null || _this$paint3 === void 0 ? void 0 : _this$paint3.lineTo(line[1].x, line[1].y);
        (_this$paint4 = this.paint) === null || _this$paint4 === void 0 ? void 0 : _this$paint4.stroke();
      }
    }
  }]);

  return LineMap;
}(_BaseShape2.BaseShape);

exports.LineMap = LineMap;