import Travel from "./Travel";
import { Vector } from "../../common";
export default class BezierCurve extends Travel {
    constructor(controlPoints: Array<Vector>);
    /**
     * bezier control point list
     */
    controlPoints: Array<Vector>;
    next(percentage: number): Vector;
}
