import {Coords} from "../types/Coords";
import SceneLayer from "../SceneLayer";

export default class Circle {

    public className;

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

    static checkCircles(c1: Circle, c2: Circle): boolean {
        let distance = Math.sqrt(
            Math.pow(c2.getCoords().x - c1.getCoords().x, 2)
            + Math.pow(c2.getCoords().y - c1.getCoords().y, 2)
        );

        return distance <= (c1.getRadius() + c2.getRadius());
    }

    static toLayerCoords(circle: Circle, spritePosition, spriteScale: number) {
        let relativeCoords = {
            x: spritePosition.x + circle.getCoords().x / spriteScale,
            y: spritePosition.y + circle.getCoords().y / spriteScale
        };
        let radius = circle.getRadius();

        return new Circle(relativeCoords, radius);
    }

    static toAbsoluteCoords(layer, circle: Circle, spritePosition, spriteScale) {
        let relativeCircle = Circle.toLayerCoords(circle, spritePosition, spriteScale);

        let absoluteCoords = {
            x: relativeCircle.getCoords().x + layer.translation.x,
            y: relativeCircle.getCoords().y + layer.translation.y
        };

        let radius = circle.getRadius();

        return new Circle(absoluteCoords, radius);
    }

}