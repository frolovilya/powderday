import {Coords} from "scene/types/Coords";
import SceneLayer from "scene/SceneLayer";
import * as React from "react";
import Canvas from "../Canvas";

export default class Circle extends React.Component {

    props: {
        coords: Coords;
        radius: number;
        canvas: Canvas;
        parentCoords: Coords;
        scale: number;
    };

    getCoords() {
        return this.props.coords;
    }

    getRadius() {
        return this.props.radius;
    }

    render() {
        let context = this.props.canvas.getContext();

        context.beginPath();

        context.arc(
            this.props.parentCoords.x + this.props.coords.x / this.props.scale,
            this.props.parentCoords.y + this.props.coords.y / this.props.scale,
            this.props.radius,
            0, 2 * Math.PI, false
        );
        context.lineWidth = 2;
        context.strokeStyle = '#FFDBC9';
        context.stroke();

        context.closePath();

        return null;
    }

}