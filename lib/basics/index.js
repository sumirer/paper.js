"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DrawingBoard = require("./DrawingBoard");

Object.keys(_DrawingBoard).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _DrawingBoard[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DrawingBoard[key];
    }
  });
});