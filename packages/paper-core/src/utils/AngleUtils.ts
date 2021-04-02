import {RadiusArc, Vector} from "../common";

export class AngleUtils {

    static getCenterVector(v1: Vector, v2: Vector): Vector {
        return Vector.create((v1.x + v2.x) / 2, (v1.y + v2.y) / 2, (v1.z + v2.z) / 2);
    }

    /**
     * get tow point slope
     * @param pointA
     * @param pointB
     */
    static getSlope(pointA: Vector, pointB: Vector): number {
        return (pointA.y - pointB.y) / (pointA.x - pointB.x);
    }

    /**
     * get vector angle radian
     * @param v1
     * @param v2
     */
    static getRadian(v1: Vector, v2: Vector): number {
        return Math.acos((v1.x * v2.x + v1.y * v2.y) / (Math.sqrt(Math.pow(v1.x, 2) + Math.pow(v1.y, 2)) * Math.sqrt(Math.pow(v2.x, 2) + Math.pow(v2.y, 2))));
    }

    // /**
    //  * get vector border arc center point by radius
    //  * @param v1
    //  * @param v2
    //  * @param radius
    //  */
    // static getArcCenterPoint(v1: Vector, v2: Vector, radius: number): Vector {
    //     // const angle = this.getRadian(v1, v2) / 2;
    //     // const intersectionPoint = this.getIntersection(lineA, lineB);
    //     // const pointX = radius / Math.sqrt(Math.pow(Math.sin(angleA), 2) * (Math.pow(Math.atan(angleA + angleB), 2) + 1)) + intersectionPoint.x;
    //     // const pointY = Math.tan(angleA + angleB) * (pointX - intersectionPoint.x) + intersectionPoint.y;
    //     // return new Vector(pointX, pointY);
    // }

    static getVectorPointByLength(v: Vector, startPoint: Vector, length: number): Vector {
        return Vector.create(v.x != 0? startPoint.x + Math.abs(length * Math.sin(Math.atan(v.x / v.y))) * (v.x / Math.abs(v.x)) : 0, v.y !== 0 ? startPoint.y + Math.abs(length * Math.cos(Math.atan(v.x / v.y)))* (v.y / Math.abs(v.y)) : 0);
    }

    /**
     * get arc start point and end point
     * @param v1
     * @param v2
     * @param radius
     * @param anglePoint
     */
    static getArcByVectorAndRadius(v1: Vector, v2: Vector, radius: number, anglePoint: Vector): RadiusArc {
        const angle = AngleUtils.getRadian(v1, v2) / 2;
        const length = radius / Math.tan(angle);
        return RadiusArc.create(AngleUtils.getVectorPointByLength(v1, anglePoint, length), AngleUtils.getVectorPointByLength(v2, anglePoint, length), radius);
    }
}
