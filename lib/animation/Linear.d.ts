import { BaseAnimation } from "./BaseAnimation";
import { IAnimationParams } from "../types";
import { Vector } from "../common";
export declare class Linear extends BaseAnimation {
    constructor(vector: Vector, params: IAnimationParams);
    vector2d: Vector;
    speedX: number;
    speedY: number;
    runner(time: number): Vector;
}
