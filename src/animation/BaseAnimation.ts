import {BaseShape} from "../shape";
import {AnimationListener, AnimationStatusListener, IAnimationParams} from "../types/lib";
import {Vector} from "../common";

export enum AnimationEvent {
    DONE = 0,
    CANCEL = 1,
    FORWARD = 2,
    REVERSE = 3,
}

export abstract class BaseAnimation {

    protected constructor(params: IAnimationParams) {
        this.duration = params.duration ?? 500;
        this.runDuration = this.duration;
        // this.vector2d = vector2d;
    }

    public duration: number;

    public runDuration: number;

    // public vector2d: Vector;

    private listener: Array<AnimationListener> = [];

    private statusListener: Array<AnimationStatusListener> = [];

    public requestId: number = -1;

    private itemList: Array<BaseShape | Vector> = [];

    private stop: boolean = false;

    private performanceTime: number = 0;

    public lastVector: Vector | undefined;

    public addShape<T extends BaseShape>(item: T | Vector) {
        this.itemList.push(item);
    }

    public addEventListener(listener: AnimationListener): void {
        this.listener.push(listener);
    }

    public addStatusListener(listener: AnimationStatusListener): void {
        this.statusListener.push(listener);
    }

    /**
     * cancel animation
     */
    public cancel(): void {
        if (this.stop) {
            return;
        }
        if (this.requestId == -1) {
            this.stop = true;
            return;
        }
        this.stop = true;
        window.cancelAnimationFrame(this.requestId);
    }

    /**
     * get animation action
     */
    public inAnimation(): boolean {
        return !this.stop;
    }

    public forward(): void {
        this.stop = false;
        this.performanceTime = 0;
        this.runDuration = 0;
        const run = (time: number) => {
            if (this.performanceTime === 0) {
                this.performanceTime = time;
            }
            this.runDuration += (time - this.performanceTime);
            if (this.runDuration > this.duration || this.stop) {
                this.stopAnimation(AnimationEvent.FORWARD);
                return;
            }
            this.runNextTick(this.runDuration);
            this.performanceTime = time;
            // @ts-ignore
            this.requestId = (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(run);
        };
        // @ts-ignore
        this.requestId = (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(run);
    }

    public reverse(): void {
        this.stop = false;
        this.performanceTime = 0;
        this.runDuration = this.duration;
        const run = (time: number) => {
            if (this.performanceTime === 0) {
                this.performanceTime = time;
            }
            this.runDuration -= (time - this.performanceTime);
            if (this.runDuration < 0 || this.stop) {
                this.stopAnimation(AnimationEvent.REVERSE);
                return
            }
            this.runNextTick(this.runDuration);
            this.performanceTime = time;
            // @ts-ignore
            this.requestId = (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(run);
        };
        // @ts-ignore
        this.requestId = (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(run);
    }

    /**
     * repeat run animation
     */
    public repeat(): void {
        this.stop = false;
        this.performanceTime = 0;
        this.runDuration = this.duration;
        const run = (time: number) => {
            if (this.performanceTime === 0) {
                this.performanceTime = time;
            }
            this.runDuration -= (time - this.performanceTime);
            if (this.stop) {
                this.stopAnimation(AnimationEvent.CANCEL);
                return
            }
            if(this.runDuration < 0){
                this.runDuration = this.duration;
            }
            this.runNextTick(this.runDuration);
            this.performanceTime = time;
            // @ts-ignore
            this.requestId = (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(run);
        };
        // @ts-ignore
        this.requestId = (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(run);
    }

    /**
     * stop animation
     * @param eventType
     */
    private stopAnimation(eventType: AnimationEvent): void {
        window.cancelAnimationFrame(this.requestId);
        this.requestId = -1;
        if (this.stop) {
            this.listener.forEach(item => item(AnimationEvent.CANCEL));
        } else {
            this.stop = true;
            this.listener.forEach(item => item(eventType));
        }
    }

    /**
     * move shape by tick time
     * @param duration
     */
    private runNextTick(duration: number) {
        const vector = this.runner(duration);
        if (!this.lastVector) {
            this.lastVector = vector;
        }
        this.statusListener.forEach(listener => listener(duration / this.duration));
        this.itemList.forEach(shape => {
            if (shape instanceof Vector || shape.canAnimated) {
                // @ts-ignore
                shape.move(vector.x - this.lastVector.x, vector.y - this.lastVector.y);
            }
        });
        this.lastVector = vector;
    }

    abstract runner(time: number): Vector;
}

