import {BaseAnimation} from "./BaseAnimation";
import {Vector} from "../common";
import {IAnimationParams} from "../types";

export class VariableSpeed extends BaseAnimation {
    constructor(initialVector: Vector, acceleration: Vector, params: IAnimationParams) {
        super(params);
        this.initialVector = initialVector;
        this.acceleration = acceleration;
    }

    initialVector: Vector;

    acceleration: Vector;

    runner(time: number): Vector {
        const point = new Vector();
        point.x = this.initialVector.x * time / 1000 + 0.5 * this.acceleration.x * Math.pow(time / 1000, 2);
        point.y = this.initialVector.y * time / 1000 + 0.5 * this.acceleration.y * Math.pow(time / 1000, 2);
        return point;
    }

}
