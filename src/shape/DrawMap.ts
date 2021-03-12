import {BaseShape} from "./BaseShape";
import {Vector} from "../common";
import {IShapeStyle} from "../types";

export class DrawMap extends BaseShape{

    constructor(startPoint: Vector, endPoint: Vector, style: IShapeStyle) {
        super([startPoint, new Vector(endPoint.x, startPoint.y), endPoint, new Vector(startPoint.x, endPoint.y)], style);
    }

    drawFn: Function| undefined;

    drawOp(fn: Function){
        this.drawFn = fn;
    }

    draw(): void {
        this.paint?.beginPath();
        // @ts-ignore
        this.drawFn(this.paint);
    }

    pointInBound(point: Vector): boolean {
        return false;
    }

    pointInShape(point: Vector): boolean {
        return false;
    }

}
