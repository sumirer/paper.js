"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IFS = require("./IFS");

Object.keys(_IFS).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _IFS[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _IFS[key];
    }
  });
});