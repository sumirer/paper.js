import { BaseShape } from "./BaseShape";
import { Vector } from "../common";
import { IShapeStyle } from "../types";
export declare class DrawMap extends BaseShape {
    constructor(startPoint: Vector, endPoint: Vector, style: IShapeStyle);
    drawFn: Function | undefined;
    drawOp(fn: Function): void;
    draw(): void;
    pointInBound(point: Vector): boolean;
    pointInShape(point: Vector): boolean;
}
