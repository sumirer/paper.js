"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IFSExpression = exports.IFS = void 0;

var _common = require("../common");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var IFS = /*#__PURE__*/function () {
  function IFS(startPoint, loopCount) {
    _classCallCheck(this, IFS);

    this.count = 0;
    this.centerPoint = new _common.Vector(0, 0);
    this.expressionList = [];
    this.probability = 0;
    this.matrixList = [];
    this.pointList = [];
    this.count = loopCount;
    this.startPoint = startPoint;
  }
  /**
   * loop count
   */


  _createClass(IFS, [{
    key: "setCenterPoint",
    value:
    /**
     * set zero point
     * @param point
     */
    function setCenterPoint(point) {
      this.centerPoint = point;
    }
    /**
     * add expression to computed list
     * @param expression
     */

  }, {
    key: "addExpression",
    value: function addExpression(expression) {
      this.probability += expression.probability;
      expression.probability = this.probability;
      this.expressionList.push(expression);
      this.expressionList.sort(function (a, b) {
        return a.probability - b.probability;
      });
    }
    /**
     * add matrix to change point
     * @param matrix
     */

  }, {
    key: "addChangeMatrix",
    value: function addChangeMatrix(matrix) {
      this.matrixList.push(matrix);
    }
    /**
     * computed ifs get result
     */

  }, {
    key: "searchExpressionByProbability",
    value: function searchExpressionByProbability(probability) {
      return this.expressionList.find(function (item) {
        return probability <= item.probability;
      });
    }
    /**
     * compute new pint by matrix
     * @param point
     */

  }, {
    key: "computeWithMatrix",
    value: function computeWithMatrix(point) {
      var newPoint = point.reduceWith(this.centerPoint);

      for (var index = 0; index < this.matrixList.length; index++) {
        newPoint = _common.Vector.fromMatrix(this.matrixList[index].multiply(newPoint.toMatrix()));
      }

      return newPoint;
    }
  }, {
    key: "startLoop",
    value: function startLoop() {
      var lastPoint = this.startPoint;

      for (var index = 0; index < this.count; index++) {
        var probability = Math.random();
        var exp = this.searchExpressionByProbability(probability);

        if (exp) {
          lastPoint = exp.compute(lastPoint);
        }

        var newPoint = lastPoint.clone();
        newPoint = this.computeWithMatrix(newPoint);
        this.pointList.push(newPoint);
      }
    }
  }]);

  return IFS;
}();

exports.IFS = IFS;

var IFSExpression = /*#__PURE__*/function () {
  function IFSExpression(xX, xY, yX, yY, xB, yB, probability) {
    _classCallCheck(this, IFSExpression);

    this.xX = xX;
    this.xY = xY;
    this.yX = yX;
    this.yY = yY;
    this.xB = xB;
    this.yB = yB;
    this.probability = probability;
  }

  _createClass(IFSExpression, [{
    key: "compute",
    value: function compute(lastPoint) {
      var x = this.xX * lastPoint.x + lastPoint.y * this.xY + this.xB;
      var y = this.yX * lastPoint.x + lastPoint.y * this.yY + this.yB;
      return new _common.Vector(x, y, 1);
    }
  }]);

  return IFSExpression;
}();

exports.IFSExpression = IFSExpression;