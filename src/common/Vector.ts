import {Matrix} from "../math";

export class Vector {

    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public x: number;

    public y: number;

    public z: number;

    move(dx: number, dy: number, dz: number = 0) {
        this.x += dx;
        this.y += dy;
        this.z += dz;
    }

    clone(): Vector {
        return new Vector(this.x, this.y, this.z);
    }

    toMatrix(): Matrix {
        return Matrix.create([[this.x], [this.y], [1]]);
    }

    changeWith(vector: Vector): Vector {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;
        return this;
    }

    static fromMatrix(matrix: Matrix): Vector {
        return new Vector(matrix.matrix[0][0], matrix.matrix[1][0], matrix.matrix[2][0]);
    }
}

