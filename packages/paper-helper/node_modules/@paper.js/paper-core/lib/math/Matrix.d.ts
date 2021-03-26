export declare class Matrix {
    static create(element: Array<Array<number>>): Matrix;
    constructor(element: Array<Array<number>>);
    matrix: Array<Array<number>>;
    dot(matrix: Matrix): Matrix;
    cross(matrix: Matrix): Matrix;
    multiply(matrix: Matrix): Matrix;
}
