import {BaseShape} from "./";
import {BoundUtils} from "../utils";
import {IShapeStyle} from "../types";
import {Vector} from "../common";

export class Polygon extends BaseShape {

    constructor(points: Array<Vector>, style: IShapeStyle) {
        super(points, style);
    }

    pointInBound(point: Vector): boolean {
        return BoundUtils.pointInLine(this.points, point, 1, true);
    }

    pointInShape(point: Vector): boolean {
        return BoundUtils.pointInPolygon(this.points, point);
    }

    draw(): void {
        this.paint?.beginPath();
        this.paint?.moveTo(this.points[0].x, this.points[0].y);
        for (let index = 1; index < this.points.length; index++) {
            this.paint?.lineTo(this.points[index].x, this.points[index].y);
        }
        this.paint?.closePath();
        if (this.fill) {
            this.paint?.fill();
        }
        if (this.stroke) {
            this.paint?.stroke();
        }
    }
}
