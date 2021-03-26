"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require("./style");

Object.keys(_style).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
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
  if (key in exports && exports[key] === _Animation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Animation[key];
    }
  });
});