"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Matrix = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Matrix = /*#__PURE__*/function () {
  function Matrix(element) {
    _classCallCheck(this, Matrix);

    this.matrix = element;
  }

  _createClass(Matrix, [{
    key: "dot",
    value: function dot(matrix) {
      return Matrix.create([[0, 0, 0]]);
    }
  }, {
    key: "cross",
    value: function cross(matrix) {
      return Matrix.create([[0, 0, 0]]);
    }
  }, {
    key: "multiply",
    value: function multiply(matrix) {
      if (this.matrix[0].length !== matrix.matrix.length) {
        throw Error('multiply matrix column length must be equal matrix row length');
      }

      var pMatrix = matrix.matrix;
      var matrixLength = this.matrix.length;
      var matrixRowLength = this.matrix[0].length;
      var pMatrixLength = pMatrix[0].length;
      var newMatrixArray = new Array(matrixLength).fill(0).map(function () {
        return new Array(pMatrixLength).fill(0);
      });

      for (var i = 0; i < matrixLength; i++) {
        for (var j = 0; j < pMatrixLength; j++) {
          for (var k = 0; k < matrixRowLength; k++) {
            newMatrixArray[i][j] += this.matrix[i][k] * pMatrix[k][j];
          }
        }
      }

      return Matrix.create(newMatrixArray);
    }
  }], [{
    key: "create",
    value: function create(element) {
      return new Matrix(element);
    }
  }]);

  return Matrix;
}();

exports.Matrix = Matrix;