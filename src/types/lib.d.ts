import {AnimationEvent} from "../animation/BaseAnimation";
import Vector from "../common/Vector";


export interface IMouseEventConsumer {
    onMouseMove: (point: Vector, event: MouseEvent)=>void;
    onMouseUp: (point: Vector, event: MouseEvent)=>void;
    onMouseDown: (point: Vector, event: MouseEvent)=>void;
}

export interface IAnimationParams {
    duration: number,

}

export type AnimationListener = Function<AnimationEvent>

