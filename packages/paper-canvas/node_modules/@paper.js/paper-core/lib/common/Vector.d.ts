import { Matrix } from "../math";
export declare class Vector {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
    move(dx: number, dy: number, dz?: number): void;
    clone(): Vector;
    toMatrix(): Matrix;
    reduceWith(vector: Vector): Vector;
    addWith(vector: Vector): Vector;
    /**
     * only change with n×3 matrix
     * @param matrix
     */
    static fromMatrix(matrix: Matrix): Vector;
    static create(x?: number, y?: number, z?: number): Vector;
}
