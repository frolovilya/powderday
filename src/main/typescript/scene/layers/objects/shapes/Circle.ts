import Coords from "scene/Coords";
import Canvas from "scene/layers/Canvas";
import Shape from "./Shape";

export default class Circle extends Shape {

    props: {
        coords: Coords;
        radius: number;
        canvas: Canvas;
        scale: number;
    };

    getCoords() {
        return this.props.coords;
    }

    getRadius() {
        return this.props.radius;
    }

    transform() {
        let context = this.props.canvas.getContext();

        context.beginPath();

        const coords = this.props.coords.getPoint();

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

}