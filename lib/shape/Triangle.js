"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Triangle = void 0;

var _ = require("./");

var _utils = require("../utils");

var _common = require("../common");

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

var Triangle = /*#__PURE__*/function (_BaseShape) {
  _inherits(Triangle, _BaseShape);

  var _super = _createSuper(Triangle);

  function Triangle(points) {
    var _style$borderRadius;

    var _this;

    var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Triangle);

    _this = _super.call(this, points, style);
    _this.borderRadius = 0;
    _this.name = 'triangle';

    if (points.length < 3) {
      throw Error("triangle must have more than 2 point, got ".concat(points === null || points === void 0 ? void 0 : points.length, " point"));
    }

    _this.borderRadius = (_style$borderRadius = style.borderRadius) !== null && _style$borderRadius !== void 0 ? _style$borderRadius : 0;
    return _this;
  }

  _createClass(Triangle, [{
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
    key: "getBorderRadiusPath",
    value: function getBorderRadiusPath() {
      var list = [];

      var line1 = _utils.AngleUtils.getLineAnglePoint(new _common.Line(this.points[0], this.points[1]), new _common.Line(this.points[1], this.points[2]), this.borderRadius, this.points[1]);

      list.push(line1.pointA, line1.pointB);

      var line2 = _utils.AngleUtils.getLineAnglePoint(new _common.Line(this.points[1], this.points[2]), new _common.Line(this.points[2], this.points[0]), this.borderRadius, this.points[2]);

      list.push(line2.pointA, line2.pointB);

      var line3 = _utils.AngleUtils.getLineAnglePoint(new _common.Line(this.points[2], this.points[0]), new _common.Line(this.points[0], this.points[1]), this.borderRadius, this.points[0]);

      list.push(line3.pointA, line3.pointB);
      return list;
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this$paint, _this$paint10;

      (_this$paint = this.paint) === null || _this$paint === void 0 ? void 0 : _this$paint.beginPath();

      if (this.borderRadius > 0) {
        var _this$paint2;

        var points = this.getBorderRadiusPath();
        console.log(points, this.points); // points.forEach(item => this.paint?.lineTo(item.x, item.y));

        (_this$paint2 = this.paint) === null || _this$paint2 === void 0 ? void 0 : _this$paint2.moveTo(points[0].x, points[0].y);

        for (var index = 2; index < points.length; index += 2) {
          if (!points[index]) {
            var _this$paint3, _this$paint4;

            (_this$paint3 = this.paint) === null || _this$paint3 === void 0 ? void 0 : _this$paint3.lineTo(points[index - 1].x, points[index - 1].y);
            (_this$paint4 = this.paint) === null || _this$paint4 === void 0 ? void 0 : _this$paint4.arcTo(points[0].x, points[0].y, points[index - 1].x, points[index - 1].y, this.borderRadius);
            break;
          } else {
            var _this$paint5, _this$paint6;

            (_this$paint5 = this.paint) === null || _this$paint5 === void 0 ? void 0 : _this$paint5.lineTo(points[index - 1].x, points[index - 1].y);
            (_this$paint6 = this.paint) === null || _this$paint6 === void 0 ? void 0 : _this$paint6.arcTo(points[index].x, points[index].y, points[index - 1].x, points[index - 1].y, this.borderRadius);
          }
        }
      } else {
        var _this$paint7, _this$paint8, _this$paint9;

        (_this$paint7 = this.paint) === null || _this$paint7 === void 0 ? void 0 : _this$paint7.moveTo(this.points[0].x, this.points[0].y);
        (_this$paint8 = this.paint) === null || _this$paint8 === void 0 ? void 0 : _this$paint8.lineTo(this.points[1].x, this.points[1].y);
        (_this$paint9 = this.paint) === null || _this$paint9 === void 0 ? void 0 : _this$paint9.lineTo(this.points[2].x, this.points[2].y);
      }

      (_this$paint10 = this.paint) === null || _this$paint10 === void 0 ? void 0 : _this$paint10.closePath();

      if (this.fill) {
        var _this$paint11;

        (_this$paint11 = this.paint) === null || _this$paint11 === void 0 ? void 0 : _this$paint11.fill();
      }

      if (this.stroke) {
        var _this$paint12;

        (_this$paint12 = this.paint) === null || _this$paint12 === void 0 ? void 0 : _this$paint12.stroke();
      }
    }
  }]);

  return Triangle;
}(_.BaseShape);

exports.Triangle = Triangle;