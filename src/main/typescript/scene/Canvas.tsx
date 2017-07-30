import * as React from "react";
import {Size} from "./types/Size";
import SceneLayer from "./SceneLayer";
import {SceneObject} from "./SceneObject";
import {Coords} from "scene/types/Coords";

export default class Canvas extends React.Component {

    props: {
        layerId: string,
        zIndex: number;
        size: Size;
        children: any;
    };

    private translation: Coords;

    private canvas: HTMLCanvasElement;
    private renderingContext: CanvasRenderingContext2D;

    constructor(props) {
        super(props);

        this.translation = {
            x: 0,
            y: 0
        }
    }

    componentDidMount() {
        this.renderingContext = this.canvas.getContext("2d");
    }

    clear() {
        this.renderingContext.save();
        this.renderingContext.setTransform(1, 0, 0, 1, 0, 0);
        this.renderingContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderingContext.restore();
    }

    translate(coords: Coords) {
        this.translation.x += coords.x;
        this.translation.y += coords.y;

        this.renderingContext.translate(coords.x, coords.y);
    }

    getTranslation() {
        return this.translation;
    }

    clearTransform() {
        this.renderingContext.setTransform(1, 0, 0, 1, 0, 0);
        /*this.translate(
         this.canvas.width / 2,
         this.canvas.height / 2
         );*/
        this.translation.x = this.canvas.width / 2;
        this.translation.y = this.canvas.height / 2;

        this.renderingContext.translate(this.translation.x, this.translation.y);
        /*layer.renderingContext.translate(
         layer.canvas.width / 2,
         layer.canvas.height / 2
         );*/
    }

    render() {
        return <canvas id={this.props.layerId}
                                           className="translate3d"
                                           style={{zIndex: this.props.zIndex}}
                                           width={this.props.size.width}
                                           height={this.props.size.height}
                       ref={(node) => { this.canvas = this.canvas || node; }}>{this.props.children}</canvas>
    }

    getElement() {
        return this.canvas;
    }

    getContext() {
        return this.renderingContext;
    }

}