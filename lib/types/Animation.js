"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationType = exports.TickType = exports.AnimationEvent = void 0;
var AnimationEvent;
exports.AnimationEvent = AnimationEvent;

(function (AnimationEvent) {
  AnimationEvent[AnimationEvent["DONE"] = 0] = "DONE";
  AnimationEvent[AnimationEvent["CANCEL"] = 1] = "CANCEL";
  AnimationEvent[AnimationEvent["FORWARD"] = 2] = "FORWARD";
  AnimationEvent[AnimationEvent["REVERSE"] = 3] = "REVERSE";
})(AnimationEvent || (exports.AnimationEvent = AnimationEvent = {}));

var TickType;
exports.TickType = TickType;

(function (TickType) {
  TickType[TickType["FORWARD"] = 1] = "FORWARD";
  TickType[TickType["REVERSE"] = 2] = "REVERSE";
})(TickType || (exports.TickType = TickType = {}));

var AnimationType;
exports.AnimationType = AnimationType;

(function (AnimationType) {
  AnimationType[AnimationType["FORWARD"] = 1] = "FORWARD";
  AnimationType[AnimationType["REVERSE"] = 2] = "REVERSE";
})(AnimationType || (exports.AnimationType = AnimationType = {}));