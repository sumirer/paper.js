/**
 * shape style
 */
export interface IShapeStyle {
    paint?: CanvasRenderingContext2D | null;
    fillStyle?: string | CanvasGradient | CanvasPattern | undefined;
    direction?: CanvasDirection | undefined;
    filter?: string | undefined;
    globalAlpha?: number | undefined;
    globalCompositeOperation?: string | undefined;
    font?: string | undefined;
    lineWidth?: number | undefined;
    lineDashOffset?: number | undefined;
    shadowBlur?: number | undefined;
    shadowColor?: string | undefined;
    shadowOffsetX?: number | undefined;
    shadowOffsetY?: number | undefined;
    textAlign?: CanvasTextAlign | undefined;
    textBaseline?: CanvasTextBaseline | undefined;
    imageSmoothingEnabled?: boolean | undefined;
    strokeStyle?: string | CanvasGradient | CanvasPattern | undefined;
    borderRadius?: number | undefined;
    fillRange?: boolean;
    strokeBorder?: boolean
}

