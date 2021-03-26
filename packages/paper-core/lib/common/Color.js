"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Color = void 0;

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Color = /*#__PURE__*/function () {
  function Color(red, green, blue) {
    var alpha = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    _classCallCheck(this, Color);

    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }

  _createClass(Color, [{
    key: "toHexString",
    value:
    /**
     * to hex color string
     */
    function toHexString() {
      var r = Math.floor(this.alpha * this.red + (1 - this.alpha) * 255);
      var g = Math.floor(this.alpha * this.green + (1 - this.alpha) * 255);
      var b = Math.floor(this.alpha * this.blue + (1 - this.alpha) * 255);
      return "#" + ("0" + r.toString(16)).slice(-2) + ("0" + g.toString(16)).slice(-2) + ("0" + b.toString(16)).slice(-2);
    }
  }], [{
    key: "formRGB",
    value:
    /**
     * get color from rgb
     * @param r
     * @param g
     * @param b
     */
    function formRGB(r, g, b) {
      return new Color(r, g, b, 1);
    }
    /**
     * get color from rgba
     * @param r
     * @param g
     * @param b
     * @param a
     */

  }, {
    key: "fromRGBA",
    value: function fromRGBA(r, g, b, a) {
      return new Color(r, b, b, a);
    }
    /**
     * get color from hex string
     * @param hex
     */

  }, {
    key: "formHex",
    value: function formHex(hex) {
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      var color = hex.toLowerCase();

      if (color && reg.test(color)) {
        if (color.length === 4) {
          var colorNew = "#";

          for (var index = 1; index < 4; index += 1) {
            colorNew += color.slice(index, index + 1).concat(color.slice(index, index + 1));
          }

          color = colorNew;
        }

        var colorRGBA = [];

        for (var _index = 1; _index < 7; _index += 2) {
          colorRGBA.push(Number.parseInt("0x" + color.slice(_index, _index + 2)));
        } // @ts-ignore


        return _construct(Color, colorRGBA);
      }

      throw Error("input color string isn't hex color string, please check you color string");
    }
  }]);

  return Color;
}();

exports.Color = Color;