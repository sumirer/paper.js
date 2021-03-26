import { Vector, BoundingClientRect } from "../common";
export declare class BoundUtils {
    /**
     * check point in line
     * @param pointA
     * @param pointB
     * @param checkPoint
     * @param lineWidth
     */
    static inLine(pointA: Vector, pointB: Vector, checkPoint: Vector, lineWidth?: number): boolean;
    /**
     * check point in the one of line
     * @param points shape point list
     * @param checkPoint
     * @param lineWidth line width,if line width not'n 1px use shape function vif this line
     * @param close shape is close
     */
    static pointInLine(points: Array<Vector>, checkPoint: Vector, lineWidth?: number, close?: boolean): boolean;
    /**
     * point in polygon
     * @param points
     * @param point
     */
    static pointInPolygon(points: Array<Vector>, point: Vector): boolean;
    static getBoundCrossRect(boundA: BoundingClientRect, boundB: BoundingClientRect): BoundingClientRect | undefined;
}
