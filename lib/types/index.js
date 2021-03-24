"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  AnimationListener: true
};
exports.AnimationListener = void 0;

var _style = require("./style");

Object.keys(_style).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _style[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _style[key];
    }
  });
});

var _Animation = require("./Animation");

Object.keys(_Animation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Animation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Animation[key];
    }
  });
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnimationListener = function AnimationListener() {
  _classCallCheck(this, AnimationListener);
};

exports.AnimationListener = AnimationListener;