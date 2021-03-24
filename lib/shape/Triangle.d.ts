import { BaseShape } from "./";
import { Vector } from "../common";
import { IShapeStyle } from "../types";
export declare class Triangle extends BaseShape {
    constructor(points: Array<Vector>, style?: IShapeStyle);
    borderRadius: number;
    name: string;
    pointInBound(point: Vector): boolean;
    pointInShape(point: Vector): boolean;
    getBorderRadiusPath(): Array<Vector>;
    draw(): void;
}
