import {BaseAnimation} from "./BaseAnimation";
import {IAnimationParams} from "../types";
import {Vector} from "../common";

export class Linear extends BaseAnimation {

    constructor(vector: Vector, params: IAnimationParams) {
        super(params);
        this.vector2d = vector;
        this.speedX = this.vector2d.x / this.duration;
        this.speedY = this.vector2d.y / this.duration;
    }

    vector2d: Vector;

    speedX: number;

    speedY: number;

    runner(time: number): Vector {
        return new Vector(time * this.speedX, time * this.speedY);
    }

}
