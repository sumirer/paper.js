import {Color} from "../common";

export class ColorUtils {

    /**
     * get linear gradient color by percentage
     * @param startColor
     * @param endColor
     * @param step
     */
    static getLinearGradientByStep(startColor: Color, endColor: Color, step: number): Color {
        const colorR = (endColor.red - startColor.red) * step + startColor.red;
        const colorG = (endColor.green - startColor.green) * step + startColor.green;
        const colorB = (endColor.blue - startColor.blue) * step + startColor.blue;
        const colorA = (endColor.alpha - startColor.alpha) * step + startColor.alpha;
        return new Color(colorR, colorG, colorB, colorA);
    }
}
