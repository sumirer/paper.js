"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseShape = void 0;

var _common = require("../common");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseShape = /*#__PURE__*/function () {
  function BaseShape(points) {
    var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, BaseShape);

    this.style = {};
    this.fill = false;
    this.stroke = true;
    this.paint = undefined;
    this.name = 'shape';
    this.points = [];
    this.collision = false;
    this.drag = false;
    this.canMove = false;
    this.canAnimated = true;
    this.keepAnimationAfterDrag = true;
    this.style = style;
    this.points = points;
    this.fill = !!style.fillRange;
    this.stroke = !!style.strokeBorder;
    var xList = points.map(function (point) {
      return point.x;
    });
    var yList = points.map(function (point) {
      return point.y;
    });
    this.boundingClientRect = new _common.BoundingClientRect(Math.min.apply(Math, _toConsumableArray(xList)), Math.min.apply(Math, _toConsumableArray(yList)), Math.max.apply(Math, _toConsumableArray(xList)), Math.max.apply(Math, _toConsumableArray(yList)));
  }

  _createClass(BaseShape, [{
    key: "enableDrag",
    value: function enableDrag() {
      this.drag = true;
    }
  }, {
    key: "disabledDrag",
    value: function disabledDrag() {
      this.drag = false;
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(point, event) {
      this.canAnimated = false;

      if (!this.drag) {
        return;
      }

      this.canMove = true;
      this.lastPoint = point;
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(point, event) {
      if (!this.drag || !this.canMove) {
        return;
      }

      if (!this.lastPoint) {
        return;
      }

      this.moveTo(point);
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(point, event) {
      this.canMove = false;

      if (this.keepAnimationAfterDrag) {
        this.canAnimated = true;
      }
    }
  }, {
    key: "moveTo",
    value: function moveTo(point) {
      this.move(this.lastPoint ? point.x - this.lastPoint.x : 0, this.lastPoint ? point.y - this.lastPoint.y : 0, point);
    }
  }, {
    key: "move",
    value: function move(x, y) {
      var point = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      this.points.forEach(function (item) {
        return item.move(x, y);
      });
      this.update();

      if (!this.lastPoint) {
        this.lastPoint = point;
      } else {
        this.lastPoint.move(x, y);
      }
    }
  }, {
    key: "update",
    value: function update() {
      var _this$updateFn;

      (_this$updateFn = this.updateFn) === null || _this$updateFn === void 0 ? void 0 : _this$updateFn.call(this);
    }
    /**
     * update shape point or animation data
     */

  }, {
    key: "drawAll",
    value: function drawAll() {
      var _this$paint, _this$paint2;

      (_this$paint = this.paint) === null || _this$paint === void 0 ? void 0 : _this$paint.save();
      this.makeStyle();
      this.draw();
      (_this$paint2 = this.paint) === null || _this$paint2 === void 0 ? void 0 : _this$paint2.restore();
    }
    /**
     * set shape style
     */

  }, {
    key: "makeStyle",
    value: function makeStyle() {
      var defaultStyle = Object.assign({
        paint: undefined,
        fillStyle: undefined,
        direction: undefined,
        filter: undefined,
        globalAlpha: undefined,
        globalCompositeOperation: undefined,
        font: undefined,
        lineWidth: undefined,
        lineDashOffset: undefined,
        shadowBlur: undefined,
        shadowColor: undefined,
        shadowOffsetX: undefined,
        shadowOffsetY: undefined,
        textAlign: undefined,
        textBaseline: undefined,
        imageSmoothingEnabled: undefined,
        strokeStyle: undefined
      }, this.style);
      Object.assign(this.paint, defaultStyle);
    }
    /**
     * draw canvas shape by point data
     */

  }]);

  return BaseShape;
}();

exports.BaseShape = BaseShape;