import Ticker from "./Ticker";
import {BezierUtils, Vector} from "@paper.js/paper-core/lib";


export class Bezier extends Ticker {

    constructor(controlAx: number, controlAy: number, controlBx: number, controlBy: number, duration: number) {
        super(duration);
        this.controlA = Vector.create(controlAx, controlAy);
        this.controlB = Vector.create(controlBx, controlBy);
    }

    controlA: Vector;

    controlB: Vector;

    tick(time: number): number {
        // use bezier curve x position as tick percentage
        return BezierUtils.getBezierCurveAnimationStep(Vector.create(), this.controlA, this.controlB, Vector.create(1, 0), time).x;
    }

}
