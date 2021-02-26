import Point from "../common/Point";
import Line from "../common/Line";
import Vector from "../common/Vector";

class AngleUtils {

    /**
     * get tow point slope
     * @param pointA
     * @param pointB
     */
    static getSlope(pointA: Point, pointB: Point): number {
        return (pointA.y - pointB.y) / (pointA.x - pointB.x);
    }

    /**
     * get angle radian by tow line
     * @param lineA
     * @param lineB
     */
    static getRadian(lineA: Line, lineB: Line) {
        const v1 = lineA.getVector();
        const v2 = lineB.getVector();
        return Math.acos((v1.x * -v2.x + v1.y * -v2.x) / (Math.sqrt(Math.pow(v1.x, 2) + Math.pow(v1.y, 2)) * Math.sqrt(Math.pow(v2.x, 2) + Math.pow(v2.y, 2))));
        // return Math.atan((lineB.getSlope() - lineA.getSlope()) / (1 + lineB.getSlope() * lineA.getSlope()));
    }

    /**
     * get intersection of tow line
     * @param lineA
     * @param lineB
     */
    static getIntersection(lineA: Line, lineB: Line): Point {
        if ((lineA.pointA.x === lineB.pointA.x && lineA.pointA.y === lineB.pointA.y)
            || (lineA.pointA.x === lineB.pointB.x && lineA.pointA.y === lineB.pointB.y)) {
            return lineA.pointA.clone();
        }
        if ((lineA.pointB.x === lineB.pointA.x && lineA.pointB.y === lineB.pointA.y)
            || (lineA.pointB.x === lineB.pointB.x && lineA.pointB.y === lineB.pointB.y)) {
            return lineA.pointB.clone();
        }
        return new Point();
    }

    /**
     * get tow line border arc by radius
     * @param lineA
     * @param lineB
     * @param radius
     */
    static getArcCenterPoint(lineA: Line, lineB: Line, radius: number): Point {
        const kLineA = lineA.getSlope();
        const angleA = Math.atan(kLineA);
        const angleB = this.getRadian(lineA, lineB) / 2;
        const intersectionPoint = this.getIntersection(lineA, lineB);
        const pointX = radius / Math.sqrt(Math.pow(Math.sin(angleA), 2) * (Math.pow(Math.atan(angleA + angleB), 2) + 1)) + intersectionPoint.x;
        const pointY = Math.tan(angleA + angleB) * (pointX - intersectionPoint.x) + intersectionPoint.y;
        return new Point(pointX, pointY);
    }

    /**
     * get curve start point and end point
     */
    static getLineAnglePoint(lineA: Line, lineB: Line, radius: number, intersectionPoint: Point): Line {
        const angle = this.getRadian(lineA, lineB) / 2;
        console.log(lineA, lineB, angle, lineA.getSlope(), lineB.getSlope());
        let pointAX = intersectionPoint.x - (radius / Math.tan(angle) * Math.sqrt(Math.pow(lineA.getSlope(), 2) + 1));
        if (pointAX < Math.min(lineA.pointA.x, lineA.pointB.x) || pointAX > Math.max(lineA.pointA.x, lineB.pointB.x)) {
            pointAX = intersectionPoint.x * 2 - pointAX;
        }
        const pointAY = lineA.getSlope() * (intersectionPoint.x - pointAX) + intersectionPoint.y;
        let pointBX = intersectionPoint.x - (radius / Math.tan(angle) * Math.sqrt(Math.pow(lineB.getSlope(), 2) + 1));
        if (pointBX < Math.min(lineB.pointA.x, lineB.pointB.x) || pointBX > Math.max(lineB.pointA.x, lineB.pointB.x)) {
            pointBX = intersectionPoint.x * 2 - pointBX;
        }
        const pointBY = lineB.getSlope() * (intersectionPoint.x - pointBX) + intersectionPoint.y;
        return new Line(new Point(pointAX, pointAY), new Point(pointBX, pointBY));
    }
}

export default AngleUtils;
