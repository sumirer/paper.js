import {
    AnimationEvent,
    AnimationEventListener,
    AnimationStatusListener,
    AnimationType,
    IAnimationEvent,
    IAnimationStatus
} from "./types";
import Ticker from "./Ticker";

export default class Actuator {

    /**
     * all event listener queue
     */
    private eventListenerList: Array<AnimationEventListener> = [];

    /**
     * all status listener queue
     */
    private statusListenerList: Array<AnimationStatusListener> = [];

    /**
     * you must create a Ticker
     */
    private ticker!: Ticker;

    /**
     * record request animation frame run id
     */
    private requestId: number = -1;

    /**
     * record last update time
     */
    private lastTickDate: number = 0;

    /**
     * forward execution animation
     * @param callback
     */
    public forward(callback?: AnimationEventListener): void {
        if (!this.ticker) {
            throw new Error('please make sure you ticker has be created..')
        }
        this.ticker.reset();
        this.ticker.startWithForward();
        this.createAnimationFrame((time: number) => this.runner(time, () => {
            this.notifyAllEventListener({type: AnimationEvent.FORWARD});
            if (callback) {
                callback({type: AnimationEvent.FORWARD});
            }
        }))
    }

    /**
     * reverse execution animation
     * @param callback
     */
    public reverse(callback?: AnimationEventListener): void {
        if (!this.ticker) {
            throw new Error('please make sure you ticker has be created..')
        }
        this.ticker.reset();
        this.ticker.startWithReverse();
        this.createAnimationFrame((time: number) => this.runner(time, () => {
            this.notifyAllEventListener({type: AnimationEvent.REVERSE});
            if (callback) {
                callback({type: AnimationEvent.REVERSE});
            }
        }))
    }

    /**
     * animation repeat
     */
    public repeat(startType: AnimationType = AnimationType.FORWARD): void {
        if (startType === AnimationType.FORWARD) {
            this.forward(() => {
                this.repeat(startType);
            })
        } else {
            this.reverse(() => {
                this.repeat(startType);
            })
        }
    }

    /**
     * vacillate execution animation
     */
    public vacillate(startType: AnimationType = AnimationType.FORWARD): void {
        if (startType === AnimationType.FORWARD) {
            this.forward(() => {
                this.vacillate(AnimationType.REVERSE);
            })
        } else {
            this.reverse(() => {
                this.vacillate(AnimationType.FORWARD);
            })
        }
    }

    /**
     * notify all event listener
     * @param event
     */
    private notifyAllEventListener(event: IAnimationEvent) {
        this.eventListenerList.forEach(listener => listener(event))
    }

    /**
     * notify all status listener
     * @param status
     */
    private notifyAllStatusListener(status: IAnimationStatus) {
        this.statusListenerList.forEach(statusListener => statusListener(status))
    }

    /**
     * add event listener
     * @param eventListener
     */
    public addEventListener(eventListener: AnimationEventListener): void {
        this.eventListenerList.push(eventListener)
    }

    /**
     * add status listener
     * @param statusListener
     */
    public addStatusListener(statusListener: AnimationStatusListener): void {
        this.statusListenerList.push(statusListener);
    }

    /**
     * A animation has only one ticker
     * @param ticker
     */
    public setTicker<T extends Ticker>(ticker: T): void {
        this.ticker = ticker;
    }

    /**
     * describe animation run path by ticker
     * @param time
     * @param callback
     */
    public runner(time: number, callback?: () => void): void {
        if (!this.lastTickDate) {
            this.lastTickDate = time;
        }
        const tick = this.ticker.runTick(time - this.lastTickDate);
        this.lastTickDate = time;
        this.notifyAllStatusListener({progress: tick});
        if (tick >= 1) {
            if (callback) {
                callback()
            }
            return;
        }
        this.createAnimationFrame((tickTime) => this.runner(tickTime, callback))
    }

    /**
     * create animation frame function
     * @param callback
     */
    private createAnimationFrame(callback: FrameRequestCallback) {
        this.requestId = (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(callback);
    }
}
