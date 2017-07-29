import Sprite from "scene/Sprite";
import {Coords} from "scene/types/Coords";
import SceneLayer from "scene/SceneLayer";

export default class PlayerSprite extends Sprite {

    private positions: any;
    private position: number = 0;
    
    private rotateAngle: number = 0;

    getPositions(): object {
        return this.positions;
    }
    setPositions(value: object) {
        this.positions = value;
    }

    getPosition(): number {
        return this.position;
    }
    setPosition(value: number) {
        this.position = value;
    }
    
    rotate(angle: number) {
        this.rotateAngle = angle;
    }

    protectedDraw(layer: SceneLayer, parentCoords: Coords, scale: number = 1) {
        let context = layer.getCanvas().getContext();

        // set new position
        if(this.rotateAngle > 30 && this.rotateAngle < 75 && this.position != this.positions.frontRight) {
            this.position = this.positions.frontRight;
            layer.getCanvas().clearTransform();

        } else if(this.rotateAngle >= 75 && this.position != this.positions.right) {
            this.position = this.positions.right;
            layer.getCanvas().clearTransform();

        } else if(this.rotateAngle < -30 && this.rotateAngle > -75 && this.position != this.positions.frontLeft) {
            this.position = this.positions.frontLeft;
            layer.getCanvas().clearTransform();

        } else if(this.rotateAngle <= -75 && this.position != this.positions.left) {
            this.position = this.positions.left;
            layer.getCanvas().clearTransform();

        } else if(this.rotateAngle <= 30 && this.rotateAngle >= -30 && this.position != this.positions.front) {
            this.position = this.positions.front;
            layer.getCanvas().clearTransform();
            context.rotate(this.rotateAngle * 3.14/180 / 2);
        }

        if(this.rotateAngle < 90 && this.rotateAngle > -90)
            context.rotate((<any>window).playerRotateAngleDelta * 3.14/180 / 2);

        // draw player
        context.beginPath();
        context.drawImage(
            this.image, // image
            this.position, // crop x
            0, // crop y
            this.getSize().width, // crop width
            this.image.height, // crop height
            parentCoords.x, // canvas x
            parentCoords.y, // canvas y
            this.getSize().width / scale, // image width
            this.getSize().height / scale // image height
        );
        context.closePath();
    }


}