import {BezierUtils, Vector} from "@paper.js/paper-core/lib";

export type IDrawingPaint = CanvasRenderingContext2D & {
    drawBezierCurveTo(controlList: Array<Vector>, endPoint: Vector, scanRate: number): void
}

export class DrawingPaint {

    constructor(paint: CanvasRenderingContext2D) {
        this.paint = this.proxyPaint(paint);
    }

    public paint: IDrawingPaint;

    lastRecord!: Vector;

    drawBezierCurveTo(controlList: Array<Vector>, endPoint: Vector, scanRate: number = 0.01): void {
        if (controlList.length === 2) {
            // use canvas's function draw bezier curve
            this.paint.bezierCurveTo(controlList[0].x, controlList[0].y, controlList[1].x, controlList[1].y, endPoint.x, endPoint.y);
            this.lastRecord = endPoint;
            return;
        }
        const createList = [this.lastRecord, ...controlList, endPoint];
        for (let p = 0; p < 1; p += scanRate) {
            const next = BezierUtils.bezier(createList, p);
            this.paint.lineTo(next.x, next.y);
            if (p + scanRate >= 1) {
                // record last point
                this.lastRecord = next;
            }
        }
    }

    private proxyPaint(paint: CanvasRenderingContext2D): IDrawingPaint {
        (paint as IDrawingPaint).drawBezierCurveTo = this.drawBezierCurveTo.bind(this);
        const moveToFn = paint.moveTo;
        const that = this;
        paint.moveTo = function (x, y) {
            moveToFn.call(this, x, y);
            that.lastRecord = Vector.create(x, y);
        };
        const lineToFn = paint.lineTo;
        paint.lineTo = function (x, y) {
            lineToFn.call(this, x, y);
            that.lastRecord = Vector.create(x, y);
        };
        const arcToFn = paint.arcTo;
        paint.arcTo = function (x1: number, y1: number, x2: number, y2: number, radius: number) {
            arcToFn.call(this, x1, y1, x2, y2, radius);
            that.lastRecord = Vector.create(x2, y2);
        };
        return paint as IDrawingPaint;
    }

    public getPaint(): IDrawingPaint {
        this.paint.arc()
        return this.paint;
    }

}
