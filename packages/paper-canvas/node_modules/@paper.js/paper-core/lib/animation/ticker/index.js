"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Ticker = require("./Ticker");

Object.keys(_Ticker).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Ticker[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Ticker[key];
    }
  });
});

var _Bezier = require("./Bezier");

Object.keys(_Bezier).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Bezier[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Bezier[key];
    }
  });
});