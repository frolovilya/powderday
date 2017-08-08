import {AbstractSceneObject} from "scene/AbstractSceneObject";
import Coords from "scene/types/Coords";
import * as React from "react";
import Canvas from "scene/Canvas";

export default class Circle extends AbstractSceneObject {

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

        const coords = this.props.coords.getPoint(this.props.scale);

        context.arc(
            // this.props.coords.parentCoords.x + this.props.coords.x / this.props.scale,
            // this.props.coords.parentCoords.y + this.props.coords.y / this.props.scale,
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