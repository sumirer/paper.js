"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector = void 0;

var _math = require("../math");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vector = /*#__PURE__*/function () {
  function Vector() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
    this.z = z;
  }

  _createClass(Vector, [{
    key: "move",
    value: function move(dx, dy) {
      var dz = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      this.x += dx;
      this.y += dy;
      this.z += dz;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vector(this.x, this.y, this.z);
    }
  }, {
    key: "toMatrix",
    value: function toMatrix() {
      return _math.Matrix.create([[this.x], [this.y], [this.z]]);
    }
  }, {
    key: "reduceWith",
    value: function reduceWith(vector) {
      this.x -= vector.x;
      this.y -= vector.y;
      this.z -= vector.z;
      return this;
    }
  }, {
    key: "addWith",
    value: function addWith(vector) {
      this.x += vector.x;
      this.y += vector.y;
      this.z += vector.z;
      return this;
    }
  }], [{
    key: "fromMatrix",
    value: function fromMatrix(matrix) {
      return new Vector(matrix.matrix[0][0], matrix.matrix[1][0], matrix.matrix[2][0]);
    }
  }, {
    key: "create",
    value: function create() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      return new Vector(x, y, z);
    }
  }]);

  return Vector;
}();

exports.Vector = Vector;