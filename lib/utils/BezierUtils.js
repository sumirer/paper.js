"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BezierUtils = void 0;

var _common = require("../common");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BezierUtils = /*#__PURE__*/function () {
  function BezierUtils() {
    _classCallCheck(this, BezierUtils);
  }

  _createClass(BezierUtils, null, [{
    key: "getBezierCurveXByTime",
    value: function getBezierCurveXByTime() {
      return 0;
    }
    /**
     * get three level bezier curve step by path
     * @param startPoint
     * @param controlPointA
     * @param controlPointB
     * @param endPoint
     * @param step
     */

  }, {
    key: "getBezierCurveAnimationStep",
    value: function getBezierCurveAnimationStep(startPoint, controlPointA, controlPointB, endPoint, step) {
      var point = new _common.Vector();
      point.x = this.getBezierCurveStep(startPoint.x, controlPointA.x * endPoint.x, controlPointB.x * endPoint.x, endPoint.x, step);
      point.y = this.getBezierCurveStep(startPoint.y, controlPointA.y * endPoint.y, controlPointB.y * endPoint.y, endPoint.y, step);
      return point;
    }
  }, {
    key: "getBezierCurveStep",
    value: function getBezierCurveStep(start, controlA, controlB, end, step) {
      var runningStep = 1 - step;
      return start * Math.pow(runningStep, 3) + 3 * controlA * step * Math.pow(runningStep, 2) + 3 * controlB * Math.pow(step, 2) * runningStep + end * Math.pow(step, 3);
    }
  }]);

  return BezierUtils;
}();

exports.BezierUtils = BezierUtils;