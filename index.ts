/* @ts-ignore */
import {
    AnimationEvent, Bezier,
    Color,
    ColorUtils,
    DrawingBoard,
    DrawMap, IFS, IFSExpression,
    Linear,
    LineMap, Matrix, PointMap,
    Polygon,
    Rect,
    VariableSpeed,
    Vector
} from './src'


interface ITreePath {
    start: Vector;
    end: Vector;
    lineWidth: number;
    color: string;
    isLeaf: boolean;
}

interface ISnow {
    position: Vector;
    radius: number;
    density: number;
}

class Season {
    private pathList: Array<ITreePath> = [];

    constructor() {
        this.boardWidth = window.innerWidth;
        this.boardHeight = window.innerHeight;
        this.board = new DrawingBoard('canvas', this.boardWidth, this.boardHeight, true);
        this.boardTree = new DrawingBoard('canvasTree', this.boardWidth, this.boardHeight);
        this.boardSnow = new DrawingBoard('canvasSnow', this.boardWidth, this.boardHeight);
    }

    public boardHeight: number;

    public boardWidth: number;

    public board: DrawingBoard;

    public boardTree: DrawingBoard;

    public boardSnow: DrawingBoard;

    // @ts-ignore
    public snowAnimation: Linear;

    // @ts-ignore
    public treeUpAnimation: Linear;

    // @ts-ignore
    public rainAnimation: VariableSpeed;

    // @ts-ignore
    public background: Polygon;

    public run() {
        this.addBackground();
        this.createLeafTree();
        this.board.paintAll();
        this.boardTree.paintAll();
        this.startSpring();
    }

    public startSpring() {
        this.updateBackgroundColorTo(Color.formHex('#FFF8DC'), 5000, () => {

        });
        this.changeTreeColor(Color.formHex('#CDCD00'), 5000, () => {
            this.updateBackgroundColorTo(Color.formHex('#BEBEBE'), 2000, () => {
                this.createRain(5000, () => {
                    this.startSummer();
                });
            })
        });
    }

    public startSummer() {
        this.changeTreeColor(Color.formHex('#228B22'), 3000, () => {
        })
        this.updateBackgroundColorTo(Color.formHex('#FFFACD'), 4500, () => {
            this.updateBackgroundColorTo(Color.formHex('#EEDD82'), 4500, () => {

            })
        })
        this.addSun(() => {
            setTimeout(() => {
                this.startAutumn();
            }, 2000)
        });
    }

    public startAutumn() {
        this.updateBackgroundColorTo(Color.formHex('#CDCDB4'), 4000, () => {
            this.changeTreeColor(Color.formHex("#EEB422"), 3000, () => {
                setTimeout(()=>{
                    this.startWinter();
                }, 2000)
            });
        })
    }

    public startWinter() {
        this.updateBackgroundColorTo(Color.formHex('#000000'), 4000, () => {
            this.startRunSnow(55000, () => {
            });
            setTimeout(() => {
                this.changeTreeColor(Color.formHex('#FFFFFF'), 2000, () => {
                })
            }, 3000)
        });
    }

    public lastTreeLeafColor: string = '#ffffff'

    public changeTreeColor(color: Color, duration: number, onFinish: Function) {
        const line = new Linear(new Vector(1, 0), {duration});
        line.addStatusListener((status: number) => {
            const colors = ColorUtils.getLinearGradientByStep(Color.formHex(this.lastTreeLeafColor), color, status).toHexString();
            for (let index = 0; index < this.pathList.length; index++) {
                if (this.pathList[index].isLeaf) {
                    this.pathList[index].color = colors;
                }
            }
            this.boardTree.paintAll();
        })
        line.addEventListener((e: AnimationEvent) => {
            if (e === AnimationEvent.FORWARD) {
                this.lastTreeLeafColor = color.toHexString();
                onFinish();
            }
        })
        line.forward();
    }

    public lastBackgroundColor: string = '#ffffff';

    public addBackground() {
        this.background = new Polygon([new Vector(), new Vector(this.boardWidth, 0), new Vector(this.boardWidth, this.boardHeight), new Vector(0, this.boardHeight)], {
            fillStyle: this.lastBackgroundColor,
            fillRange: true
        });
        this.board.addShape(this.background);
    }

