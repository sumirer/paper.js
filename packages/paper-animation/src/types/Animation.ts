import {Vector} from "@paper.js/paper-core/lib";

export enum AnimationEvent {
    DONE = 0,
    CANCEL = 1,
    FORWARD = 2,
    REVERSE = 3,
}

export interface IAnimationEvent {
    type: AnimationEvent
}

export interface IAnimationStatus {
    progress: number;
}

export type AnimationEventListener = (event: IAnimationEvent) => void;

export type AnimationStatusListener = (event: IAnimationStatus) => void;

export enum TickType{
    FORWARD = 1,
    REVERSE = 2,
}

export enum AnimationType {
    FORWARD = 1,
    REVERSE = 2,
}

export interface IMouseEventConsumer {
    onMouseMove: (point: Vector, event: MouseEvent) => void;
    onMouseUp: (point: Vector, event: MouseEvent) => void;
    onMouseDown: (point: Vector, event: MouseEvent) => void;
}

export interface IAnimationParams {
    duration: number,

}
