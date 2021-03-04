import {Vector, BoundingClientRect} from "../common";

export class BoundUtils {

    /**
     * check point in line
     * @param pointA
     * @param pointB
     * @param checkPoint
     * @param lineWidth
     */
    static inLine(pointA: Vector, pointB: Vector, checkPoint: Vector, lineWidth = 1): boolean {
        // if line width is 1px use line
        if (lineWidth === 1) {
            return (checkPoint.x - pointA.x) * (pointA.y - pointB.y) == (pointA.x - pointB.x) * (checkPoint.y - pointA.y) &&
                Math.min(pointB.x, pointA.x) <= checkPoint.x &&
                checkPoint.x <= Math.max(pointA.x, pointB.x) &&
                Math.min(pointA.y, pointB.y) <= checkPoint.y &&
                checkPoint.y <= Math.max(pointA.y, pointB.y)
            // return (pointA.x - checkPoint.x) * (checkPoint.y - pointB.y) === (checkPoint.x - pointB.x) * (pointA.y - checkPoint.y)
            //     && checkPoint.x >= Math.min(pointA.x, pointB.x)
            //     && checkPoint.x <= Math.max(pointA.x, pointB.x);
        }
        // use shape matrix check
        // return this.inMatrix();
        return false;
    }

    /**
     * check point in the one of line
     * @param points shape point list
     * @param checkPoint
     * @param lineWidth line width,if line width not'n 1px use shape function vif this line
     * @param close shape is close
     */
    static pointInLine(points: Array<Vector>, checkPoint: Vector, lineWidth = 1, close = true): boolean {
        for (let index = 0, afterIndex = 1; index < points.length; index++, afterIndex++) {
            const point = points[index];
            // if is close shape,the last line check
            if (!points[afterIndex] && close) {
                return this.inLine(point, points[0], checkPoint, lineWidth);
            }
            if (this.inLine(point, points[afterIndex], checkPoint, lineWidth)) {
                return true;
            }
        }
        return false;
    }

    /**
     * point in polygon
     * @param points
     * @param point
     */
    static pointInPolygon(points: Array<Vector>, point: Vector): boolean {
        let oddNodes = false;
        for (let i = 0, j = points.length - 1; i < points.length; i++) {
            if (points[i].y < point.y
                && points[j].y >= point.y
                || points[j].y < point.y
                && points[i].y >= point.y) {
                if (points[i].x + (point.y - points[i].y) / (points[j].y - points[i].y) * (points[j].x - points[i].x) < point.x) {
                    oddNodes = !oddNodes;
                }
            }
            j = i;
        }
        return oddNodes;
    }

    static getBoundCrossRect(boundA: BoundingClientRect, boundB: BoundingClientRect): BoundingClientRect | undefined {
        // out of bound
        if (boundB.minX > boundA.maxX || boundB.maxX < boundA.minX || boundB.maxY > boundA.minY || boundB.minY < boundA.maxY) {
            return undefined
        }
        // center cross
        if (boundB.minX >= boundA.minX && boundB.maxX <= boundA.maxX) {
            const minX = boundB.minX;
            const maxX = boundB.maxX;
            let minY = 0;
            let maxY = 0;
            if (boundA.maxY <= boundB.maxY && boundA.minY >= boundB.minY) {
                minY = boundA.minY;
                maxY = boundA.maxY;
            }
            if (boundB.maxY > boundA.minY && boundB.maxY < boundA.maxY) {

            }
            return new BoundingClientRect(minX, minY, maxX, maxY);
        }
        if (boundA.minX >= boundB.minX && boundA.maxX <= boundB.maxX && boundB.maxY <= boundA.maxY && boundB.minY >= boundA.minY) {
            return new BoundingClientRect(boundA.minX, boundB.minY, boundA.maxX, boundB.maxY);
        }
    }
}
