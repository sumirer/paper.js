"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Line = void 0;

var _utils = require("../utils");

var _Vector = require("./Vector");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Line = /*#__PURE__*/function () {
  function Line(pointA, pointB) {
    _classCallCheck(this, Line);

    this.pointA = pointA;
    this.pointB = pointB;
  }

  _createClass(Line, [{
    key: "getSlope",
    value: function getSlope() {
      return _utils.AngleUtils.getSlope(this.pointA, this.pointB);
    }
  }, {
    key: "getDx",
    value: function getDx() {
      return this.pointA.x - this.pointB.x;
    }
  }, {
    key: "getDy",
    value: function getDy() {
      return this.pointA.y - this.pointB.y;
    }
  }, {
    key: "getVector",
    value: function getVector() {
      return new _Vector.Vector(this.getSlope(), 1);
    }
  }]);

  return Line;
}();

exports.Line = Line;