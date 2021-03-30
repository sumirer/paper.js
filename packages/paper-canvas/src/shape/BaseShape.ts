import {IMouseEventConsumer, IShapeStyle} from "../types";

import {Vector, BoundingClientRect} from "@paper.js/paper-core/lib";


export abstract class BaseShape implements IMouseEventConsumer {

    protected constructor(points: Array<Vector>, style: IShapeStyle = {}) {
        this.style = style;
        this.points = points;
        this.fill = !!style.fillRange;
        this.stroke = !!style.strokeBorder;
        const xList = points.map(point => point.x);
        const yList = points.map(point => point.y);
        this.boundingClientRect = new BoundingClientRect(Math.min(...xList), Math.min(...yList), Math.max(...xList), Math.max(...yList));
    }

    public style: IShapeStyle = {};

    public fill: boolean = false;

    public stroke: boolean = true;

    /**
     * will be init on first draw
     */
    public paint: CanvasRenderingContext2D | undefined = undefined;

    /**
     * shape name
     */
    protected name: string = 'shape';

    /**
     * shape point list
     */
    protected points: Array<Vector> = [];

    /**
     * participating in volume/range collisions
     * in animated shape position, if has other shape
     * move will be cancel
     */
    protected collision: boolean = false;

    /**
     * drag last point
     */
    private lastPoint: Vector | undefined;

    /**
     * enable drag
     */
    protected drag: boolean = false;

    /**
     * shape can start drag tag
     */
    private canMove: boolean = false;

    /**
     * on animation  running, if is [false], isn't run by animation runner
     */
    public canAnimated: boolean = true;


    /**
     * set keep animation after drag
     */
    public keepAnimationAfterDrag: boolean = true;

    /**
     * shape bound rect
     */
    public boundingClientRect: BoundingClientRect;

    /**
     * check point on the inside
     */
    abstract pointInShape(point: Vector): boolean;

    /**
     * check point in shape border or in line
     */
    abstract pointInBound(point: Vector): boolean;

    public enableDrag(): void {
        this.drag = true;
    }

    public disabledDrag(): void {
        this.drag = false;
    }

    onMouseDown(point: Vector, event: MouseEvent) {
        this.canAnimated = false;
        if (!this.drag) {
            return;
        }
        this.canMove = true;
        this.lastPoint = point;
    };

    onMouseMove(point: Vector, event: MouseEvent) {
        if (!this.drag || !this.canMove) {
            return;
        }
        if (!this.lastPoint) {
            return;
        }
        this.moveTo(point);
    }


    onMouseUp(point: Vector, event: MouseEvent) {
        this.canMove = false;
        if (this.keepAnimationAfterDrag) {
            this.canAnimated = true;
        }
    }

    public moveTo(point: Vector) {
        this.move(this.lastPoint ? point.x - this.lastPoint.x : 0, this.lastPoint ? point.y - this.lastPoint.y : 0, point);
    }

    public move(x: number, y: number, point: Vector | undefined = undefined) {
        this.points.forEach(item => item.move(x, y));
        this.update();
        if (!this.lastPoint) {
            this.lastPoint = point
        } else {
            this.lastPoint.move(x, y);
        }
    }

    public updateFn: Function | undefined;

    public update() {
        this.updateFn?.();
    }

    /**
     * update shape point or animation data
     */
    public drawAll() {
        this.paint?.save();
        this.makeStyle();
        this.draw();
        this.paint?.restore();
    }

    /**
     * set shape style
     */
    public makeStyle(): void {
        const defaultStyle = Object.assign({
            paint: undefined,
            fillStyle: undefined,
            direction: undefined,
            filter: undefined,
            globalAlpha: undefined,
            globalCompositeOperation: undefined,
            font: undefined,
            lineWidth: undefined,
            lineDashOffset: undefined,
            shadowBlur: undefined,
            shadowColor: undefined,
            shadowOffsetX: undefined,
            shadowOffsetY: undefined,
            textAlign: undefined,
            textBaseline: undefined,
            imageSmoothingEnabled: undefined,
            strokeStyle: undefined,
        }, this.style);
        Object.assign(this.paint, defaultStyle);
    }

    /**
     * draw canvas shape by point data
     */
    abstract draw(): void;
}
