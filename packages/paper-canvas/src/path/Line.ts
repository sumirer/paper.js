import {Matrix, Vector} from "@paper.js/paper-core/lib";

export class Line {

    constructor(startPoint: Vector, endPoint: Vector) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    startPoint: Vector;

    endPoint: Vector;

    changeWithMatrix(operation: Vector, matrix: Matrix) {

    }
}
