import Coords from "scene/Coords";
import {Sprite} from "scene/layers/objects/sprites/Sprite";
import Canvas from "scene/layers/Canvas";
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
        let spriteCoords = this.props.coords.getPoint();

        context.beginPath();
        context.drawImage(
            this.image,
            spriteCoords.x,
            spriteCoords.y,
            Math.round(this.props.size.width * this.props.scale),
            Math.round(this.props.size.height * this.props.scale)
        );
        context.closePath();
    }

}