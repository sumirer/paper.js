import Travel from "./Travel";
import {Vector} from "../../common";

export default class Linear extends Travel {

    constructor(start: Vector, end: Vector) {
        super(start, end);
        this.distanceX = end.x - start.x;
        this.distanceY = end.y - start.y;
        this.distanceZ = end.z - start.z;
    }

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

    next(percentage: number): Vector {
        return Vector.create(this.distanceX * percentage, this.distanceY * percentage, this.distanceZ * percentage);
    }

}
