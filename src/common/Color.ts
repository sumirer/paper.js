export class Color {
    constructor(red: number, green: number, blue: number, alpha: number = 1) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    public red: number;

    public green: number;

    public blue: number;

    public alpha: number;

    /**
     * get color from rgb
     * @param r
     * @param g
     * @param b
     */
    public static formRGB(r: number, g: number, b: number): Color {
        return new Color(r, g, b, 1);
    }

    /**
     * get color from rgba
     * @param r
     * @param g
     * @param b
     * @param a
     */
    public static fromRGBA(r: number, g: number, b: number, a: number): Color {
        return new Color(r, b, b, a);
    }

    /**
     * get color from hex string
     * @param hex
     */
    public static formHex(hex: string): Color {
        const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        let color = hex.toLowerCase();
        if (color && reg.test(color)) {
            if (color.length === 4) {
                let colorNew = "#";
                for (let index = 1; index < 4; index += 1) {
                    colorNew += color.slice(index, index + 1).concat(color.slice(index, index + 1));
                }
                color = colorNew;
            }
            const colorRGBA = [];
            for (let index = 1; index < 7; index += 2) {
                colorRGBA.push(Number.parseInt("0x" + color.slice(index, index + 2)));
            }
            // @ts-ignore
            return new Color(...colorRGBA);
        }
        throw Error("input color string isn't hex color string, please check you color string")
    }

    /**
     * to hex color string
     */
    public toHexString(): string {
        const r = Math.floor(this.alpha * this.red + (1 - this.alpha) * 255);
        const g = Math.floor(this.alpha * this.green + (1 - this.alpha) * 255);
        const b = Math.floor(this.alpha * this.blue + (1 - this.alpha) * 255);
        return "#" +
            ("0" + r.toString(16)).slice(-2) +
            ("0" + g.toString(16)).slice(-2) +
            ("0" + b.toString(16)).slice(-2);
    }
}
