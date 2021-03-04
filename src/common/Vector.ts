export class Vector {

    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public x: number;

    public y: number;

    public z: number;

    move(dx: number, dy: number, dz: number = 0) {
        this.x += dx;
        this.y += dy;
        this.z += dz;
    }

    clone(): Vector {
        return new Vector(this.x, this.y, this.z);
    }
}

