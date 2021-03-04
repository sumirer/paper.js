import {Vector} from "../common";

export class BezierUtils {

    static getBezierCurveXByTime(): number {
        return 0;
    }

    /**
     * get three level bezier curve step by path
     * @param startPoint
     * @param controlPointA
     * @param controlPointB
     * @param endPoint
     * @param step
     */
    static getBezierCurveAnimationStep(startPoint: Vector, controlPointA: Vector, controlPointB: Vector, endPoint: Vector, step: number): Vector {
        const point = new Vector();
        point.x = this.getBezierCurveStep(startPoint.x, controlPointA.x * endPoint.x, controlPointB.x * endPoint.x, endPoint.x, step);
        point.y = this.getBezierCurveStep(startPoint.y, controlPointA.y * endPoint.y, controlPointB.y * endPoint.y, endPoint.y, step);
        return point;
    }

    private static getBezierCurveStep(start: number, controlA: number, controlB: number, end: number, step: number): number {
        const runningStep = 1 - step;
        return start * Math.pow(runningStep, 3) + 3 * controlA * step * Math.pow(runningStep, 2) + 3
            * controlB * Math.pow(step, 2) * runningStep + end * Math.pow(step, 3)
    }
}
