"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _common = require("../common");

var _types = require("../types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Animation = /*#__PURE__*/function () {
  function Animation() {
    _classCallCheck(this, Animation);

    this.eventListenerList = [];
    this.statusListenerList = [];
    this.travelList = [];
    this.lastPosition = _common.Vector.create();
    this.requestId = -1;
    this.lastTickDate = 0;
  }

  _createClass(Animation, [{
    key: "forward",
    value:
    /**
     * forward execution animation
     * @param callback
     */
    function forward(callback) {
      var _this = this;

      if (!this.ticker) {
        throw new Error('please make sure you ticker has be created..');
      }

      this.ticker.reset();
      this.ticker.startWithForward();
      this.createAnimationFrame(function (time) {
        return _this.runner(time, function () {
          _this.notifyAllEventListener({
            type: _types.AnimationEvent.FORWARD
          });

          if (callback) {
            callback({
              type: _types.AnimationEvent.FORWARD
            });
          }
        });
      });
    }
    /**
     * reverse execution animation
     * @param callback
     */

  }, {
    key: "reverse",
    value: function reverse(callback) {
      var _this2 = this;

      if (!this.ticker) {
        throw new Error('please make sure you ticker has be created..');
      }

      this.ticker.reset();
      this.ticker.startWithReverse();
      this.createAnimationFrame(function (time) {
        return _this2.runner(time, function () {
          _this2.notifyAllEventListener({
            type: _types.AnimationEvent.REVERSE
          });

          if (callback) {
            callback({
              type: _types.AnimationEvent.REVERSE
            });
          }
        });
      });
    }
    /**
     * animation repeat
     */

  }, {
    key: "repeat",
    value: function repeat() {
      var _this3 = this;

      var startType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _types.AnimationType.FORWARD;

      if (startType === _types.AnimationType.FORWARD) {
        this.forward(function () {
          _this3.repeat(startType);
        });
      } else {
        this.reverse(function () {
          _this3.repeat(startType);
        });
      }
    }
    /**
     * vacillate execution animation
     */

  }, {
    key: "vacillate",
    value: function vacillate() {
      var _this4 = this;

      var startType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _types.AnimationType.FORWARD;

      if (startType === _types.AnimationType.FORWARD) {
        this.forward(function () {
          _this4.vacillate(_types.AnimationType.REVERSE);
        });
      } else {
        this.reverse(function () {
          _this4.vacillate(_types.AnimationType.FORWARD);
        });
      }
    }
    /**
     * notify all event listener
     * @param event
     */

  }, {
    key: "notifyAllEventListener",
    value: function notifyAllEventListener(event) {
      this.eventListenerList.forEach(function (listener) {
        return listener(event);
      });
    }
    /**
     * notify all status listener
     * @param status
     */

  }, {
    key: "notifyAllStatusListener",
    value: function notifyAllStatusListener(status) {
      this.statusListenerList.forEach(function (statusListener) {
        return statusListener(status);
      });
    }
    /**
     * add event listener
     * @param eventListener
     */

  }, {
    key: "addEventListener",
    value: function addEventListener(eventListener) {
      this.eventListenerList.push(eventListener);
    }
    /**
     * add status listener
     * @param statusListener
     */

  }, {
    key: "addStatusListener",
    value: function addStatusListener(statusListener) {
      this.statusListenerList.push(statusListener);
    }
    /**
     * you can add more travel in animation
     * but compute result is sum of all results
     * @param travel
     */

  }, {
    key: "addTravel",
    value: function addTravel(travel) {
      this.travelList.push(travel);
    }
    /**
     * A animation has only one ticker
     * @param ticker
     */

  }, {
    key: "addTicker",
    value: function addTicker(ticker) {
      this.ticker = ticker;
    }
    /**
     * compute next tick's position
     * @param tick
     */

  }, {
    key: "getNextPositionByTick",
    value: function getNextPositionByTick(tick) {
      var vector = new _common.Vector();
      this.travelList.forEach(function (travel) {
        vector.addWith(travel.next(tick));
      });
      return vector;
    }
    /**
     * describe animation run path by ticker
     * @param time
     * @param callback
     */

  }, {
    key: "runner",
    value: function runner(time, callback) {
      var _this5 = this;

      if (!this.lastTickDate) {
        this.lastTickDate = time;
      }

      var tick = this.ticker.runTick(time - this.lastTickDate);
      var position = this.getNextPositionByTick(tick);

      if (this.lastTickDate === time) {
        this.lastPosition = position;
      }

      var offset = position.clone().reduceWith(this.lastPosition);
      this.lastPosition = position;
      this.notifyAllStatusListener({
        position: offset,
        progress: tick
      });

      if (tick >= 1) {
        if (callback) {
          callback();
        }

        return;
      }

      this.createAnimationFrame(function (tickTime) {
        return _this5.runner(tickTime, callback);
      });
    }
    /**
     * create animation frame function
     * @param callback
     */

  }, {
    key: "createAnimationFrame",
    value: function createAnimationFrame(callback) {
      this.requestId = (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(callback);
    }
  }]);

  return Animation;
}();

exports["default"] = Animation;