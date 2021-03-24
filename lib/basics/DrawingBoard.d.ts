import { BaseShape } from "../shape";
import { Vector } from "../common";
export declare class DrawingBoard {
    elementId: string;
    canvasWidth: number;
    canvasHeight: number;
    element: HTMLCanvasElement;
    private mouseEventBindShape;
    constructor(elementId: string, width?: number, height?: number);
    paint: CanvasRenderingContext2D | undefined;
    /**
     * save all shape info data
     */
    shapeList: Array<BaseShape>;
    private init;
    private registerListen;
    handleMouseUp: (event: MouseEvent) => void;
    handleMouseDown: (event: MouseEvent) => void;
    handleMouseMove: (event: MouseEvent) => void;
    getRelativePoint(event: MouseEvent): Vector;
    getShapeByPoint(point: Vector): BaseShape | undefined;
    /**
     * add shape
     * @param shape
     */
    addShape<T extends BaseShape>(shape: T): void;
    /**
     * remove shape
     * @param shape
     */
    removeShape<T extends BaseShape>(shape: T): void;
    update: () => void;
    /**
     * paint all shape
     */
    paintAll(): void;
}
