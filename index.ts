/* @ts-ignore */
import {
    AnimationEvent, Color, ColorUtils,
    DrawingBoard, DrawMap,
    IFS,
    IFSExpression,
    Linear, LineMap,
    Matrix,
    PointMap,
    Polygon, Rect,
    VariableSpeed,
    Vector
} from './src'

class Season {

    constructor() {
        this.boardWidth = 1200;
        this.boardHeight = 1000;
        this.board = new DrawingBoard('canvas', this.boardWidth, this.boardHeight);
        this.boardTree = new DrawingBoard('canvas1', this.boardWidth, this.boardHeight);
    }

    public boardHeight: number;

    public boardWidth: number;

    public board: DrawingBoard;

    public boardTree: DrawingBoard;

    // @ts-ignore
    public treeUpAnimation: Linear;

    // @ts-ignore
    public rainAnimation: VariableSpeed;

    public run() {
        this.addBackground();
        this.updateTree();
        this.board.paintAll();
        this.boardTree.paintAll();
        this.treeUpAnimation.forward();
    }

    public addBackground() {
        const background = new Polygon([new Vector(), new Vector(this.boardWidth, 0), new Vector(this.boardWidth, this.boardHeight), new Vector(0, this.boardHeight)], {
            fillStyle: '#F7EED6',
            fillRange: true
        });
        const lA = new Linear(new Vector(1, 0), {duration: 60000});
        const lB = new Linear(new Vector(1, 0), {duration: 60000});
        const lC = new Linear(new Vector(1, 0), {duration: 60000});
        const lD = new Linear(new Vector(1, 0), {duration: 60000});
        lA.addStatusListener((status: number) => {
            if (status <= 0.25) {
                // @ts-ignore
                background.style.fillStyle = ColorUtils.getLinearGradientByStep(Color.formHex('#F0FFF0'), Color.formHex('#FFE7BA'), status / 0.25).toHexString();
            }
            if (status > 0.25 && status <= 0.5) {
                // @ts-ignore
                background.style.fillStyle = ColorUtils.getLinearGradientByStep(Color.formHex('#FFE7BA'), Color.formHex('#FFE4B5'), (status - 0.25) / 0.25).toHexString();
            }
            if (status > 0.5 && status <= 0.75) {
                // @ts-ignore
                background.style.fillStyle = ColorUtils.getLinearGradientByStep(Color.formHex('#FFE4B5'), Color.formHex('#FFFFFF'), (status - 0.5) / 0.25).toHexString();
            }
            if (status > 0.75) {
                // @ts-ignore
                background.style.fillStyle = ColorUtils.getLinearGradientByStep(Color.formHex('#FFFFFF'), Color.formHex('#F0FFF0'), (status - 0.75) / 0.25).toHexString();
            }
            background.makeStyle();
            this.board.paintAll();
        });
        this.board.addShape(background);
        lA.forward();
    }

    public createTree(statusX: number, statusY: number): IFS {
        const ifsTree = new IFS(new Vector(700, 500), 50000);
        ifsTree.setCenterPoint(new Vector(500, 500));
        const exp1 = new IFSExpression(0.245 + 0.1 * statusX, -0.308, 0.644, 0.45 + 0.1 * statusY, 150.4431, 150.2452, 0.25);
        ifsTree.addExpression(exp1);
        const exp2 = new IFSExpression(0.462, 0.414, -0.252, 0.361, 150.2511, 150.5692, 0.25);
        ifsTree.addExpression(exp2);
        const exp5 = new IFSExpression(-0.637, 0, 0, 0.501, 150.8562, 150.2513, 0.05);
        ifsTree.addExpression(exp5);
        const exp3 = new IFSExpression(-0.058, -0.07, 0.453, -0.111, 150.5976, 150.0969, 0.25);
        ifsTree.addExpression(exp3);
        const exp4 = new IFSExpression(-0.035, 0.07, -0.469, -0.022, 150.4884, 150.5069, 0.20);
        ifsTree.addExpression(exp4);
        const mat = new Matrix([[Math.cos(Math.PI / 2), -Math.sin(Math.PI / 2), 0], [Math.sin(Math.PI / 2), -Math.cos(Math.PI / 2), 0], [0, 0, 1]]);
        ifsTree.addChangeMatrix(mat);
        ifsTree.addChangeMatrix(mat);
        ifsTree.addChangeMatrix(new Matrix([[1, 0, 600], [0, 1, 430], [0, 0, 1]]));
        ifsTree.startLoop();
        return ifsTree;
    }

