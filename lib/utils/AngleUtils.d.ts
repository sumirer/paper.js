import { Line, Vector } from "../common";
export declare class AngleUtils {
    /**
     * get tow point slope
     * @param pointA
     * @param pointB
     */
    static getSlope(pointA: Vector, pointB: Vector): number;
    /**
     * get angle radian by tow line
     * @param lineA
     * @param lineB
     */
    static getRadian(lineA: Line, lineB: Line): number;
    /**
     * get intersection of tow line
     * @param lineA
     * @param lineB
     */
    static getIntersection(lineA: Line, lineB: Line): Vector;
    /**
     * get tow line border arc by radius
     * @param lineA
     * @param lineB
     * @param radius
     */
    static getArcCenterPoint(lineA: Line, lineB: Line, radius: number): Vector;
    /**
     * get curve start point and end point
     */
    static getLineAnglePoint(lineA: Line, lineB: Line, radius: number, intersectionPoint: Vector): Line;
}
