import {Vector} from "../common";

export class IFS {
    static IFSExpression: IFSExpression;

    constructor(startPoint: Vector, loopCount: number) {
        this.count = loopCount;
        this.startPoint = startPoint;
    }

    /**
     * loop count
     */
    public count = 0;

    public startPoint: Vector;

    private expressionList: IFSExpression[] = [];

    public probability = 0;

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
     * computed ifs get result
     */
    public pointList: Vector[] = [];

    public searchExpressionByProbability(probability: number): IFSExpression | undefined {
        return this.expressionList.find(item => probability <= item.probability);
    }

    public startLoop() {
        let lastPoint = this.startPoint;
        for (let index = 0; index < this.count; index++) {
            const probability = Math.random();
            const exp = this.searchExpressionByProbability(probability);
            if (exp) {
                lastPoint = exp.compute(lastPoint);
            }
            const newPoint = lastPoint.clone();
            newPoint.x+= 300;
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