    public updateTree() {
        const pointMap = new PointMap([new Vector(0, 0)], {
            strokeStyle: '#A0522D'
        });
        this.boardTree.addShape(pointMap);
        this.treeUpAnimation = new Linear(new Vector(1, 0), {duration: 6000});
        this.treeUpAnimation.addStatusListener((status: number) => {
            const ifsTree = this.createTree(status, status);
            pointMap.updateWithNewPoint(ifsTree.pointList);
        });
        this.treeUpAnimation.addEventListener((status: AnimationEvent) => {
            // 生长结束
            this.createRain();
            this.rainAnimation.forward()
        });
    }

    public createY() {
        // const ifs = new IFS(new Vector(1000, 100), 90000);
        // const exp1 = new IFSExpression(0, 0, 0, 0, 100.16, 0, 0.01);
        //
        // ifs.addExpression(exp1);
        // const exp2 = new IFSExpression(0.2, -0.26, 0.23, 0.22, 0, 101.6, 0.07);
        // ifs.addExpression(exp2);
        // const exp3 = new IFSExpression(-0.15, 0.28, 0.26, 0.24, 0, 100.44, 0.07);
        // ifs.addExpression(exp3);
        // const exp4 = new IFSExpression(0.85, 0.04, -0.04, 0.85, 0, 101.6, 0.85);
        // ifs.addExpression(exp4);
        // ifs.addChangeMatrix(new Matrix([[Math.cos(Math.PI), -Math.sin(Math.PI),0], [Math.sin(Math.PI), -Math.cos(Math.PI),0],[0,0,1]]))
        // ifs.addChangeMatrix(new Matrix([[1,0,200], [0,1,600],[0,0,1]]))
        // ifs.startLoop();
        //
        // const pointMap = new PointMap(ifs.pointList, {
        //     fillStyle: '#000',
        //
        //     strokeStyle: '#000'
        // });
    }

    public createRain() {
        this.rainAnimation = new VariableSpeed(new Vector(-300, 400), new Vector(0, 98), {duration: 5000});
        const lineMap = new LineMap(new Vector(0, 0), new Vector(this.boardWidth * 2, this.boardHeight), {strokeStyle: '#1E90FF'});
        for (let index = 0; index < 500; index++) {
            const x = Math.random() * this.boardWidth * 2;
            const y = Math.random() * -2 * this.boardHeight;
            const height = Math.random() * 5 + 7;
            lineMap.addLine(new Vector(x, y), new Vector(x - 10, y + height));
        }
        this.board.addShape(lineMap);
        this.board.paintAll();
        this.rainAnimation.addShape(lineMap);
        this.rainAnimation.addEventListener((status: AnimationEvent) => {
            if (status === AnimationEvent.FORWARD) {
                this.board.removeShape(lineMap);
                // 渲染下一帧
                this.addSun();
            }
        })

    }

    public createLeaf() {
        const dp = new DrawMap(new Vector(0, 0), new Vector(this.boardWidth * 2, this.boardHeight), {});
        dp.drawOp((p: CanvasRenderingContext2D) => {
            const pointMap = [new Vector(), new Vector(), new Vector(), new Vector(), new Vector(), new Vector(), new Vector(), new Vector(),];
            for (let i = 0; i < pointMap.length; i++) {

            }
        });
        this.board.addShape(dp);
        this.board.paintAll();
    }

    public addSun() {
        const dp = new Rect(new Vector(-200, 1500), 40, {
            fillStyle: '#FFB90F',
            fillRange: true,
            shadowBlur: 20,
            shadowColor: '#FFB90F'
        });
        this.board.addShape(dp);
        this.board.paintAll();
        const l = new VariableSpeed(new Vector(100, -325), new Vector(0, 0), {duration: 4000});
        l.addShape(dp);
        l.addEventListener((status: AnimationEvent) => {
            if (status === AnimationEvent.FORWARD) {
                setTimeout(() => {
                    const ls = new VariableSpeed(new Vector(50, -100), new Vector(0, 0), {duration: 4000});
                    ls.addShape(dp);
                    ls.addEventListener((status: AnimationEvent) => {
                        if (status === AnimationEvent.FORWARD) {
                            this.board.removeShape(dp);
                            this.board.paintAll();
                        }
                    })
                    ls.forward();
                }, 3000);
            }
        });
        l.forward();
    }
}


window.onload = function () {
    new Season().run();
};
