"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Linear = require("./Linear");

Object.keys(_Linear).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Linear[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Linear[key];
    }
  });
});

var _BezierCurve = require("./BezierCurve");

Object.keys(_BezierCurve).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BezierCurve[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BezierCurve[key];
    }
  });
});

var _Travel = require("./Travel");

Object.keys(_Travel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Travel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Travel[key];
    }
  });
});