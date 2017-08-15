import {Point} from "scene/types/Point";

export default class Coords {

    constructor(private point: Point = {x: 0, y: 0},
                private parentCoords: Coords = null,
                private scale: number = 1) {
    }

    /**
     * Get coords relative to Canvas
     *
     * @returns {{x: number, y: number}}
     */
    public getPoint(): Point {
        const parentPoint = this.parentCoords ? this.parentCoords.getPoint() : {x: 0, y: 0};

        return {
            x: Math.round(parentPoint.x + this.point.x * this.scale),
            y: Math.round(parentPoint.y + this.point.y * this.scale)
        }
    }

    /**
     * Get absolute coords
     *
     * @param canvasTranslation - Canvas translation
     * @returns {{x: number, y: number}}
     */
    public getAbsolutePoint(canvasTranslation: Point): Point {
        const coords = this.getPoint();

        return {
            x: coords.x + canvasTranslation.x,
            y: coords.y + canvasTranslation.y
        }
    }

}