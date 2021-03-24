import {AngleUtils} from "../utils";
import {Vector} from "./Vector";

export class Line {
    constructor(pointA: Vector, pointB: Vector) {
        this.pointA = pointA;
        this.pointB = pointB;
    }

    pointA: Vector;

    pointB: Vector;

    getSlope() {
        return AngleUtils.getSlope(this.pointA, this.pointB);
    }

    getDx() {
        return this.pointA.x - this.pointB.x;
    }

    getDy() {
        return this.pointA.y - this.pointB.y;
    }

    getVector() {
        return new Vector(this.getSlope(), 1);
    }
}
