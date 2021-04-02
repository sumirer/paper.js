import {Matrix} from ".";

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
        return Matrix.create([[this.x], [this.y], [this.z]]);
    }

    reduceWith(vector: Vector): Vector {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;
        return this;
    }

    addWith(vector: Vector): Vector {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
        return this;
    }

    changeWithMatrix(operation: Vector, matrix: Matrix): Vector {
        this.reduceWith(operation);
        return Vector.fromMatrix(matrix.multiply(this.toMatrix()));
    }

    addOffset(offset: Vector): Vector {
        return Vector.create(this.x + offset.x, this.y + offset.y, this.z + offset.z);
    }

    /**
     * only change with n×3 matrix
     * @param matrix
     */
    static fromMatrix(matrix: Matrix): Vector {
        return new Vector(matrix.matrix[0][0], matrix.matrix[1][0], matrix.matrix[2][0]);
    }


    static create(x = 0, y = 0, z = 0): Vector {
        return new Vector(x, y, z);
    }

    /**
     * create with point
     * @param p1
     * @param p2
     */
    static createWith(p1: Vector, p2: Vector): Vector {
        return Vector.create(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
    }

    /**
     * create inverse vector
     * @param v
     */
    static inverse(v: Vector): Vector {
        return Vector.create(-v.x, -v.y, -v.z);
    }
}

