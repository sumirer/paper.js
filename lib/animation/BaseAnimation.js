"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseAnimation = exports.AnimationEvent = void 0;

var _common = require("../common");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AnimationEvent;
exports.AnimationEvent = AnimationEvent;

(function (AnimationEvent) {
  AnimationEvent[AnimationEvent["DONE"] = 0] = "DONE";
  AnimationEvent[AnimationEvent["CANCEL"] = 1] = "CANCEL";
  AnimationEvent[AnimationEvent["FORWARD"] = 2] = "FORWARD";
  AnimationEvent[AnimationEvent["REVERSE"] = 3] = "REVERSE";
})(AnimationEvent || (exports.AnimationEvent = AnimationEvent = {}));

var BaseAnimation = /*#__PURE__*/function () {
  function BaseAnimation(params) {
    var _params$duration;

    _classCallCheck(this, BaseAnimation);

    this.listener = [];
    this.statusListener = [];
    this.requestId = -1;
    this.itemList = [];
    this.stop = false;
    this.performanceTime = 0;
    this.duration = (_params$duration = params.duration) !== null && _params$duration !== void 0 ? _params$duration : 500;
    this.runDuration = this.duration; // this.vector2d = vector2d;
  }

  _createClass(BaseAnimation, [{
    key: "addShape",
    value: function addShape(item) {
      this.itemList.push(item);
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(listener) {
      this.listener.push(listener);
    }
  }, {
    key: "addStatusListener",
    value: function addStatusListener(listener) {
      this.statusListener.push(listener);
    }
    /**
     * cancel animation
     */

  }, {
    key: "cancel",
    value: function cancel() {
      if (this.stop) {
        return;
      }

      if (this.requestId == -1) {
        this.stop = true;
        return;
      }

      this.stop = true;
      window.cancelAnimationFrame(this.requestId);
    }
    /**
     * get animation action
     */

  }, {
    key: "inAnimation",
    value: function inAnimation() {
      return !this.stop;
    }
  }, {
    key: "forward",
    value: function forward() {
      var _this = this;

      this.stop = false;
      this.performanceTime = 0;
      this.runDuration = 0;

      var run = function run(time) {
        if (_this.performanceTime === 0) {
          _this.performanceTime = time;
        }

        _this.runDuration += time - _this.performanceTime;

        if (_this.runDuration > _this.duration || _this.stop) {
          _this.stopAnimation(AnimationEvent.FORWARD);

          return;
        }

        _this.runNextTick(_this.runDuration);

        _this.performanceTime = time; // @ts-ignore

        _this.requestId = (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(run);
      }; // @ts-ignore


      this.requestId = (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(run);
    }
  }, {
    key: "reverse",
    value: function reverse() {
      var _this2 = this;

      this.stop = false;
      this.performanceTime = 0;
      this.runDuration = this.duration;

      var run = function run(time) {
        if (_this2.performanceTime === 0) {
          _this2.performanceTime = time;
        }

        _this2.runDuration -= time - _this2.performanceTime;

        if (_this2.runDuration < 0 || _this2.stop) {
          _this2.stopAnimation(AnimationEvent.REVERSE);

          return;
        }

        _this2.runNextTick(_this2.runDuration);

        _this2.performanceTime = time; // @ts-ignore

        _this2.requestId = (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(run);
      }; // @ts-ignore


      this.requestId = (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(run);
    }
    /**
     * repeat run animation
     */

  }, {
    key: "repeat",
    value: function repeat() {
      var _this3 = this;

      this.stop = false;
      this.performanceTime = 0;
      this.runDuration = this.duration;

      var run = function run(time) {
        if (_this3.performanceTime === 0) {
          _this3.performanceTime = time;
        }

        _this3.runDuration -= time - _this3.performanceTime;

        if (_this3.stop) {
          _this3.stopAnimation(AnimationEvent.CANCEL);

          return;
        }

        if (_this3.runDuration < 0) {
          _this3.runDuration = _this3.duration;
        }

        _this3.runNextTick(_this3.runDuration);

        _this3.performanceTime = time; // @ts-ignore

        _this3.requestId = (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(run);
      }; // @ts-ignore


      this.requestId = (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(run);
    }
    /**
     * stop animation
     * @param eventType
     */

  }, {
    key: "stopAnimation",
    value: function stopAnimation(eventType) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = -1; // if (this.stop) {
      //     this.listener.forEach(item => item(AnimationEvent.CANCEL));
      // } else {
      //     this.stop = true;
      //     this.listener.forEach(item => item(eventType));
      // }
    }
    /**
     * move shape by tick time
     * @param duration
     */

  }, {
    key: "runNextTick",
    value: function runNextTick(duration) {
      var _this4 = this;

      var vector = this.runner(duration);

      if (!this.lastVector) {
        this.lastVector = vector;
      } // this.statusListener.forEach(listener => listener(duration / this.duration));


      this.itemList.forEach(function (shape) {
        if (shape instanceof _common.Vector || shape.canAnimated) {
          // @ts-ignore
          shape.move(vector.x - _this4.lastVector.x, vector.y - _this4.lastVector.y);
        }
      });
      this.lastVector = vector;
    }
  }]);

  return BaseAnimation;
}();

exports.BaseAnimation = BaseAnimation;