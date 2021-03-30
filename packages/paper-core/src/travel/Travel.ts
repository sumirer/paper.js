import {Vector} from "../common";

export default abstract class Travel {

    protected constructor(start: Vector, end: Vector) {
        this.start = start;
        this.end = end;
    }

    /**
     * path start point
     */
    protected start: Vector;

    /**
     * path end point
     */
    protected end: Vector;

    /**
     * get next position by tick percentage
     */
    abstract next(percentage: number): Vector;
}
