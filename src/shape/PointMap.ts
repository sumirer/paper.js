import {BaseShape} from "./";
import {IShapeStyle} from "../types";
import {Vector} from "../common";

export class PointMap extends BaseShape {

    constructor(points: Array<Vector>, pointSize: number,  style: IShapeStyle) {
        super(points, style);
        this.pointSize = pointSize;
    }

    public pointSize: number;

    pointInBound(point: Vector): boolean {
        return false;
    }

    pointInShape(point: Vector): boolean {
        return false;
    }

    updateWithNewPoint(points: Array<Vector>){
        this.points = points;
        this.update();
    }

    draw(): void {
        this.paint?.beginPath();
        this.paint?.moveTo(this.points[0].x, this.points[0].y);
        for (let index = 1; index < this.points.length; index++) {
            this.paint?.strokeRect(this.points[index].x, this.points[index].y, this.pointSize,this.pointSize);
        }
    }
}
