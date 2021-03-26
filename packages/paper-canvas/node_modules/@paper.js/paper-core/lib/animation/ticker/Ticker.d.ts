export default abstract class Ticker {
    protected constructor(duration: number);
    private readonly duration;
    private runDuration;
    private tickType;
    reset(): void;
    protected setTick(time: number): void;
    startWithReverse(): void;
    startWithForward(): void;
    runTick(time: number): number;
    abstract tick(time: number): number;
}
