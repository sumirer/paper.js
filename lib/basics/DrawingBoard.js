"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawingBoard = void 0;

var _common = require("../common");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DrawingBoard = /*#__PURE__*/function () {
  function DrawingBoard(elementId) {
    var _this = this;

    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;

    _classCallCheck(this, DrawingBoard);

    this.elementId = '';
    this.canvasWidth = 200;
    this.canvasHeight = 200;
    this.paint = undefined;
    this.shapeList = [];

    this.handleMouseUp = function (event) {
      if (!_this.mouseEventBindShape) {
        return;
      }

      var point = _this.getRelativePoint(event);

      _this.mouseEventBindShape.onMouseUp(point, event);
    };

    this.handleMouseDown = function (event) {
      var point = _this.getRelativePoint(event);

      var shape = _this.getShapeByPoint(point);

      if (shape) {
        _this.mouseEventBindShape = shape;

        _this.mouseEventBindShape.onMouseDown(point, event);

        _this.mouseEventBindShape = shape;
      }
    };

    this.handleMouseMove = function (event) {
      var _this$mouseEventBindS;

      var point = _this.getRelativePoint(event);

      var shape = (_this$mouseEventBindS = _this.mouseEventBindShape) !== null && _this$mouseEventBindS !== void 0 ? _this$mouseEventBindS : _this.getShapeByPoint(point);

      if (shape) {
        shape.onMouseMove(point, event);
      }
    };

    this.update = function () {
      _this.paintAll();
    };

    this.elementId = elementId;
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.element = document.getElementById(this.elementId);
    this.init();
  }

  _createClass(DrawingBoard, [{
    key: "init",
    value: function init() {
      if (!this.element) {
        throw Error("can't get canvas element, please check element");
      }

      this.element.height = this.canvasHeight;
      this.element.width = this.canvasWidth;
      this.registerListen(); // use context 2d

      this.paint = this.element.getContext('2d') || undefined;

      if (!this.paint) {
        throw Error("can't get canvas context, please check element id or element");
      }
    }
  }, {
    key: "registerListen",
    value: function registerListen() {
      this.element.addEventListener('mouseup', this.handleMouseUp);
      this.element.addEventListener('mousedown', this.handleMouseDown);
      this.element.addEventListener('mousemove', this.handleMouseMove);
    }
  }, {
    key: "getRelativePoint",
    value: function getRelativePoint(event) {
      var bound = this.element.getBoundingClientRect();
      return new _common.Vector(event.clientX - bound.x, event.clientY - bound.y);
    }
  }, {
    key: "getShapeByPoint",
    value: function getShapeByPoint(point) {
      for (var index = this.shapeList.length - 1; index >= 0; index--) {
        var shape = this.shapeList[index];

        if (shape.pointInShape(point) || shape.pointInBound(point)) {
          return shape;
        }
      }

      return undefined;
    }
    /**
     * add shape
     * @param shape
     */

  }, {
    key: "addShape",
    value: function addShape(shape) {
      this.shapeList.push(shape);
    }
    /**
     * remove shape
     * @param shape
     */

  }, {
    key: "removeShape",
    value: function removeShape(shape) {
      for (var index = 0; index < this.shapeList.length; index++) {
        if (this.shapeList[index] === shape) {
          this.shapeList.splice(index, 1);
          break;
        }
      }
    }
  }, {
    key: "paintAll",
    value:
    /**
     * paint all shape
     */
    function paintAll() {
      var _this2 = this;

      if (!this.paint) {
        return;
      }

      this.paint.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.shapeList.forEach(function (item) {
        item.paint = _this2.paint;
        item.updateFn = _this2.update;
        item.drawAll();
      });
    }
  }]);

  return DrawingBoard;
}();

exports.DrawingBoard = DrawingBoard;