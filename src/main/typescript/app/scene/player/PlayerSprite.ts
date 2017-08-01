import {Coords} from "scene/types/Coords";
import SceneLayer from "scene/SceneLayer";
import {Size} from "scene/types/Size";
import {Sprite} from "../../../scene/Sprite";
import PlayerResource from "app/resources/PlayerObjectConfig"
import Canvas from "../../../scene/Canvas";

export default class PlayerSprite extends Sprite {

    props: {
        coords: Coords;
        canvas: Canvas;
        rotateAngle: number;
        scale: number;
    };

    state: {
        imageLoaded: boolean;
    };

    private positions: any;

    constructor(props) {
        super(props);

        this.positions = PlayerResource.sprite.positions;

        this.initImage(PlayerResource.sprite.src, PlayerResource.sprite.size);
    }

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
            // context.rotate(this.props.rotateAngle * 3.14/180 / 2);
        }

        // console.log("getPosition", this.props.rotateAngle, position);

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

        // if(this.props.rotateAngle < 90 && this.props.rotateAngle > -90) {
        //     // context.rotate((<any>window).playerRotateAngleDelta * 3.14 / 180 / 2);
        //     //context.rotate(this.rotateAngle * 3.14 / 180 / 2);
        // }

        // draw player
        context.beginPath();
        context.drawImage(
            this.image, // image
            position, // crop x
            0, // crop y
            this.getSize().width, // crop width
            this.image.height, // crop height
            this.props.coords.x, // canvas x
            this.props.coords.y, // canvas y
            this.getSize().width / this.props.scale, // image width
            this.getSize().height / this.props.scale // image height
        );
        context.closePath();
    }


}