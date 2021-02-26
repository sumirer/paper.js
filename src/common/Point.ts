class Point {

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    public x: number;

    public y: number;

    clone(): Point {
        return new Point(this.x, this.y);
    }

    move(dx: number, dy: number) {
        this.x += dx;
        this.y += dy;
    }
}

export default Point;
