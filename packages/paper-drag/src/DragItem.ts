import {Vector} from "@paper.js/paper-core/lib";


export abstract class DragItem {

    /**
     * record item position
     */
    dragItemLastPosition!: Vector;

    /**
     * update position offset
     * @param offset
     */
    move(offset: Vector): void {
        this.dragItemLastPosition.addWith(offset);
    }

    /**
     * set item position
     * @param position
     */
    moveTo(position: Vector): void {
        this.dragItemLastPosition = position;
    }

    /**
     * you should update you item in this function
     */
    abstract updateState(): void;
}
