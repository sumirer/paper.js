import {DragItem} from "./DragItem";
import {HtmlElementDragItem} from "./HtmlElementDragItem";
import {Vector} from "@paper.js/paper-core/lib";

export enum DragItemType {
    TYPE_HTML_ELEMENT = 1,
    TYPE_CANVAS_ELEMENT = 2,
}

export class Drag {

    constructor(bodyId: string, type: DragItemType = DragItemType.TYPE_HTML_ELEMENT) {
        const element = document.getElementById(bodyId);
        if (!element) {
            throw new Error("element not't find, please check you element id")
        }
        this.bodyElement = element;
        // only check css attribute on DragItemType.TYPE_HTML_ELEMENT mode
        if (type === DragItemType.TYPE_HTML_ELEMENT) {
            this.checkBodyElementStyle(this.bodyElement);
        }
        this.registerEventListener(this.bodyElement);
        this.dragType = type;
    }

    /**
     * drag type
     */
    dragType: DragItemType;

    /**
     * drag body element
     */
    bodyElement: HTMLElement;

    /**
     * drag item move lock, lock target in dragging
     */
    lockedTargetDragItem: DragItem | undefined;

    /**
     * save drag item
     */
    dragItemList: Array<DragItem> = [];

    /**
     * record last drag position
     */
    lastPositionRecord!: Vector;

    /**
     * check html element css attribute
     * @param element
     */
    public checkBodyElementStyle(element: HTMLElement): void {
        if (!element.style.position || element.style.position !== 'relative') {
            throw new Error('body element should set position attribute to "relative"');
        }
        const style = getComputedStyle(element);
        if (!style.width || !style.height) {
            throw new Error('body element should have width or height, check you css attribute');
        }
    }

    /**
     * register element mouse event
     * @param bodyElement
     */
    public registerEventListener(bodyElement: HTMLElement): void {
        // TODO: touch event support
        bodyElement.addEventListener('mouseup', this.handleDragUp);
        bodyElement.addEventListener('mousedown', this.handleDragDown);
        bodyElement.addEventListener('mousemove', this.handleDragMove);
    }

    /**
     * handle mouse down event, record start position
     * @param event
     */
    private handleDragDown = (event: MouseEvent) => {
        if (this.dragType === DragItemType.TYPE_HTML_ELEMENT) {
            if (!event.target) {
                return;
            }
            this.lockedTargetDragItem = this.dragItemList.find(item => {
                return item instanceof HtmlElementDragItem && item.htmlElement === event.target;
            });
            // not't find drag item, no op
            if (!this.lockedTargetDragItem) {
                return;
            }
            this.lastPositionRecord = Vector.create(event.clientX, event.clientY);
        }
    };

    /**
     * handle mouse up event over drag event
     * @param event
     */
    private handleDragUp = (event: MouseEvent) => {
        this.lockedTargetDragItem = undefined;
    };

    /**
     * handle mouse move event, control drag item move and update
     * @param event
     */
    private handleDragMove = (event: MouseEvent) => {
        if (!this.lockedTargetDragItem) {
            return;
        }
        const position = Vector.create(event.clientX, event.clientY);
        if (!this.lastPositionRecord) {
            this.lastPositionRecord = position;
        }
        const offset = position.clone().reduceWith(this.lastPositionRecord);
        this.lastPositionRecord.addWith(offset);
        this.lockedTargetDragItem.move(offset);
        this.lockedTargetDragItem.updateState();
    };

    /**
     * get element relative position
     * @param element
     * @param event
     */
    private static getRelativePoint(element: HTMLElement, event: MouseEvent): Vector {
        const bound = element.getBoundingClientRect();
        return new Vector(event.clientX - bound.x, event.clientY - bound.y);
    }

    /**
     * add drag item to control list
     * @param item
     */
    public addDragItem<T extends DragItem>(item: T): void {
        this.dragItemList.push(item);
    }
}
