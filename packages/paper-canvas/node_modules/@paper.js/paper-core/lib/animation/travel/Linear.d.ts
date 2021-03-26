import Travel from "./Travel";
import { Vector } from "../../common";
export default class Linear extends Travel {
    constructor(start: Vector, end: Vector);
    /**
     * x distance
     */
    distanceX: number;
    /**
     * y distance
     */
    distanceY: number;
    /**
     * z distance
     */
    distanceZ: number;
    next(percentage: number): Vector;
}
