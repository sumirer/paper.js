import { BaseShape } from "./BaseShape";
import { Vector } from "../common";
import { IShapeStyle } from "../types";
export declare class Rect extends BaseShape {
    constructor(centerPoint: Vector, radius: number, style: IShapeStyle);
    centerPoint: Vector;
    radius: number;
    draw(): void;
    pointInBound(point: Vector): boolean;
    pointInShape(point: Vector): boolean;
}
