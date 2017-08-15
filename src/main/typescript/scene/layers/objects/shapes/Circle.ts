import Coords from "scene/Coords";
import Canvas from "scene/layers/Canvas";
import Shape from "scene/layers/objects/shapes/Shape";

/**
 * Circle Shape
 */
export default class Circle extends Shape {

    props: {
        coords: Coords; // circle center relative (to parent) coords
        radius: number; // circle radius
        canvas: Canvas;
        scale: number;
    };

    getRadius() {
        return this.props.radius;
    }

    /**
     * Draw circle
     */
    transform() {
        let context = this.props.canvas.getContext();
        let coords = this.props.coords.getPoint();

        context.beginPath();

        context.arc(
            coords.x,
            coords.y,
            this.props.radius,
            0, 2 * Math.PI, false
        );
        context.lineWidth = 2;
        context.strokeStyle = '#FFDBC9';
        context.stroke();

        context.closePath();
    }

    getVisibilityPoints() {
        let center = this.props.coords.getPoint();
        let radius = this.props.radius;

        return [
                {x: center.x, y: center.y - radius},
                {x: center.x + radius, y: center.y},
                {x: center.x, y: center.y + radius},
                {x: center.x - radius, y: center.y}
            ];
    }

}