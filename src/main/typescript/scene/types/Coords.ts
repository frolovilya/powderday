import {Point} from "./Point";

export default class Coords {

    constructor(private point: Point = {x: 0, y: 0},
                private parentCoords: Coords = null) {
    }

    public getPoint(scale: number = 1) {
        const parentPoint = this.parentCoords ? this.parentCoords.getPoint() : {x: 0, y: 0};

        return {
            x: parentPoint.x + this.point.x / scale,
            y: parentPoint.y + this.point.y / scale
        }
    }

    // public getParentCoords() {
    //     return this.parentCoords;
    // }

}