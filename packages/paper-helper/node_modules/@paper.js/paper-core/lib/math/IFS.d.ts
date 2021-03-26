import { Vector } from "../common";
import { Matrix } from "./Matrix";
export declare class IFS {
    constructor(startPoint: Vector, loopCount: number);
    /**
     * loop count
     */
    count: number;
    startPoint: Vector;
    /**
     * matrix compute vector zero point
     */
    centerPoint: Vector;
    private expressionList;
    probability: number;
    matrixList: Matrix[];
    /**
     * add expression to computed list
     * @param expression
     */
    addExpression(expression: IFSExpression): void;
    /**
     * add matrix to change point
     * @param matrix
     */
    addChangeMatrix(matrix: Matrix): void;
    /**
     * computed ifs get result
     */
    pointList: Vector[];
    searchExpressionByProbability(probability: number): IFSExpression | undefined;
    /**
     * compute new pint by matrix
     * @param point
     */
    computeWithMatrix(point: Vector): Vector;
    startLoop(): void;
}
export declare class IFSExpression {
    constructor(xX: number, xY: number, yX: number, yY: number, xB: number, yB: number, probability: number);
    xX: number;
    xY: number;
    yX: number;
    yY: number;
    xB: number;
    yB: number;
    probability: number;
    compute(lastPoint: Vector): Vector;
}
