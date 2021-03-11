import {AnimationEvent} from "../animation";
import Vector from "../common";


export interface IMouseEventConsumer {
    onMouseMove: (point: Vector, event: MouseEvent) => void;
    onMouseUp: (point: Vector, event: MouseEvent) => void;
    onMouseDown: (point: Vector, event: MouseEvent) => void;
}

export interface IAnimationParams {
    duration: number,

}

export type AnimationListener = Function<AnimationEvent>

export type AnimationStatusListener = Function<number>

