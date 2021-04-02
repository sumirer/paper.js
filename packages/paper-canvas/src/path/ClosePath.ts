import {Matrix, Vector} from "@paper.js/paper-core/lib";

interface ITransform {
    operationCenter: Vector;
    matrix: Matrix;
}


export class ClosePath {

    public path = [];

    public drawPath = [];

    public transformList: Array<ITransform> = [];

    /**
     * add matrix to change closePath, you must set "operationCenter" point
     * @param transfer
     */
    public transform(transfer: Array<ITransform> | ITransform) {
        if (Array.isArray(transfer)) {
            this.transformList = transfer;
        } else {
            this.transformList = [transfer];
        }
    }

    updatePath() {

    }

    /**
     * get point before matrix transform
     * @param v
     */
    private getTransformPath(v: Vector) {
        let nv = v.clone();
        this.transformList.forEach(operation => {
            nv = Vector.fromMatrix(operation.matrix.multiply(nv.reduceWith(operation.operationCenter).toMatrix()));
        });
        return nv
    }

}
