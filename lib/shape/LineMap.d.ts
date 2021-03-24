import { BaseShape } from "./BaseShape";
import { Vector } from "../common";
import { IShapeStyle } from "../types";
export declare class LineMap extends BaseShape {
    constructor(startPoint: Vector, endPoint: Vector, style: IShapeStyle);
    lineList: Array<Array<Vector>>;
    pointInBound(point: Vector): boolean;
    pointInShape(point: Vector): boolean;
    addLine(star: Vector, end: Vector): void;
    move(x: number, y: number, point?: Vector | undefined): void;
    draw(): void;
}
