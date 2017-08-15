import Coords from "scene/Coords";
import {Size} from "scene/types/Size";
import {Sprite} from "scene/layers/objects/sprites/Sprite";
import PlayerResource from "app/game/scene/resources/PlayerObjectConfig"
import Canvas from "scene/layers/Canvas";

export default class PlayerSprite extends Sprite {

    props: {
        imageSrc: string;
        size: Size;
        coords: Coords;
        canvas: Canvas;
        rotateAngle: number;
        scale: number;
    };

    private positions: any; // sprite positions (offsetX)

    constructor(props) {
        super({
            ...props,
            imageSrc: PlayerResource.sprite.src,
            size: PlayerResource.sprite.size
        });

        this.positions = PlayerResource.sprite.positions;
    }

    /**
     * Get sprite position (offsetX) based on current player rotation angle
     *
     * @returns {number}
     */
    private getPosition = () => {
        let position = 0;

        if(this.props.rotateAngle > 30 && this.props.rotateAngle < 75) {
            position = this.positions.frontRight;

        } else if(this.props.rotateAngle >= 75) {
            position = this.positions.right;

        } else if(this.props.rotateAngle < -30 && this.props.rotateAngle > -75) {
            position = this.positions.frontLeft;

        } else if(this.props.rotateAngle <= -75) {
            position = this.positions.left;

        } else if(this.props.rotateAngle <= 30 && this.props.rotateAngle >= -30) {
            position = this.positions.front;
        }

        return position;
    };

    draw() {
        let canvas = this.props.canvas;
        let context = canvas.getContext();

        canvas.clearTransform();

        let position = this.getPosition();
        if(position == this.positions.front) {
            context.rotate(this.props.rotateAngle * 3.14/180 / 2);
        }

        let point = this.props.coords.getPoint();

        // draw player
        context.beginPath();
        context.drawImage(
            this.image, // image
            position, // crop x
            0, // crop y
            this.props.size.width, // crop width
            this.image.height, // crop height
            point.x, // canvas x
            point.y, // canvas y
            Math.round(this.props.size.width * this.props.scale), // image width
            Math.round(this.props.size.height * this.props.scale) // image height
        );
        context.closePath();
    }


}