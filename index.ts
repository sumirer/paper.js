import DrawingBoard from "./src/basics/DrawingBoard";
import Triangle from "./src/shape/Triangle";
import Point from "./src/common/Point";
import Polygon from "./src/shape/Polygon";

class Test {
    public run() {
        const board1 = new DrawingBoard('canvas1', 1000, 1000);
        board1.addShape(new Triangle([new Point(100, 100), new Point(200, 300), new Point(50, 400)], {
            strokeStyle: 'yellow',
            lineWidth: 2,
            fillStyle: 'red',
            fillRange: true,
            strokeBorder: true,
            borderRadius: 0
        }));
        board1.addShape(new Polygon([new Point(300, 100), new Point(500, 90), new Point(520, 480), new Point(280, 500),], {
            strokeStyle: 'yellow',
            lineWidth: 2,
            fillStyle: 'red',
            borderRadius: 5
        }));
        board1.paintAll();
    }
}


window.onload = function () {
    new Test().run();
    console.log('test run')
};
