import {BaseAnimation} from "./BaseAnimation";
import {IAnimationParams} from "../types";
import {Vector} from "../common";

export class Linear extends BaseAnimation {

    constructor(vector: Vector, params: IAnimationParams) {
        super(vector, params);
        this.initAnimation();
    }

    speedX: number = 0;

    speedY: number = 0;

    initAnimation() {
        this.speedX = this.vector2d.x / this.duration;
        this.speedY = this.vector2d.y / this.duration;
    }

    runner(time: number): Vector {
        return new Vector(time * this.speedX, time * this.speedY);
    }

}
