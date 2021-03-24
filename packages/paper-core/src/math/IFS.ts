import {Vector} from "../common";
import {Matrix} from "./Matrix";

export class IFS {
    constructor(startPoint: Vector, loopCount: number) {
        this.count = loopCount;
        this.startPoint = startPoint;
    }

    /**
     * loop count
     */
    public count = 0;

    public startPoint: Vector;

    /**
     * matrix compute vector zero point
     */
    public centerPoint: Vector = new Vector(500, 500);

    private expressionList: IFSExpression[] = [];

    public probability = 0;

    public matrixList: Matrix[] = [];

    /**
     * add expression to computed list
     * @param expression
     */
    public addExpression(expression: IFSExpression) {
        this.probability += expression.probability;
        expression.probability = this.probability;
        this.expressionList.push(expression);
        this.expressionList.sort((a, b) => a.probability - b.probability);
    }

    /**
     * add matrix to change point
     * @param matrix
     */
    public addChangeMatrix(matrix: Matrix) {
        this.matrixList.push(matrix);
    }

    /**
     * computed ifs get result
     */
    public pointList: Vector[] = [];

    public searchExpressionByProbability(probability: number): IFSExpression | undefined {
        return this.expressionList.find(item => probability <= item.probability);
    }

    /**
     * compute new pint by matrix
     * @param point
     */
    public computeWithMatrix(point: Vector): Vector{
        let newPoint = point.changeWith(this.centerPoint);
        for (let index = 0; index < this.matrixList.length; index++) {
            newPoint = Vector.fromMatrix(this.matrixList[index].multiply(newPoint.toMatrix()));
        }
        return newPoint;
    }

    public startLoop() {
        let lastPoint = this.startPoint;
        for (let index = 0; index < this.count; index++) {
            const probability = Math.random();
            const exp = this.searchExpressionByProbability(probability);
            if (exp) {
                lastPoint = exp.compute(lastPoint);
            }
            let newPoint = lastPoint.clone();
            // newPoint.x += 300;
            newPoint = this.computeWithMatrix(newPoint);
            this.pointList.push(newPoint);
        }
    }
}


export class IFSExpression {
    constructor(xX: number, xY: number, yX: number, yY: number, xB: number, yB: number, probability: number) {
        this.xX = xX;
        this.xY = xY;
        this.yX = yX;
        this.yY = yY;
        this.xB = xB;
        this.yB = yB;
        this.probability = probability;
    }

    xX: number;

    xY: number;

    yX: number;

    yY: number;

    xB: number;

    yB: number;

    probability: number;

    compute(lastPoint: Vector): Vector {
        const x = this.xX * lastPoint.x + lastPoint.y * this.xY + this.xB;
        const y = this.yX * lastPoint.x + lastPoint.y * this.yY + this.yB;
        return new Vector(x, y);
    }
}