    updateBackgroundColorTo(color: Color, duration: number, onFinish: Function) {
        const animation = new Linear(new Vector(1, 0), {duration});
        animation.addEventListener((event: AnimationEvent) => {
            if (event === AnimationEvent.FORWARD) {
                this.lastBackgroundColor = color.toHexString();
                onFinish();
            }
        })
        animation.addStatusListener((status: number) => {
            this.background.style.fillStyle = ColorUtils.getLinearGradientByStep(Color.formHex(this.lastBackgroundColor), color, status).toHexString();
            this.background.makeStyle();
            this.background.update();
        })
        animation.forward();
    }

    public createTree(statusX: number, statusY: number): IFS {
        const ifsTree = new IFS(new Vector(700, 500), 50000);
        ifsTree.setCenterPoint(new Vector(500, 500));
        const exp1 = new IFSExpression(0.245 + 0.1 * statusX, -0.308, 0.644, 0.45 + 0.1 * statusY, 150.4431, 150.2452, 0.25);
        ifsTree.addExpression(exp1);
        const exp2 = new IFSExpression(0.462, 0.414, -0.252, 0.261, 150.2511, 150.5692, 0.25);
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
        ifsTree.addChangeMatrix(new Matrix([[1, 0, 600], [0, 1, 280], [0, 0, 1]]));
        ifsTree.startLoop();
        return ifsTree;
    }

    public updateTree() {
        const pointMap = new PointMap([new Vector(0, 0)], 1,{
            strokeStyle: '#A0522D'
        });
        this.boardTree.addShape(pointMap);
        this.treeUpAnimation = new Linear(new Vector(1, 0), {duration: 6000});
        this.treeUpAnimation.addStatusListener((status: number) => {
            const ifsTree = this.createTree(status, status);
            pointMap.updateWithNewPoint(ifsTree.pointList);
            this.boardTree.paintAll();
        });
        this.treeUpAnimation.forward()
    }

    public createLeaf() {
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
        ifs.addChangeMatrix(new Matrix([[1,0,800], [0,1,100],[0,0,1]]))
        ifs.startLoop();

        const pointMap = new PointMap(ifs.pointList, 1,{
            fillStyle: '#000',
            strokeStyle: '#000'
        });
        this.board.addShape(pointMap);
        this.board.paintAll();
    }

    public createTreePath(start: Vector, angle: number, length: number, depth: number, branchWidth: number, maxBranch: number = 3) {
        const maxAngle = Math.PI / 2;
        const end = new Vector(start.x + length * Math.cos(angle), start.y + length * Math.sin(angle))
        this.pathList.push({
            start: start,
            end,
            lineWidth: branchWidth,
            color: depth <= 3 ? '#27ae60' : '#2c3e50',
            isLeaf: depth <= 3
        })
        if (depth - 1 <= 0) {
            return;
        }
        const subBranches = (Math.random() * (maxBranch - 1)) + 1;
        for (let index = 0; index < subBranches; index++) {
            this.createTreePath(end.clone(),
                angle + Math.random() * maxAngle - maxAngle * 0.5,
                length * (0.7 + Math.random() * 0.3),
                depth - 1,
                branchWidth * 0.7);
        }
    }

    public createRain(duration: number, onFinish: Function) {
        const rainAnimation = new VariableSpeed(new Vector(-300, 400), new Vector(0, 98), {duration});
        const lineMap = new LineMap(new Vector(0, 0), new Vector(this.boardWidth * 2, this.boardHeight), {strokeStyle: '#1E90FF'});
        for (let index = 0; index < 500; index++) {
            const x = Math.random() * this.boardWidth * 2;
            const y = Math.random() * -2 * this.boardHeight;
            const height = Math.random() * 5 + 7;
            lineMap.addLine(new Vector(x, y), new Vector(x - 10, y + height));
        }
        this.board.addShape(lineMap);
        this.board.paintAll();
        rainAnimation.addShape(lineMap);
        rainAnimation.addEventListener((status: AnimationEvent) => {
            if (status === AnimationEvent.FORWARD) {
                this.board.removeShape(lineMap);
                onFinish();
            }
        })
        rainAnimation.forward();

    }

    public createLeafTree() {
        this.createTreePath(new Vector(this.boardWidth - 400, this.boardHeight - 60), -Math.PI / 2, 90, 11, 14);
        const dp = new DrawMap(new Vector(0, 0), new Vector(this.boardWidth * 2, this.boardHeight), {
            fillRange: false,
            strokeBorder: false
        });
        dp.drawOp((p: CanvasRenderingContext2D) => {
            for (let index = 0; index < this.pathList.length; index++) {
                const path = this.pathList[index];
                p.beginPath();
                if (path.lineWidth === 14) {
                    p.moveTo(path.start.x, path.start.y + 50);
                } else {
                    p.moveTo(path.start.x, path.start.y);
                }
                p.lineCap = 'round';
                p.lineWidth = path.lineWidth
                p.strokeStyle = path.color;
                p.lineTo(path.end.x, path.end.y);
                p.stroke();
            }
        });
        this.boardTree.addShape(dp);
        this.boardTree.paintAll();
    }

