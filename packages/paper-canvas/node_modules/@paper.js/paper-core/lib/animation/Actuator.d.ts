import { AnimationEventListener, AnimationStatusListener, AnimationType } from "../types";
import Travel from "./travel/Travel";
import Ticker from "./ticker/Ticker";
export default class Actuator {
    /**
     * all event listener queue
     */
    private eventListenerList;
    /**
     * all status listener queue
     */
    private statusListenerList;
    /**
     * save all travel
     */
    private travelList;
    /**
     * you must create a Ticker
     */
    private ticker;
    /**
     * record last tick position
     */
    private lastPosition;
    /**
     * record request animation frame run id
     */
    private requestId;
    /**
     * record last update time
     */
    private lastTickDate;
    /**
     * forward execution animation
     * @param callback
     */
    forward(callback?: AnimationEventListener): void;
    /**
     * reverse execution animation
     * @param callback
     */
    reverse(callback?: AnimationEventListener): void;
    /**
     * animation repeat
     */
    repeat(startType?: AnimationType): void;
    /**
     * vacillate execution animation
     */
    vacillate(startType?: AnimationType): void;
    /**
     * notify all event listener
     * @param event
     */
    private notifyAllEventListener;
    /**
     * notify all status listener
     * @param status
     */
    private notifyAllStatusListener;
    /**
     * add event listener
     * @param eventListener
     */
    addEventListener(eventListener: AnimationEventListener): void;
    /**
     * add status listener
     * @param statusListener
     */
    addStatusListener(statusListener: AnimationStatusListener): void;
    /**
     * you can add more travel in animation
     * but compute result is sum of all results
     * @param travel
     */
    addTravel<T extends Travel>(travel: T): void;
    /**
     * A animation has only one ticker
     * @param ticker
     */
    addTicker<T extends Ticker>(ticker: T): void;
    /**
     * compute next tick's position
     * @param tick
     */
    private getNextPositionByTick;
    /**
     * describe animation run path by ticker
     * @param time
     * @param callback
     */
    runner(time: number, callback?: () => void): void;
    /**
     * create animation frame function
     * @param callback
     */
    private createAnimationFrame;
}
