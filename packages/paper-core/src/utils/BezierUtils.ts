import {Vector} from "../common";


export class BezierUtils {

    /**
     * get bezier curve path by step,step is running percentage range [0,1]
     * @param controlPoints
     * @param step
     */
    static bezier(controlPoints: Array<Vector>, step: number): Vector {
        let x = 0;
        let y = 0;
        let controlLength = controlPoints.length - 1;
        const _step = 1 - step;
        controlPoints.forEach((item, index) => {
            const _controlLength = controlLength - index;
            if (!index) {
                x += item.x * Math.pow(_step, _controlLength) * Math.pow(step, index);
                y += item.y * Math.pow(_step, _controlLength) * Math.pow(step, index);
            } else {
                x += BezierUtils.factorial(controlLength) / BezierUtils.factorial(index) / BezierUtils.factorial(_controlLength) * item.x * Math.pow(_step, _controlLength) * Math.pow(step, index);
                y += BezierUtils.factorial(controlLength) / BezierUtils.factorial(index) / BezierUtils.factorial(_controlLength) * item.y * Math.pow(_step, _controlLength) * Math.pow(step, index);
            }
        });
        return Vector.create(x, y);
    }

    /**
     * recursive factorial
     * @param num
     */
    static factorial(num: number): number {
        if (num <= 1) {
            return 1;
        } else {
            return num * BezierUtils.factorial(num - 1);
        }
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
        point.x = BezierUtils.getBezierCurveStep(startPoint.x, controlPointA.x * endPoint.x, controlPointB.x * endPoint.x, endPoint.x, step);
        point.y = BezierUtils.getBezierCurveStep(startPoint.y, controlPointA.y * endPoint.y, controlPointB.y * endPoint.y, endPoint.y, step);
        return point;
    }

    private static getBezierCurveStep(start: number, controlA: number, controlB: number, end: number, step: number): number {
        const runningStep = 1 - step;
        return start * Math.pow(runningStep, 3) + 3 * controlA * step * Math.pow(runningStep, 2) + 3
            * controlB * Math.pow(step, 2) * runningStep + end * Math.pow(step, 3)
    }
}
