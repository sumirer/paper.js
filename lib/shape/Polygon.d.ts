import { BaseShape } from "./";
import { IShapeStyle } from "../types";
import { Vector } from "../common";
export declare class Polygon extends BaseShape {
    constructor(points: Array<Vector>, style: IShapeStyle);
    pointInBound(point: Vector): boolean;
    pointInShape(point: Vector): boolean;
    draw(): void;
}
