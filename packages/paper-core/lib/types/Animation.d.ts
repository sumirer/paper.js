import { Vector } from "../common";
export declare enum AnimationEvent {
    DONE = 0,
    CANCEL = 1,
    FORWARD = 2,
    REVERSE = 3
}
export interface IAnimationEvent {
    type: AnimationEvent;
}
export interface IAnimationStatus {
    progress: number;
    position: Vector;
    offset: Vector;
}
export declare type AnimationEventListener = (event: IAnimationEvent) => void;
export declare type AnimationStatusListener = (event: IAnimationStatus) => void;
export declare enum TickType {
    FORWARD = 1,
    REVERSE = 2
}
export declare enum AnimationType {
    FORWARD = 1,
    REVERSE = 2
}
export interface IMouseEventConsumer {
    onMouseMove: (point: Vector, event: MouseEvent) => void;
    onMouseUp: (point: Vector, event: MouseEvent) => void;
    onMouseDown: (point: Vector, event: MouseEvent) => void;
}
export interface IAnimationParams {
    duration: number;
}
