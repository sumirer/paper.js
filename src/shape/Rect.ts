import {BaseShape} from "./BaseShape";
import {Vector} from "../common";
import {IShapeStyle} from "../types";

export class Rect extends BaseShape {

    constructor(centerPoint: Vector, radius: number, style: IShapeStyle) {
        super([centerPoint], style);
        this.centerPoint = centerPoint;
        this.radius = radius;
    }

    centerPoint: Vector;

    radius: number;

    draw(): void {
        this.paint?.beginPath();
        this.paint?.arc(this.centerPoint.x, this.centerPoint.y, this.radius, 0, 2 * Math.PI);
        this.paint?.closePath();
        if (this.fill) {
            this.paint?.fill();
        }
        if (this.stroke) {
            this.paint?.stroke();
        }
    }

    pointInBound(point: Vector): boolean {
        return false;
    }

    pointInShape(point: Vector): boolean {
        return false;
    }

}
