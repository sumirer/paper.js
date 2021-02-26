import BaseShape from "./BaseShape";
import Point from "../common/Point";
import BoundUtils from "../utils/BoundUtils";
import {IShapeStyle} from "../types/style";

class Polygon extends BaseShape {

    constructor(points: Array<Point>, style: IShapeStyle) {
        super(points, style);
    }

    pointInBound(point: Point): boolean {
        return BoundUtils.pointInLine(this.points, point, 1, true);
    }

    pointInShape(point: Point): boolean {
        return BoundUtils.pointInPolygon(this.points, point);
    }

    draw(): void {
        this.paint?.moveTo(this.points[0].x, this.points[0].y);
        for (let index = 1; index < this.points.length; index++) {
            this.paint?.lineTo(this.points[index].x, this.points[index].y);
        }
        this.paint?.closePath();
        this.paint?.closePath();
        if (this.fill) {
            this.paint?.fill();
        }
        if (this.stroke) {
            this.paint?.stroke();
        }
    }
}

export default Polygon;
