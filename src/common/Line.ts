import Point from "./Point";
import AngleUtils from "../utils/AngleUtils";
import Vector from "./Vector";

class Line {
    constructor(pointA: Point, pointB: Point) {
        this.pointA = pointA;
        this.pointB = pointB;
    }

    pointA: Point;

    pointB: Point;

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

export default Line;
