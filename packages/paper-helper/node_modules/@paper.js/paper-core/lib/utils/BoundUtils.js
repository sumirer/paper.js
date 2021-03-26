"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoundUtils = void 0;

var _common = require("../common");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BoundUtils = /*#__PURE__*/function () {
  function BoundUtils() {
    _classCallCheck(this, BoundUtils);
  }

  _createClass(BoundUtils, null, [{
    key: "inLine",
    value:
    /**
     * check point in line
     * @param pointA
     * @param pointB
     * @param checkPoint
     * @param lineWidth
     */
    function inLine(pointA, pointB, checkPoint) {
      var lineWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      // if line width is 1px use line
      if (lineWidth === 1) {
        return (checkPoint.x - pointA.x) * (pointA.y - pointB.y) == (pointA.x - pointB.x) * (checkPoint.y - pointA.y) && Math.min(pointB.x, pointA.x) <= checkPoint.x && checkPoint.x <= Math.max(pointA.x, pointB.x) && Math.min(pointA.y, pointB.y) <= checkPoint.y && checkPoint.y <= Math.max(pointA.y, pointB.y); // return (pointA.x - checkPoint.x) * (checkPoint.y - pointB.y) === (checkPoint.x - pointB.x) * (pointA.y - checkPoint.y)
        //     && checkPoint.x >= Math.min(pointA.x, pointB.x)
        //     && checkPoint.x <= Math.max(pointA.x, pointB.x);
      } // use shape matrix check
      // return this.inMatrix();


      return false;
    }
    /**
     * check point in the one of line
     * @param points shape point list
     * @param checkPoint
     * @param lineWidth line width,if line width not'n 1px use shape function vif this line
     * @param close shape is close
     */

  }, {
    key: "pointInLine",
    value: function pointInLine(points, checkPoint) {
      var lineWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var close = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      for (var index = 0, afterIndex = 1; index < points.length; index++, afterIndex++) {
        var point = points[index]; // if is close shape,the last line check

        if (!points[afterIndex] && close) {
          return this.inLine(point, points[0], checkPoint, lineWidth);
        }

        if (this.inLine(point, points[afterIndex], checkPoint, lineWidth)) {
          return true;
        }
      }

      return false;
    }
    /**
     * point in polygon
     * @param points
     * @param point
     */

  }, {
    key: "pointInPolygon",
    value: function pointInPolygon(points, point) {
      var oddNodes = false;

      for (var i = 0, j = points.length - 1; i < points.length; i++) {
        if (points[i].y < point.y && points[j].y >= point.y || points[j].y < point.y && points[i].y >= point.y) {
          if (points[i].x + (point.y - points[i].y) / (points[j].y - points[i].y) * (points[j].x - points[i].x) < point.x) {
            oddNodes = !oddNodes;
          }
        }

        j = i;
      }

      return oddNodes;
    }
  }, {
    key: "getBoundCrossRect",
    value: function getBoundCrossRect(boundA, boundB) {
      // out of bound
      if (boundB.minX > boundA.maxX || boundB.maxX < boundA.minX || boundB.maxY > boundA.minY || boundB.minY < boundA.maxY) {
        return undefined;
      } // center cross


      if (boundB.minX >= boundA.minX && boundB.maxX <= boundA.maxX) {
        var minX = boundB.minX;
        var maxX = boundB.maxX;
        var minY = 0;
        var maxY = 0;

        if (boundA.maxY <= boundB.maxY && boundA.minY >= boundB.minY) {
          minY = boundA.minY;
          maxY = boundA.maxY;
        }

        if (boundB.maxY > boundA.minY && boundB.maxY < boundA.maxY) {}

        return new _common.BoundingClientRect(minX, minY, maxX, maxY);
      }

      if (boundA.minX >= boundB.minX && boundA.maxX <= boundB.maxX && boundB.maxY <= boundA.maxY && boundB.minY >= boundA.minY) {
        return new _common.BoundingClientRect(boundA.minX, boundB.minY, boundA.maxX, boundB.maxY);
      }
    }
  }]);

  return BoundUtils;
}();

exports.BoundUtils = BoundUtils;