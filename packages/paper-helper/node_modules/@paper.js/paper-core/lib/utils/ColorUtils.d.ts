import { Color } from "../common";
export declare class ColorUtils {
    /**
     * get linear gradient color by percentage
     * @param startColor
     * @param endColor
     * @param step
     */
    static getLinearGradientByStep(startColor: Color, endColor: Color, step: number): Color;
}
