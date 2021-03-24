import { BaseAnimation } from "./BaseAnimation";
import { Vector } from "../common";
import { IAnimationParams } from "../types";
export declare class VariableSpeed extends BaseAnimation {
    constructor(initialVector: Vector, acceleration: Vector, params: IAnimationParams);
    initialVector: Vector;
    acceleration: Vector;
    runner(time: number): Vector;
}
