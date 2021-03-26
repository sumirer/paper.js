import { Vector } from "../common";
export declare class BezierUtils {
    /**
     * get bezier curve path by step,step is running percentage range [0,1]
     * @param controlPoints
     * @param step
     */
    static bezier(controlPoints: Array<Vector>, step: number): Vector;
    /**
     * recursive factorial
     * @param num
     */
    static factorial(num: number): number;
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
