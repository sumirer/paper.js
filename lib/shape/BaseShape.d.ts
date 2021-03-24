import { IMouseEventConsumer, IShapeStyle } from "../types";
import { BoundingClientRect } from "../common";
import { Vector } from "../common";
export declare abstract class BaseShape implements IMouseEventConsumer {
    protected constructor(points: Array<Vector>, style?: IShapeStyle);
    style: IShapeStyle;
    fill: boolean;
    stroke: boolean;
    /**
     * will be init on first draw
     */
    paint: CanvasRenderingContext2D | undefined;
    /**
     * shape name
     */
    protected name: string;
    /**
     * shape point list
     */
    protected points: Array<Vector>;
    /**
     * participating in volume/range collisions
     * in animated shape position, if has other shape
     * move will be cancel
     */
    protected collision: boolean;
    /**
     * drag last point
     */
    private lastPoint;
    /**
     * enable drag
     */
    protected drag: boolean;
    /**
     * shape can start drag tag
     */
    private canMove;
    /**
     * on animation  running, if is [false], isn't run by animation runner
     */
    canAnimated: boolean;
    /**
     * set keep animation after drag
     */
    keepAnimationAfterDrag: boolean;
    /**
     * shape bound rect
     */
    boundingClientRect: BoundingClientRect;
    /**
     * check point on the inside
     */
    abstract pointInShape(point: Vector): boolean;
    /**
     * check point in shape border or in line
     */
    abstract pointInBound(point: Vector): boolean;
    enableDrag(): void;
    disabledDrag(): void;
    onMouseDown(point: Vector, event: MouseEvent): void;
    onMouseMove(point: Vector, event: MouseEvent): void;
    onMouseUp(point: Vector, event: MouseEvent): void;
    moveTo(point: Vector): void;
    move(x: number, y: number, point?: Vector | undefined): void;
    updateFn: Function | undefined;
    update(): void;
    /**
     * update shape point or animation data
     */
    drawAll(): void;
    /**
     * set shape style
     */
    makeStyle(): void;
    /**
     * draw canvas shape by point data
     */
    abstract draw(): void;
}
