import Point from "../common/Point";
import {IShapeStyle} from "../types/style";
import {IMouseEventConsumer} from "../types/lib";
import BoundingClientRect from "../common/BoundingClientRect";

abstract class BaseShape implements IMouseEventConsumer {

    protected constructor(points: Array<Point>, style: IShapeStyle = {}) {
        this.style = style;
        this.points = points;
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
    protected points: Array<Point> = [];

    /**
     * participating in volume/range collisions
     * in animated shape position, if has other shape
     * move will be cancel
     */
    protected collision: boolean = false;

    /**
     * drag last point
     */
    private lastPoint: Point | undefined;

    /**
     * enable drag
     */
    protected drag: boolean = true;

    /**
     * shape can start drag tag
     */
    private canMove: boolean = false;

    /**
     * shape bound rect
     */
    public boundingClientRect: BoundingClientRect;

    /**
     * check point on the inside
     */
    abstract pointInShape(point: Point): boolean;

    /**
     * check point in shape border or in line
     */
    abstract pointInBound(point: Point): boolean;

    onMouseDown(point: Point, event: MouseEvent) {
        if (!this.drag) {
            return;
        }
        this.canMove = true;
        this.lastPoint = point;
    };

    onMouseMove(point: Point, event: MouseEvent) {
        if (!this.drag || !this.canMove) {
            return;
        }
        if (!this.lastPoint) {
            return;
        }
        this.moveTo(point);
    }


    onMouseUp(point: Point, event: MouseEvent) {
        this.canMove = false;
    }

    public moveTo(point: Point) {
        // @ts-ignore
        this.move(point.x - this.lastPoint?.x,point.y - this.lastPoint?.y);
        this.lastPoint = point;
    }

    public move(x: number, y:number){
        this.points.forEach(item => item.move(x, y));
        this.update();
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

export default BaseShape;
