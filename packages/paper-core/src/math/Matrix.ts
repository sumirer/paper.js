export class Matrix {
    static create(element: Array<Array<number>>): Matrix {
        return new Matrix(element);
    }

    constructor(element: Array<Array<number>>) {
        this.matrix = element;
    }

    public matrix: Array<Array<number>>;

    public dot(matrix: Matrix): Matrix {
        return Matrix.create([[0, 0, 0]]);
    }

    public cross(matrix: Matrix): Matrix {
        return Matrix.create([[0, 0, 0]]);
    }

    public multiply(matrix: Matrix): Matrix {
        if (this.matrix[0].length !== matrix.matrix.length) {
            throw Error('multiply matrix column length must be equal matrix row length');
        }
        const pMatrix = matrix.matrix;
        const matrixLength = this.matrix.length;
        const matrixRowLength = this.matrix[0].length;
        const pMatrixLength = pMatrix[0].length;
        const newMatrixArray = new Array(matrixLength).fill(0).map(() => new Array(pMatrixLength).fill(0));
        for (let i = 0; i < matrixLength; i++) {
            for (let j = 0; j < pMatrixLength; j++) {
                for (let k = 0; k < matrixRowLength; k++) {
                    newMatrixArray[i][j] += this.matrix[i][k] * pMatrix[k][j];
                }
            }
        }
        return new Matrix(newMatrixArray);
    }
}