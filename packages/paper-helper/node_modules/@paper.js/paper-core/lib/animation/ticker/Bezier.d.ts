import Ticker from "./Ticker";
import { Vector } from "../../common";
export declare class Bezier extends Ticker {
    constructor(controlAx: number, controlAy: number, controlBx: number, controlBy: number, duration: number);
    controlA: Vector;
    controlB: Vector;
    tick(time: number): number;
}
