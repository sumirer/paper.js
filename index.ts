/* @ts-ignore */
import {
    Polygon,
    Triangle,
    Vector,
    AnimationEvent,
    Linear,
    DrawingBoard,
    Bezier,
    VariableSpeed,
    ColorUtils, Color, PointMap, IFS, IFSExpression, Matrix
} from './src'

class Season {
    public run() {
        const boardWidth = 1000;
        const boardHeight = 1000;
        const board = new DrawingBoard('canvas', boardWidth, boardHeight);
        const background = new Polygon([new Vector(), new Vector(boardWidth, 0), new Vector(boardWidth, boardHeight), new Vector(0, boardHeight)], {
            fillStyle: '#F7EED6',
            fillRange: true
        });
        board.addShape(background);
        const ifs = new IFS(new Vector(1000, 100), 90000);
        const exp1 = new IFSExpression(0, 0, 0, 0, 100.16, 0, 0.01);
        ifs.addExpression(exp1);
        const exp2 = new IFSExpression(0.2, -0.26, 0.23, 0.22, 0, 101.6, 0.07);
        ifs.addExpression(exp2);
        const exp3 = new IFSExpression(-0.15, 0.28, 0.26, 0.24, 0, 100.44, 0.07);
        ifs.addExpression(exp3);
        const exp4 = new IFSExpression(0.85, 0.04, -0.04, 0.85, 0, 101.6, 0.85);
        ifs.addExpression(exp4);
        ifs.addChangeMatrix(new Matrix([[Math.cos(Math.PI), -Math.sin(Math.PI),0], [Math.sin(Math.PI), -Math.cos(Math.PI),0],[0,0,1]]))
        ifs.addChangeMatrix(new Matrix([[1,0,200], [0,1,600],[0,0,1]]))
        ifs.startLoop();
        console.log(ifs.pointList[100])
        console.log(new Matrix([[1,0,200], [0,1,200],[0,0,1]]).multiply(new Vector(500,500).toMatrix()))
        const pointMap = new PointMap(ifs.pointList, {
            fillStyle: '#000',
            strokeStyle: '#000'
        });
        board.addShape(pointMap);
        board.paintAll();

    }
}


window.onload = function () {
    new Season().run();
};
