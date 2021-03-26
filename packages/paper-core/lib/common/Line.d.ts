import { Vector } from "./Vector";
export declare class Line {
    constructor(pointA: Vector, pointB: Vector);
    pointA: Vector;
    pointB: Vector;
    getSlope(): number;
    getDx(): number;
    getDy(): number;
    getVector(): Vector;
}
