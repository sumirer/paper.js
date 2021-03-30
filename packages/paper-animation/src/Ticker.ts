import {TickType} from "./types";

export default abstract class Ticker {

    protected constructor(duration: number) {
        this.duration = duration;
        this.runDuration = duration;
    }

    private readonly duration: number;

    private runDuration: number;

    private tickType!: TickType;

    public reset(): void {
        this.runDuration = this.duration;
    }

    protected setTick(time: number) {
        if (this.tickType === TickType.FORWARD) {
            this.runDuration += time;
        } else {
            this.runDuration -= time;
        }
    }

    /**
     * init status before reverse execution
     */
    public startWithReverse() {
        this.tickType = TickType.REVERSE;
        this.runDuration = this.duration;
    }

    /**
     * init status before forward execution
     */
    public startWithForward() {
        this.tickType = TickType.FORWARD;
        this.runDuration = 0;
    }

    /**
     * update status with actuator
     * @see ./Actuator
     * @param time
     */
    public runTick(time: number): number {
        this.setTick(time);
        return this.tick(this.runDuration / this.duration);
    }

    public abstract tick(time: number): number;
}
