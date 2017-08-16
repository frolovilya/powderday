import {AbstractLayerObject} from "scene/layers/objects/AbstractLayerObject";
import Canvas from "scene/layers/Canvas";
import Coords from "scene/Coords";

export default class Score extends AbstractLayerObject {

    props: {
        coords: Coords;
        canvas: Canvas;
        score: number;
    };

    constructor(props) {
        super({
            ...props,
            checkVisibility: false
        })
    }

    transform() {
        this.getCanvas().clear();

        if(this.props.score > 0) {
            let context = this.getCanvas().getContext();

            context.fillStyle = "#555555";
            context.font = "bold 20pt Arial";

            context.fillText(this.props.score.toString(), 10, 45);
        }
    }

}