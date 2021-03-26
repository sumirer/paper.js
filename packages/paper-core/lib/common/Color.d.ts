export declare class Color {
    constructor(red: number, green: number, blue: number, alpha?: number);
    red: number;
    green: number;
    blue: number;
    alpha: number;
    /**
     * get color from rgb
     * @param r
     * @param g
     * @param b
     */
    static formRGB(r: number, g: number, b: number): Color;
    /**
     * get color from rgba
     * @param r
     * @param g
     * @param b
     * @param a
     */
    static fromRGBA(r: number, g: number, b: number, a: number): Color;
    /**
     * get color from hex string
     * @param hex
     */
    static formHex(hex: string): Color;
    /**
     * to hex color string
     */
    toHexString(): string;
}
