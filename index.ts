
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
        const ifs = new IFS(new Vector(1000,100),90000);
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
            fillStyle: '#000',
            strokeStyle: '#000'
        });
        board.addShape(pointMap);
        board.paintAll();

    }
}


//x(n+1）= 0;
// y(n+1) = 0.16 * y(n)    0.01

// x(n+1) = 0.2 * x(n) − 0.26 * y(n);
// y(n+1) = 0.23 * x(n) + 0.22 * y(n) + 1.6  0.07

// x(n+1) = −0.15 * x(n) + 0.28 * y(n);
// y(n+1) = 0.26 * x(n) + 0.24 * y(n) + 0.44    0.07

// x(n+1) = 0.85 * x(n) + 0.04 * y(n);
// y(n+1) = −0.04 * x(n) + 0.85 * y(n) + 1.6  0.85



// class IFSTree : public FractalEquation { public: IFSTree() { m_StartX = 0.0f; m_StartY = 0.0f; m_StartZ = 0.0f; //'IFS码赋值
//     m[0][0] = 0.195f;  m[0][1] =-0.488f; m[0][2] = 0.344f; m[0][3] = 0.433f; m[0][4] = 0.4431f; m[0][5] = 0.2452f; m[0][6] = 0.25f; m[1][0] = 0.462f;  m[1][1] = 0.414f; m[1][2] =-0.252f; m[1][3] = 0.361f; m[1][4] = 0.2511f; m[1][5] = 0.5692f; m[1][6] = 0.25f; m[2][0] =-0.058f;  m[2][1] =-0.07f;  m[2][2] = 0.453f; m[2][3] =-0.111f; m[2][4] = 0.5976f; m[2][5] = 0.0969f; m[2][6] = 0.25f; m[3][0] =-0.035f;  m[3][1] = 0.07f;  m[3][2] =-0.469f; m[3][3] =-0.022f; m[3][4] = 0.4884f; m[3][5] = 0.5069f; m[3][6] = 0.2f; m[4][0] =-0.637f;  m[4][1] = 0.0f;   m[4][2] = 0.0f;   m[4][3] = 0.501f; m[4][4] = 0.8562f; m[4][5] = 0.2513f; m[4][6] = 0.05f; } void IterateValue(float x, float y, float z, float& outX, float& outY, float& outZ) const { float a, b, c, d, e, f;    //'仿射变幻中的系数
//
//     float R = (float)rand()/RAND_MAX; if (R <= m[0][6]) { a = m[0][0]; b = m[0][1]; c = m[0][2]; d = m[0][3]; e = m[0][4]; f = m[0][5]; } else if (R <= m[0][6] + m[1][6]) { a = m[1][0]; b = m[1][1]; c = m[1][2]; d = m[1][3]; e = m[1][4]; f = m[1][5]; } else if (R <= m[0][6] + m[1][6] + m[2][6]) { a = m[2][0]; b = m[2][1]; c = m[2][2]; d = m[2][3]; e = m[2][4]; f = m[2][5]; } else if (R <= m[0][6] + m[1][6] + m[2][6] + m[3][6]) { a = m[3][0]; b = m[3][1]; c = m[3][2]; d = m[3][3]; e = m[3][4]; f = m[3][5]; } else { a = m[4][0]; b = m[4][1]; c = m[4][2]; d = m[4][3]; e = m[4][4]; f = m[4][5]; } outX = a*x + b*y + e; outY = c*x + d*y + f; outZ = z; } private: float m[5][7];      // '存放IFS码
// };


window.onload = function () {
    new Season().run();
//     const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
//     const context = canvas.getContext('2d');
//
//     var width = 1200;
//     var height = 800;
//     canvas.width = width;
//     canvas.height = height;
//     var matrices = [
//         //pattern1
//         // { sx: 1, sy: .76, t: 6, e: .1, f: .62, p: 0.9 },
//         // { sx: .79, sy: .7, t: 2.34, e: 0.41, f: -1, p: 0.1 }
//
//         //pattern2
//         { sx: .9, sy: .94, t: 5.7, e: .01, f: .62, p: .94 },
//         { sx: .28, sy: .7, t: 2.9, e: .5, f: -1, p: .1 }
//
//         //pattern3
//         // {
//         //     sx: .28,
//         //     sy: .83,
//         //     t: 2.3,
//         //     e: .57,
//         //     f: 0,
//         //     p: .18
//         // }, {
//         //     sx: .8,
//         //     sy: .74,
//         //     t: 5.7,
//         //     e: .46,
//         //     f: .76,
//         //     p: .42
//         // }
//     ];
//
//     var mLength = matrices.length,
//         density = 100;
//
//     var x = 0,
//         y = 0;
//
// // @ts-ignore
//     context.translate(width / 2, height / 2);
//
//     iterate();
//
//     function iterate() {
//         x = y = 0;
//         // @ts-ignore
//         context.clearRect(-width / 2, -height / 2, width, height);
//         for (var i = 0; i < 80000; i++) {
//             var m = getRule(),
//                 // @ts-ignore
//                 x1 = x * m.sx * Math.cos(m.t) + y * m.sy * Math.sin(m.t) + m.e,
//                 // @ts-ignore
//                 y1 = -x * m.sx * Math.sin(m.t) + y * m.sy * Math.cos(m.t) + m.f;
//
//             x = x1;
//             y = y1;
//
//             // context.fillStyle = "rgb("+ (Math.round(y * 30) + 100)  + "," + (150 - Math.round(y * 70)) + "," + (250 - Math.round(y * 70)) + ")";
//             // @ts-ignore
//             context.fillStyle = "#000";
//             // @ts-ignore
//             context.fillRect(x * density, -y * density, 1, 1);
//         }
//         // @ts-ignore
//         context.save();
//     }
//
//
//     function getRule() {
//         var total = 0,
//             m;
//         for (var i = 0; i < mLength; i++) {
//             m = matrices[i];
//             total += m.p;
//         }
//         var rand = Math.random() * total;
//
//         for (var i = 0; i < mLength; i++) {
//             m = matrices[i];
//             if (rand < m.p) {
//                 return m;
//             }
//             rand -= m.p;
//         }
//     }
};
