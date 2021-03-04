import {Polygon, Triangle, Vector, AnimationEvent, Linear, DrawingBoard, Bezier, VariableSpeed} from './src/index'

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
        // const animation1 = new Linear(new Vector(400, 400), {duration: 5000});
        const animation = new Bezier(new Vector(0, 1), new Vector(1, 0), new Vector(400, 400), {duration: 5000});
        animation.addShape(tr);
        // animation1.addShape(tr);
        animation.addEventListener((status: AnimationEvent) => {
            if (status === AnimationEvent.REVERSE) {
                animation.forward();
            }
            if (status === AnimationEvent.FORWARD) {
                animation.reverse();
            }
        });
        // animation1.addEventListener((status: AnimationEvent) => {
        //     if (status === AnimationEvent.REVERSE) {
        //         animation1.forward();
        //     }
        //     if (status === AnimationEvent.FORWARD) {
        //         animation1.reverse();
        //     }
        // });
        animation.forward();
        // animation1.forward();
        // const animation = new VariableSpeed(new Vector(600, 800), new Vector(20, 608), {duration: 500});
        // animation.addShape(tr);
        // animation.addEventListener((status: AnimationEvent) => {
        //     if (status === AnimationEvent.REVERSE) {
        //         animation.forward();
        //     }
        //     if (status === AnimationEvent.FORWARD) {
        //         animation.reverse();
        //     }
        // });
        // animation.forward();
    }
}


window.onload = function () {
    new Test().run();
    console.log('test run')
};
