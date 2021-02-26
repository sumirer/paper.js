import Point from "../common/Point";
import {AnimationEvent} from "../animation/BaseAnimation";


export interface IMouseEventConsumer {
    onMouseMove: (point: Point, event: MouseEvent)=>void;
    onMouseUp: (point: Point, event: MouseEvent)=>void;
    onMouseDown: (point: Point, event: MouseEvent)=>void;
}

export interface IAnimationParams {
    duration: number,

}

export type AnimationListener = Function<AnimationEvent>

