import {Vector} from "./Vector";

export class RadiusArc {

    constructor(pointA: Vector, pointB: Vector, radius: number) {
        this.pointA = pointA;
        this.pointB = pointB;
        this.radius = radius;
    }

    pointA: Vector;

    pointB: Vector;

    radius: number;

    static create(v1: Vector, v2: Vector, radius: number) {
        return new RadiusArc(v1, v2, radius);
    }
}
