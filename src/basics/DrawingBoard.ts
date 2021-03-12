import {BaseShape} from "../shape";
import {Vector} from "../common";

export class DrawingBoard {

    public elementId = '';

    public canvasWidth = 200;

    public canvasHeight = 200;

    public element: HTMLCanvasElement;

    private mouseEventBindShape: BaseShape | undefined;

    constructor(elementId: string, width = 200, height = 200) {
        this.elementId = elementId;
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.element = document.getElementById(this.elementId) as HTMLCanvasElement;
        this.init();
    }

    public paint: CanvasRenderingContext2D | undefined = undefined;

    /**
     * save all shape info data
     */
    public shapeList: Array<BaseShape> = [];


    private init() {
        if (!this.element) {
            throw Error("can't get canvas element, please check element")
        }
        this.element.height = this.canvasHeight;
        this.element.width = this.canvasWidth;
        this.registerListen();
        // use context 2d
        this.paint = this.element.getContext('2d') || undefined;
        if (!this.paint) {
            throw Error("can't get canvas context, please check element id or element")
        }
    }

    private registerListen() {
        this.element.addEventListener('mouseup', this.handleMouseUp);
        this.element.addEventListener('mousedown', this.handleMouseDown);
        this.element.addEventListener('mousemove', this.handleMouseMove);
    }

    public handleMouseUp = (event: MouseEvent) => {
        if (!this.mouseEventBindShape) {
            return;
        }
        const point = this.getRelativePoint(event);
        this.mouseEventBindShape.onMouseUp(point, event);
    };

    public handleMouseDown = (event: MouseEvent) => {
        const point = this.getRelativePoint(event);
        const shape = this.getShapeByPoint(point);
        if (shape) {
            this.mouseEventBindShape = shape;
            this.mouseEventBindShape.onMouseDown(point, event);
            this.mouseEventBindShape = shape;
        }
    };

    public handleMouseMove = (event: MouseEvent) => {
        const point = this.getRelativePoint(event);
        const shape = this.mouseEventBindShape ?? this.getShapeByPoint(point);
        if (shape) {
            shape.onMouseMove(point, event);
        }
    };

    public getRelativePoint(event: MouseEvent): Vector {
        const bound = this.element.getBoundingClientRect();
        return new Vector(event.clientX - bound.x, event.clientY - bound.y);
    }

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

    /**
     * remove shape
     * @param shape
     */
    public removeShape<T extends BaseShape>(shape: T) {
        for (let index = 0; index < this.shapeList.length; index++) {
            if (this.shapeList[index] === shape) {
                this.shapeList.splice(index, 1);
                break;
            }
        }
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
        this.shapeList.forEach(item => {
            item.paint = this.paint;
            item.updateFn = this.update;
            item.drawAll();
        });
    }
}
