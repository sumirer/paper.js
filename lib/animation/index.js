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

var _BaseAnimation = require("./BaseAnimation");

Object.keys(_BaseAnimation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BaseAnimation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BaseAnimation[key];
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

var _VariableSpeed = require("./VariableSpeed");

Object.keys(_VariableSpeed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _VariableSpeed[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _VariableSpeed[key];
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