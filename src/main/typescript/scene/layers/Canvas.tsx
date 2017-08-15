import * as React from "react";
import {Size} from "scene/types/Size";
import {Point} from "scene/types/Point";

export default class Canvas extends React.Component {

    props: {
        layerId: string,
        zIndex: number;
        size: Size;
    };

    private translation: Point;

    private canvas: HTMLCanvasElement;
    private renderingContext: CanvasRenderingContext2D;

    constructor(props) {
        super(props);

        this.translation = {
            x: 0,
            y: 0
        };
    }

    componentDidMount() {
        this.renderingContext = this.canvas.getContext("2d");
    }
    
    shouldComponentUpdate() {
        return false;
    }

    clear() {
        this.renderingContext.save();
        this.renderingContext.setTransform(1, 0, 0, 1, 0, 0);
        this.renderingContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderingContext.restore();
    }

    translate(point: Point) {
        this.translation.x += point.x;
        this.translation.y += point.y;

        this.renderingContext.translate(point.x, point.y);
    }

    clearTranslation() {
        this.translate({
            x: -this.translation.x,
            y: -this.translation.y
        })
    }

    getTranslation() {
        return this.translation;
    }

    clearTransform() {
        this.renderingContext.setTransform(1, 0, 0, 1, this.translation.x, this.translation.y);
    }

    render() {
        return <canvas id={this.props.layerId}
                                           className="translate3d"
                                           style={{zIndex: this.props.zIndex}}
                                           width={this.props.size.width}
                                           height={this.props.size.height}
                       ref={(node) => { this.canvas = this.canvas || node; }} />
    }

    getElement() {
        return this.canvas;
    }

    isPointVisible(point: Point) {
        let x = point.x + this.translation.x;
        let y = point.y + this.translation.y;

        return ( x > 0 && x < this.props.size.width
                && y > 0 && y < this.props.size.height );
    }

    getContext() {
        return this.renderingContext;
    }

}