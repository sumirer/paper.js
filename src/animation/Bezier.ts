import {BaseAnimation} from "./BaseAnimation";
import {Vector} from "../common";
import {BezierUtils} from "../utils";
import {IAnimationParams} from "../types";

export class Bezier extends BaseAnimation {

    constructor(controlA: Vector, controlB: Vector, targetPosition: Vector, params: IAnimationParams) {
        super(params);
        this.controlA = controlA;
        this.controlB = controlB;
        this.targetPosition = targetPosition;
    }

    startPosition: Vector = new Vector();

    controlA: Vector;

    controlB: Vector;

    targetPosition: Vector;

    runner(time: number): Vector {
        const step = this.runDuration / this.duration;
        console.log(step);
        return BezierUtils.getBezierCurveAnimationStep(this.startPosition, this.controlA, this.controlB, this.targetPosition, step);
    }

}
