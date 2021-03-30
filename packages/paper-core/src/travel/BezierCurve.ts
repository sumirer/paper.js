import Travel from "./Travel";
import {Vector} from "../common";
import {BezierUtils} from "../utils";

export class BezierCurve extends Travel {

    constructor(controlPoints: Array<Vector>) {
        super(controlPoints[0], controlPoints[controlPoints.length - 1]);
        this.controlPoints = controlPoints;
    }

    /**
     * bezier control point list
     */
    controlPoints: Array<Vector>;

    next(percentage: number): Vector {
        return BezierUtils.bezier(this.controlPoints, percentage);
    }

}
