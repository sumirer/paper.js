import {BaseShape} from "../shape";
import {Vector} from "@paper.js/paper-core/lib";
import {DrawingPaint, IDrawingPaint} from "./DrawingPaint";

export class DrawingBoard {

    public elementId = '';

    public canvasWidth = 200;

    public canvasHeight = 200;

    public element: HTMLCanvasElement;

    constructor(elementId: string, width = 200, height = 200, showFps = false) {
        this.elementId = elementId;
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.showFps = showFps;
        this.element = document.getElementById(this.elementId) as HTMLCanvasElement;
        if (!this.element) {
            throw Error("can't get canvas element, please check element")
        }
        this.element.height = this.canvasHeight;
        this.element.width = this.canvasWidth;
        // use context 2d
        const paint = this.element.getContext('2d');
        if (!paint) {
            throw Error("can't get canvas context, please check element id or element")
        }
        this.paint = new DrawingPaint(paint).getPaint();
        this.paint.translate(this.canvasWidth / 2, this.canvasHeight / 2);
    }

    public paint: IDrawingPaint;

    public lastUpdateDate: number = 0;

    public showFps: boolean;

    /**
     * save all shape info data
     */
    public shapeList: Array<BaseShape> = [];


    public getShapeByPoint(point: Vector) {
        for (let index = this.shapeList.length - 1; index >= 0; index--) {
            const shape = this.shapeList[index];
            if (shape.pointInShape(point) || shape.pointInBound(point)) {
                return shape;
            }
        }
        return undefined;
    }

    /**
     * add shape
     * @param shape
     */
    public addShape<T extends BaseShape>(shape: T) {
        this.shapeList.push(shape);
    }

    public update = () => {
        this.paintAll();
    };

    /**
     * paint all shape
     */
    public paintAll() {
        if (!this.paint) {
            return;
        }
        this.paint.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        if (this.lastUpdateDate === 0) {
            this.lastUpdateDate = Date.now();
        }
        this.shapeList.forEach(item => {
            item.paint = this.paint;
            item.updateFn = this.update;
            item.drawAll();
        });
        if (this.showFps) {
            this.paint.beginPath();
            const fps = Math.floor(1000 / (Date.now() - this.lastUpdateDate === 0 ? 13.3 : Date.now() - this.lastUpdateDate));
            this.lastUpdateDate = Date.now();
            this.paint.font = '20px'
            this.paint.fillStyle = '#333'
            this.paint.fillText(`FPS: ${fps}`, 80, 30, 200);
            this.paint.restore();
        }
    }
}
