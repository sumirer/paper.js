import { BaseShape } from "./";
import { IShapeStyle } from "../types";
import { Vector } from "../common";
export declare class PointMap extends BaseShape {
    constructor(points: Array<Vector>, style: IShapeStyle);
    pointInBound(point: Vector): boolean;
    pointInShape(point: Vector): boolean;
    updateWithNewPoint(points: Array<Vector>): void;
    draw(): void;
}
