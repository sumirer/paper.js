import BaseShape from "../shape/BaseShape";
import {AnimationListener} from "../types/lib";
import Point from "../common/Point";

export enum AnimationEvent {
    DONE = 0,
    CANCEL = 1,
    FORWARD = 2,
    REVERSE = 3
}

abstract class BaseAnimation {

    private listener: Array<AnimationListener> = [];

    private provider: Array<BaseShape> = [];

    abstract forward(): void;

    abstract reverse(): void;

    abstract cancel(): void;

    public addProvider<T extends BaseShape>(shape: T) {
        this.provider.push(shape);
    }

    public addEventListener(listener: AnimationListener): void {

    }

    public runner(point: Point) :void{

    }
}
