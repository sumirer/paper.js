import {Polygon, Triangle, Vector, AnimationEvent, Linear, DrawingBoard} from './src/index'

class Test {
    public run() {
        const board1 = new DrawingBoard('canvas1', 1000, 1000);
        const tr = new Triangle([new Vector(100, 100), new Vector(200, 300), new Vector(50, 400)], {
            strokeStyle: 'yellow',
            lineWidth: 2,
            fillStyle: 'red',
            fillRange: true,
            strokeBorder: true,
            borderRadius: 0
        });
        board1.addShape(tr);
        board1.addShape(new Polygon([new Vector(300, 100), new Vector(500, 90), new Vector(520, 480), new Vector(280, 500),], {
            strokeStyle: 'yellow',
            lineWidth: 2,
            fillStyle: 'red',
            borderRadius: 5
        }));
        board1.paintAll();
        const animation = new Linear(new Vector(100, 100), {duration: 5000});
        animation.addShape(tr);
        animation.addEventListener((status: AnimationEvent) => {
            if (status === AnimationEvent.REVERSE) {
                animation.forward();
            }
            if (status === AnimationEvent.FORWARD) {
                animation.reverse();
            }
        });
        animation.reverse();
    }
}


window.onload = function () {
    new Test().run();
    console.log('test run')
};