    public addSun(onFinish: Function) {
        const dp = new Rect(new Vector(-200, 1500), 40, {
            fillStyle: '#FFB90F',
            fillRange: true,
            shadowBlur: 20,
            shadowColor: '#FFB90F'
        });
        this.board.addShape(dp);
        this.board.paintAll();
        const l = new VariableSpeed(new Vector(133.33, -433.33), new Vector(0, 0), {duration: 3000});
        l.addShape(dp);
        l.addEventListener((status: AnimationEvent) => {
            if (status === AnimationEvent.FORWARD) {
                setTimeout(() => {
                    const ls = new VariableSpeed(new Vector(60, -150), new Vector(0, 0), {duration: 2000});
                    ls.addShape(dp);
                    ls.addEventListener((status: AnimationEvent) => {
                        if (status === AnimationEvent.FORWARD) {
                            this.board.removeShape(dp);
                            this.board.paintAll();
                            onFinish()
                        }
                    })
                    ls.forward();
                }, 3000);
            }
        });
        l.forward();
    }

    public snowPath: Array<ISnow> = [];

    public snowColor = '#FFFFFF05';

    public createSnow() {
        for (let index = 0; index < 10000; index++) {
            this.snowPath.push({
                position: new Vector(Math.random() * this.boardWidth, Math.random() * this.boardHeight),
                radius: Math.random() * 2,
                density: Math.random() * 10000,
            });
        }
    }

    public startRunSnow(duration: number, onFinish: Function) {
        this.createSnow();
        const pMap = new DrawMap(new Vector(), new Vector(this.boardWidth, this.boardHeight), {});
        pMap.drawOp((p: CanvasRenderingContext2D) => {
            for (let index = 0; index < this.snowPath.length; index++) {
                const snow = this.snowPath[index];
                p.fillStyle = this.snowColor;
                p.moveTo(snow.position.x, snow.position.y);
                p.arc(snow.position.x, snow.position.y, snow.radius, 0, Math.PI * 2, true);
            }
            p.fill();
        });
        this.boardSnow.addShape(pMap);
        this.boardSnow.paintAll();
        this.snowAnimation = new Linear(new Vector(1, 0), {duration});
        this.snowAnimation.addStatusListener((status: number) => {
            if (status > 0 && status <= 0.1) {
                const v = `${(Math.floor((status / 0.1) * 95))}`
                this.snowColor = '#FFFFFF' + (v.length === 1 ? `0${v}` : v);
            }
            if (status > 0.9) {
                const v = `${((Math.floor(((1 - status) / 0.1) * 95)))}`;
                this.snowColor = '#FFFFFF' + (v.length === 1 ? `0${v}` : v);
            }
            this.updateSnow();
            this.boardSnow.paintAll();
        })
        this.snowAnimation.addEventListener((e: AnimationEvent) => {
            if (e === AnimationEvent.FORWARD) {
                this.boardSnow.removeShape(pMap);
                this.boardSnow.paintAll();
                onFinish();
            }
        })
        this.snowAnimation.forward();
    }

    public angle: number = 0.005;

    public updateSnow() {
        this.angle += 0.005;
        for (let i = 0; i < this.snowPath.length; i++) {
            const snow = this.snowPath[i];
            snow.position.move(Math.sin(this.angle) * Math.PI / 10, Math.cos(snow.density) + snow.radius)
            if (snow.position.y > this.boardHeight) {
                this.snowPath[i] = {
                    ...snow,
                    position: new Vector(Math.random() * this.boardWidth, 0)
                }
            }
        }
    }

    public runBez(){
        const r = new Rect(new Vector(200,200),60, {fillStyle: 'red', fillRange: true});
        this.board.addShape(r);
        r.enableDrag();
        this.board.paintAll();
        const bez = new Bezier(new Vector(0.98, -0.53), new Vector(0.31,1.6), new Vector(400, 400), {duration: 4000});
        bez.addShape(r);
        bez.forward();
    }
}


window.onload = function () {
    // new Season().createLeaf();
    // new Season().updateTree();
    // new Season().runBez();
    new Season().run();
};
