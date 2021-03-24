import { BaseShape } from "../shape";
import { AnimationListener, AnimationStatusListener, IAnimationParams } from "../types";
import { Vector } from "../common";
export declare enum AnimationEvent {
    DONE = 0,
    CANCEL = 1,
    FORWARD = 2,
    REVERSE = 3
}
export declare abstract class BaseAnimation {
    protected constructor(params: IAnimationParams);
    duration: number;
    runDuration: number;
    private listener;
    private statusListener;
    requestId: number;
    private itemList;
    private stop;
    private performanceTime;
    lastVector: Vector | undefined;
    addShape<T extends BaseShape>(item: T | Vector): void;
    addEventListener(listener: AnimationListener): void;
    addStatusListener(listener: AnimationStatusListener): void;
    /**
     * cancel animation
     */
    cancel(): void;
    /**
     * get animation action
     */
    inAnimation(): boolean;
    forward(): void;
    reverse(): void;
    /**
     * repeat run animation
     */
    repeat(): void;
    /**
     * stop animation
     * @param eventType
     */
    private stopAnimation;
    /**
     * move shape by tick time
     * @param duration
     */
    private runNextTick;
    abstract runner(time: number): Vector;
}
