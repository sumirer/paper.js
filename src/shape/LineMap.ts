import {BaseShape} from "./BaseShape";
import {Vector} from "../common";
import {IShapeStyle} from "../types";

export class LineMap extends BaseShape {

    constructor(startPoint: Vector, endPoint: Vector, style: IShapeStyle) {
        super([startPoint, new Vector(endPoint.x, startPoint.y), endPoint, new Vector(startPoint.x, endPoint.y)], style);
    }

    lineList: Array<Array<Vector>> = [];

    pointInBound(point: Vector): boolean {
        return false;
    }

    pointInShape(point: Vector): boolean {
        return false;
    }

    public addLine(star: Vector, end: Vector) {
        this.lineList.push([star, end]);
    }

    move(x: number, y: number, point: Vector | undefined = undefined) {
        super.move(x, y, point);
        for (let index = 0; index < this.lineList.length; index++) {
            this.lineList[index][0].move(x, y);
            this.lineList[index][1].move(x, y);
        }
    }


    draw(): void {
        this.paint?.beginPath();
        for (let index = 0; index < this.lineList.length; index++) {
            const line = this.lineList[index];
            this.paint?.moveTo(line[0].x, line[0].y);
            this.paint?.lineTo(line[1].x, line[1].y);
            this.paint?.stroke();
        }
    }
}
