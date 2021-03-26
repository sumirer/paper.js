export class BoundingClientRect {
    public minX: number;

    public minY: number;

    public maxX: number;

    public maxY: number;

    constructor(minX = 0, minY = 0, maxX = 0, maxY = 0) {
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
    }
}
