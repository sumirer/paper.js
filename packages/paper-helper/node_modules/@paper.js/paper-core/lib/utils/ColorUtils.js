"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorUtils = void 0;

var _common = require("../common");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ColorUtils = /*#__PURE__*/function () {
  function ColorUtils() {
    _classCallCheck(this, ColorUtils);
  }

  _createClass(ColorUtils, null, [{
    key: "getLinearGradientByStep",
    value:
    /**
     * get linear gradient color by percentage
     * @param startColor
     * @param endColor
     * @param step
     */
    function getLinearGradientByStep(startColor, endColor, step) {
      var colorR = (endColor.red - startColor.red) * step + startColor.red;
      var colorG = (endColor.green - startColor.green) * step + startColor.green;
      var colorB = (endColor.blue - startColor.blue) * step + startColor.blue;
      var colorA = (endColor.alpha - startColor.alpha) * step + startColor.alpha;
      return new _common.Color(colorR, colorG, colorB, colorA);
    }
  }]);

  return ColorUtils;
}();

exports.ColorUtils = ColorUtils;