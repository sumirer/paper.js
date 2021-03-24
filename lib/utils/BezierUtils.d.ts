import { Vector } from "../common";
export declare class BezierUtils {
    static getBezierCurveXByTime(): number;
    /**
     * get three level bezier curve step by path
     * @param startPoint
     * @param controlPointA
     * @param controlPointB
     * @param endPoint
     * @param step
     */
    static getBezierCurveAnimationStep(startPoint: Vector, controlPointA: Vector, controlPointB: Vector, endPoint: Vector, step: number): Vector;
    private static getBezierCurveStep;
}
