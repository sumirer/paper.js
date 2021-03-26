"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BoundingClientRect = require("./BoundingClientRect");

Object.keys(_BoundingClientRect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BoundingClientRect[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BoundingClientRect[key];
    }
  });
});

var _Line = require("./Line");

Object.keys(_Line).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Line[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Line[key];
    }
  });
});

var _Vector = require("./Vector");

Object.keys(_Vector).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Vector[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Vector[key];
    }
  });
});

var _Color = require("./Color");

Object.keys(_Color).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Color[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Color[key];
    }
  });
});