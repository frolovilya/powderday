import {Coords} from "scene/types/Coords";
import SceneLayer from "scene/SceneLayer";

export default class Circle {

    // public className;

    private coords: Coords;
    private radius: number;

    constructor(centerCoords: Coords, radius: number) {
        this.coords = centerCoords;
        this.radius = radius;
    }

    getCoords() {
        return this.coords;
    }

    getRadius() {
        return this.radius;
    }

    draw(layer: SceneLayer, parentCoords: Coords, scale: number = 1) {
        let context = layer.getContext();

        context.beginPath();

        context.arc(
            parentCoords.x + this.coords.x / scale,
            parentCoords.y + this.coords.y / scale,
            this.radius,
            0, 2 * Math.PI, false
        );
        context.lineWidth = 2;
        context.strokeStyle = '#FFDBC9';
        context.stroke();

        context.closePath();
    }

}