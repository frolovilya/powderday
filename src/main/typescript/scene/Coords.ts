import {Point} from "scene/types/Point";

export default class Coords {

    constructor(private point: Point = {x: 0, y: 0},
                private parentCoords: Coords = null,
                private scale: number = 1) {
    }

    public getPoint() {
        const parentPoint = this.parentCoords ? this.parentCoords.getPoint() : {x: 0, y: 0};

        return {
            x: parentPoint.x + this.point.x * this.scale,
            y: parentPoint.y + this.point.y * this.scale
        }
    }

    public getAbsolutePoint(layerTranslation: Point) {
        const coords = this.getPoint();

        return {
            x: coords.x + layerTranslation.x,
            y: coords.y + layerTranslation.y
        }
    }

}