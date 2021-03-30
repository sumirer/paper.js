import {DragItem} from "./DragItem";
import {Vector} from "@paper.js/paper-core/lib";

export class HtmlElementDragItem extends DragItem {

    constructor(elementId: string, defaultPosition: Vector = Vector.create()) {
        super();
        this.dragItemLastPosition = defaultPosition;
        const htmlElement = document.getElementById(elementId);
        if (!htmlElement) {
            throw new Error("element not't find, please check you drag item id");
        }
        this.htmlElement = htmlElement;
    }

    htmlElement!: HTMLElement;

    updateState() {
        this.htmlElement.style.top = `${this.dragItemLastPosition.y}px`;
        this.htmlElement.style.left = `${this.dragItemLastPosition.x}px`;
    }

}
