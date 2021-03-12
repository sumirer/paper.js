import {BaseShape} from "./BaseShape";
import {Vector} from "../common";

export class DrawMap extends BaseShape{
    draw(): void {
    }

    pointInBound(point: Vector): boolean {
        return false;
    }

    pointInShape(point: Vector): boolean {
        return false;
    }

}
