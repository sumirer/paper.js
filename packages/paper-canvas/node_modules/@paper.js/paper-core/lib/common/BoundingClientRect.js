"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoundingClientRect = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BoundingClientRect = function BoundingClientRect() {
  var minX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var minY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var maxX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var maxY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  _classCallCheck(this, BoundingClientRect);

  this.minX = minX;
  this.minY = minY;
  this.maxX = maxX;
  this.maxY = maxY;
};

exports.BoundingClientRect = BoundingClientRect;