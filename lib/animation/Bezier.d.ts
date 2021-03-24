import { BaseAnimation } from "./BaseAnimation";
import { Vector } from "../common";
import { IAnimationParams } from "../types";
export declare class Bezier extends BaseAnimation {
    constructor(controlA: Vector, controlB: Vector, targetPosition: Vector, params: IAnimationParams);
    startPosition: Vector;
    controlA: Vector;
    controlB: Vector;
    targetPosition: Vector;
    runner(time: number): Vector;
}
