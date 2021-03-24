"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaseShape = require("./BaseShape");

Object.keys(_BaseShape).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BaseShape[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BaseShape[key];
    }
  });
});

var _Polygon = require("./Polygon");

Object.keys(_Polygon).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Polygon[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Polygon[key];
    }
  });
});

var _Triangle = require("./Triangle");

Object.keys(_Triangle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Triangle[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Triangle[key];
    }
  });
});

var _PointMap = require("./PointMap");

Object.keys(_PointMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _PointMap[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PointMap[key];
    }
  });
});

var _LineMap = require("./LineMap");

Object.keys(_LineMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _LineMap[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _LineMap[key];
    }
  });
});

var _DrawMap = require("./DrawMap");

Object.keys(_DrawMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DrawMap[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DrawMap[key];
    }
  });
});

var _Rect = require("./Rect");

Object.keys(_Rect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Rect[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Rect[key];
    }
  });
});