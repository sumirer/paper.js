
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
    ColorUtils, Color, PointMap
} from './src/index'
import {IFS, IFSExpression} from "./src/math";

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

        const ifs = new IFS(new Vector(1000,100),60000);


        const exp1 = new IFSExpression(0,0,0,0,100.16,0,0.01);
        ifs.addExpression(exp1);
        const exp2 = new IFSExpression(0.2,-0.26,0.23,0.22,0,101.6,0.07);
        ifs.addExpression(exp2);
        const exp3 = new IFSExpression(-0.15,0.28,0.26,0.24,0,100.44,0.07);
        ifs.addExpression(exp3);
        const exp4 = new IFSExpression(0.85,0.04,-0.04,0.85,0,101.6,0.85);
        ifs.addExpression(exp4);
        ifs.startLoop();
        const pointMap = new PointMap(ifs.pointList,{
            strokeStyle: '#000'
        });

        const ifsf = new IFS(new Vector(1000,100),60000);


        const expx1 = new IFSExpression(0.195,-0.488,0.344,0.433,200.4431,200.2452,0.25);
        ifsf.addExpression(expx1);
        const expx2 = new IFSExpression(0.462 ,0.414 ,-0.252 ,0.361 ,200.2511 ,200.5692 ,0.25);
        ifsf.addExpression(expx2);
        const expx3 = new IFSExpression(-0.058 ,-0.07 ,0.453 ,-0.111 ,200.5976 ,200.0969 ,0.25);
        ifsf.addExpression(expx3);
        const expx4 = new IFSExpression(-0.035 ,0.07 ,-0.469 ,-0.022 ,200.4884 ,200.5069 ,0.2);
        ifsf.addExpression(expx4);
        const expx5 = new IFSExpression(-0.637 ,0 ,0 ,0.501 ,200.8562 ,200.2513 ,0.05);
        ifsf.addExpression(expx5);

        ifsf.startLoop();
        const pointMapf = new PointMap(ifsf.pointList,{
            strokeStyle: '#000'
        });
        board.addShape(pointMapf);
        board.paintAll();

    }
}

//double a[][8]={
// 		0,0.195,-0.488 ,0.344 ,0.433 ,0.4431 ,0.2452 ,0.25 ,\
// 		0,0.462 ,0.414 ,-0.252 ,0.361 ,0.2511 ,0.5692 ,0.25,\
// 		0,-0.058 ,-0.07 ,0.453 ,-0.111 ,0.5976 ,0.0969 ,0.25 ,\
// 		0,-0.035 ,0.07 ,-0.469 ,-0.022 ,0.4884 ,0.5069 ,0.2,\
// 		0,-0.637 ,0 ,0 ,0.501 ,0.8562 ,0.2513 ,0.05};
// 	double aa,bb;
//




window.onload = function () {
    new Season().run();
};
