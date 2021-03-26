"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AngleUtils = void 0;

var _common = require("../common");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AngleUtils = /*#__PURE__*/function () {
  function AngleUtils() {
    _classCallCheck(this, AngleUtils);
  }

  _createClass(AngleUtils, null, [{
    key: "getSlope",
    value:
    /**
     * get tow point slope
     * @param pointA
     * @param pointB
     */
    function getSlope(pointA, pointB) {
      return (pointA.y - pointB.y) / (pointA.x - pointB.x);
    }
    /**
     * get angle radian by tow line
     * @param lineA
     * @param lineB
     */

  }, {
    key: "getRadian",
    value: function getRadian(lineA, lineB) {
      var v1 = lineA.getVector();
      var v2 = lineB.getVector();
      return Math.acos((v1.x * -v2.x + v1.y * -v2.x) / (Math.sqrt(Math.pow(v1.x, 2) + Math.pow(v1.y, 2)) * Math.sqrt(Math.pow(v2.x, 2) + Math.pow(v2.y, 2)))); // return Math.atan((lineB.getSlope() - lineA.getSlope()) / (1 + lineB.getSlope() * lineA.getSlope()));
    }
    /**
     * get intersection of tow line
     * @param lineA
     * @param lineB
     */

  }, {
    key: "getIntersection",
    value: function getIntersection(lineA, lineB) {
      if (lineA.pointA.x === lineB.pointA.x && lineA.pointA.y === lineB.pointA.y || lineA.pointA.x === lineB.pointB.x && lineA.pointA.y === lineB.pointB.y) {
        return lineA.pointA.clone();
      }

      if (lineA.pointB.x === lineB.pointA.x && lineA.pointB.y === lineB.pointA.y || lineA.pointB.x === lineB.pointB.x && lineA.pointB.y === lineB.pointB.y) {
        return lineA.pointB.clone();
      }

      return new _common.Vector();
    }
    /**
     * get tow line border arc by radius
     * @param lineA
     * @param lineB
     * @param radius
     */

  }, {
    key: "getArcCenterPoint",
    value: function getArcCenterPoint(lineA, lineB, radius) {
      var kLineA = lineA.getSlope();
      var angleA = Math.atan(kLineA);
      var angleB = this.getRadian(lineA, lineB) / 2;
      var intersectionPoint = this.getIntersection(lineA, lineB);
      var pointX = radius / Math.sqrt(Math.pow(Math.sin(angleA), 2) * (Math.pow(Math.atan(angleA + angleB), 2) + 1)) + intersectionPoint.x;
      var pointY = Math.tan(angleA + angleB) * (pointX - intersectionPoint.x) + intersectionPoint.y;
      return new _common.Vector(pointX, pointY);
    }
    /**
     * get curve start point and end point
     */

  }, {
    key: "getLineAnglePoint",
    value: function getLineAnglePoint(lineA, lineB, radius, intersectionPoint) {
      var angle = this.getRadian(lineA, lineB) / 2;
      console.log(lineA, lineB, angle, lineA.getSlope(), lineB.getSlope());
      var pointAX = intersectionPoint.x - radius / Math.tan(angle) * Math.sqrt(Math.pow(lineA.getSlope(), 2) + 1);

      if (pointAX < Math.min(lineA.pointA.x, lineA.pointB.x) || pointAX > Math.max(lineA.pointA.x, lineB.pointB.x)) {
        pointAX = intersectionPoint.x * 2 - pointAX;
      }

      var pointAY = lineA.getSlope() * (intersectionPoint.x - pointAX) + intersectionPoint.y;
      var pointBX = intersectionPoint.x - radius / Math.tan(angle) * Math.sqrt(Math.pow(lineB.getSlope(), 2) + 1);

      if (pointBX < Math.min(lineB.pointA.x, lineB.pointB.x) || pointBX > Math.max(lineB.pointA.x, lineB.pointB.x)) {
        pointBX = intersectionPoint.x * 2 - pointBX;
      }

      var pointBY = lineB.getSlope() * (intersectionPoint.x - pointBX) + intersectionPoint.y;
      return new _common.Line(new _common.Vector(pointAX, pointAY), new _common.Vector(pointBX, pointBY));
    }
  }]);

  return AngleUtils;
}();

exports.AngleUtils = AngleUtils;