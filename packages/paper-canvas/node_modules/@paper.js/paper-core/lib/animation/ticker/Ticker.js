"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _types = require("../../types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ticker = /*#__PURE__*/function () {
  function Ticker(duration) {
    _classCallCheck(this, Ticker);

    this.duration = duration;
    this.runDuration = duration;
  }

  _createClass(Ticker, [{
    key: "reset",
    value: function reset() {
      this.runDuration = this.duration;
    }
  }, {
    key: "setTick",
    value: function setTick(time) {
      if (this.tickType === _types.TickType.FORWARD) {
        this.runDuration += time;
      } else {
        this.runDuration -= time;
      }
    }
  }, {
    key: "startWithReverse",
    value: function startWithReverse() {
      this.tickType = _types.TickType.REVERSE;
      this.runDuration = this.duration;
    }
  }, {
    key: "startWithForward",
    value: function startWithForward() {
      this.tickType = _types.TickType.FORWARD;
      this.runDuration = 0;
    }
  }, {
    key: "runTick",
    value: function runTick(time) {
      this.setTick(time);
      return this.tick(this.runDuration / this.duration);
    }
  }]);

  return Ticker;
}();

exports["default"] = Ticker;