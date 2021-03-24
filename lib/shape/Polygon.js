"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Polygon = void 0;

var _ = require("./");

var _utils = require("../utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Polygon = /*#__PURE__*/function (_BaseShape) {
  _inherits(Polygon, _BaseShape);

  var _super = _createSuper(Polygon);

  function Polygon(points, style) {
    _classCallCheck(this, Polygon);

    return _super.call(this, points, style);
  }

  _createClass(Polygon, [{
    key: "pointInBound",
    value: function pointInBound(point) {
      return _utils.BoundUtils.pointInLine(this.points, point, 1, true);
    }
  }, {
    key: "pointInShape",
    value: function pointInShape(point) {
      return _utils.BoundUtils.pointInPolygon(this.points, point);
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this$paint, _this$paint2, _this$paint4;

      (_this$paint = this.paint) === null || _this$paint === void 0 ? void 0 : _this$paint.beginPath();
      (_this$paint2 = this.paint) === null || _this$paint2 === void 0 ? void 0 : _this$paint2.moveTo(this.points[0].x, this.points[0].y);

      for (var index = 1; index < this.points.length; index++) {
        var _this$paint3;

        (_this$paint3 = this.paint) === null || _this$paint3 === void 0 ? void 0 : _this$paint3.lineTo(this.points[index].x, this.points[index].y);
      }

      (_this$paint4 = this.paint) === null || _this$paint4 === void 0 ? void 0 : _this$paint4.closePath();

      if (this.fill) {
        var _this$paint5;

        (_this$paint5 = this.paint) === null || _this$paint5 === void 0 ? void 0 : _this$paint5.fill();
      }

      if (this.stroke) {
        var _this$paint6;

        (_this$paint6 = this.paint) === null || _this$paint6 === void 0 ? void 0 : _this$paint6.stroke();
      }
    }
  }]);

  return Polygon;
}(_.BaseShape);

exports.Polygon = Polygon;