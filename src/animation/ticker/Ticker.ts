import {TickType} from "../../types";

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

    public startWithReverse() {
        this.tickType = TickType.REVERSE;
        this.runDuration = this.duration;
    }

    public startWithForward() {
        this.tickType = TickType.FORWARD;
        this.runDuration = 0;
    }

    public runTick(time: number): number {
        this.setTick(time);
        return this.tick(this.runDuration / this.duration);
    }

    public abstract tick(time: number): number;
}
