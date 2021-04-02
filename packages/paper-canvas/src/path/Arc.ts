export class Arc {
    constructor(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.anticlockwise = anticlockwise;
    }

    x: number;
    y: number;
    radius: number;
    startAngle: number;
    endAngle: number;
    anticlockwise?: boolean;

    getDrawParams() {
        return [this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise].filter(item => item !== undefined)
    }
}
