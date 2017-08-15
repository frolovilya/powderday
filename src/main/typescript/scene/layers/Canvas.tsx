import * as React from "react";
import {Size} from "scene/types/Size";
import {Point} from "scene/types/Point";

/**
 * HTML5 <canvas> element wrapped as React Component.
 *
 * Provides additional canvas transformation methods.
 */
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

    getElement(): HTMLCanvasElement {
        return this.canvas;
    }

    getContext() {
        return this.renderingContext;
    }

    /**
     * Canvas should never be updated normally.
     * All updates are handler by layer objects.
     *
     * @returns {boolean}
     */
    shouldComponentUpdate() {
        return false;
    }

    /**
     * Clear displayed canvas rect
     */
    clear() {
        this.renderingContext.save();
        this.renderingContext.setTransform(1, 0, 0, 1, 0, 0);
        this.renderingContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderingContext.restore();
    }

    /**
     * Translate canvas coords.
     * Same as moving canvas.
     *
     * @param point delta X, delta Y to move canvas to
     */
    translate(point: Point) {
        this.translation.x += point.x;
        this.translation.y += point.y;

        this.renderingContext.translate(point.x, point.y);
    }

    /**
     * Translate (move) canvas to initial position
     */
    clearTranslation() {
        this.translate({
            x: -this.translation.x,
            y: -this.translation.y
        })
    }

    getTranslation() {
        return this.translation;
    }

    /**
     * Clear all canvas trasformations
     */
    clearTransform() {
        this.renderingContext.setTransform(1, 0, 0, 1, this.translation.x, this.translation.y);
    }

    /**
     * Check that point with given coords is visible on the screen at this moment.
     *
     * @param point point to check
     * @returns {boolean} true if visible, false otherwise
     */
    isPointVisible(point: Point) {
        let x = point.x + this.translation.x;
        let y = point.y + this.translation.y;

        return ( x > 0 && x < this.props.size.width
        && y > 0 && y < this.props.size.height );
    }

    render() {
        return <canvas id={this.props.layerId}
                                           className="translate3d"
                                           style={{zIndex: this.props.zIndex}}
                                           width={this.props.size.width}
                                           height={this.props.size.height}
                       ref={(node) => { this.canvas = this.canvas || node; }} />
    }

}