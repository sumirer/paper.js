import BaseShape from "./BaseShape";
import Point from "../common/Point";
import BoundUtils from "../utils/BoundUtils";
import {ITriangleStyle} from "../types/style";
import AngleUtils from "../utils/AngleUtils";
import Line from "../common/Line";

class Triangle extends BaseShape {

    constructor(points: Array<Point>, style: ITriangleStyle = {}) {
        super(points, style);
        if (points.length < 3) {
            throw Error(`triangle must have more than 2 point, got ${points?.length} point`)
        }
        this.fill = !!style.fillRange;
        this.stroke = !!style.strokeBorder;
        this.borderRadius = style.borderRadius ?? 0
    }

    borderRadius: number = 0;

    name = 'triangle';

    pointInBound(point: Point): boolean {
        return BoundUtils.pointInLine(this.points, point, 1, true);
    }

    pointInShape(point: Point): boolean {
        return BoundUtils.pointInPolygon(this.points, point);
    }

    getBorderRadiusPath(): Array<Point> {
        const list = [];
        const line1 = AngleUtils.getLineAnglePoint(new Line(this.points[0], this.points[1]),
            new Line(this.points[1], this.points[2]), this.borderRadius, this.points[1]);
        list.push(line1.pointA, line1.pointB);
        const line2 = AngleUtils.getLineAnglePoint(new Line(this.points[1], this.points[2]),
            new Line(this.points[2], this.points[0]), this.borderRadius, this.points[2]);
        list.push(line2.pointA, line2.pointB);
        const line3 = AngleUtils.getLineAnglePoint(new Line(this.points[2], this.points[0]),
            new Line(this.points[0], this.points[1]), this.borderRadius, this.points[0]);
        list.push(line3.pointA, line3.pointB);
        return list;
    }

    draw(): void {
        this.paint?.beginPath();
        if (this.borderRadius > 0) {
            const points = this.getBorderRadiusPath();
            console.log(points, this.points);
            // points.forEach(item => this.paint?.lineTo(item.x, item.y));
            this.paint?.moveTo(points[0].x, points[0].y);
            for (let index = 2; index < points.length; index += 2) {
                if (!points[index]) {
                    this.paint?.lineTo(points[index - 1].x, points[index - 1].y);
                    this.paint?.arcTo(points[0].x, points[0].y, points[index - 1].x, points[index - 1].y, this.borderRadius);
                    break;
                } else {
                    this.paint?.lineTo(points[index - 1].x, points[index - 1].y);
                    this.paint?.arcTo(points[index].x, points[index].y, points[index - 1].x, points[index - 1].y, this.borderRadius);
                }
            }
        } else {
            this.paint?.moveTo(this.points[0].x, this.points[0].y);
            this.paint?.lineTo(this.points[1].x, this.points[1].y);
            this.paint?.lineTo(this.points[2].x, this.points[2].y);
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

export default Triangle;
