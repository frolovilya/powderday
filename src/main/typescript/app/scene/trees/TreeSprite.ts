import Coords from "scene/types/Coords";
import {Sprite} from "../../../scene/Sprite";
import Canvas from "../../../scene/Canvas";
import {Size} from "scene/types/Size";

export default class TreeSprite extends Sprite {

    props: {
        imageSrc: string;
        size: Size;
        treeResource: any;
        coords: Coords;
        canvas: Canvas;
        scale: number;
    };

    constructor(props) {
        super({
            ...props,
            imageSrc: props.treeResource.sprite.src,
            size: props.treeResource.sprite.size
        });
    }

    draw() {
        let context = this.props.canvas.getContext();

        const spriteCoords = this.props.coords.getPoint();

        context.beginPath();
        context.drawImage(
            this.image,
            spriteCoords.x,
            spriteCoords.y,
            this.props.size.width * this.props.scale,
            this.props.size.height * this.props.scale
        );
        context.closePath();
    }

}