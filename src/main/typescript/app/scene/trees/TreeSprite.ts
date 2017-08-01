import {Coords} from "scene/types/Coords";
import SceneLayer from "scene/SceneLayer";
import {Sprite} from "../../../scene/Sprite";
import Canvas from "../../../scene/Canvas";

export default class TreeSprite extends Sprite {

    props: {
        treeResource: any;
        coords: Coords;
        canvas: Canvas;
        scale: number;
    };

    constructor(props) {
        super(props);

        this.initImage(this.props.treeResource.sprite.src, this.props.treeResource.sprite.size);
    }

    draw() {
        let context = this.props.canvas.getContext();

        context.beginPath();
        context.drawImage(
            this.image,
            this.props.coords.x,
            this.props.coords.y,
            this.size.width / this.props.scale,
            this.size.height / this.props.scale
        );
        context.closePath();
    }

}