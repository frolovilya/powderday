import {SceneObject} from "../framework/SceneObject";
import SceneIntersectionsPoint from "../framework/SceneIntersectionsPoint";

export default class PlayerObject implements SceneObject {

    private image;

    private spriteWidth: number;

    private positions;
    private position: number;

    private width;
    private height;
    private scaleNum;

    private pos;

    private point;

    constructor(playerResource) {
        this.image = new Image();
        this.image.src = playerResource.src;

        this.spriteWidth = playerResource.spriteWidth;
        // sprite positions
        this.positions = playerResource.positions;
        this.position = 0;

        // single sprite size
        this.width = 80;
        this.height = 80;
        this.scaleNum = this.spriteWidth / this.width;

        this.pos = {
            x: -this.width / 2,
            y: -this.height / 2
        };

        // player rotation
        (<any>window).playerRotateAngle = 0;

        // intersection point
        this.point = playerResource.point;
    }

    // reset layer transformations
    private clearTransform(layer) {
        layer.ctx.setTransform(1, 0, 0, 1, 0, 0);
        layer.ctx.translate(
            layer.canvas.width / 2,
            layer.canvas.height / 2
        );
    }

    render(layer) {
        let ctx = layer.ctx;
        let ra = (<any>window).playerRotateAngle;

        layer.clear();

        /*ctx.beginPath();
         ctx.moveTo(0, -50);
         ctx.lineTo(0, 50);
         ctx.stroke();
         ctx.closePath();*/

        // draw circle
        ctx.beginPath();
        let iPoint = SceneIntersectionsPoint.toLayerCoords(this.point, this.pos, this.scaleNum);
        ctx.arc(
            iPoint.x,
            iPoint.y,
            iPoint.radius,
            0, 2 * Math.PI, false
        );
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FFDBC9';
        ctx.stroke();
        ctx.closePath();

        // set new position
        if(ra > 30 && ra < 75 && this.position != this.positions.frontRight) {
            this.position = this.positions.frontRight;
            this.clearTransform(layer);

        } else if(ra >= 75 && this.position != this.positions.right) {
            this.position = this.positions.right;
            this.clearTransform(layer);

        } else if(ra < -30 && ra > -75 && this.position != this.positions.frontLeft) {
            this.position = this.positions.frontLeft;
            this.clearTransform(layer);

        } else if(ra <= -75 && this.position != this.positions.left) {
            this.position = this.positions.left;
            this.clearTransform(layer);

        } else if(ra <= 30 && ra >= -30 && this.position != this.positions.front) {
            this.position = this.positions.front;
            this.clearTransform(layer);
            ctx.rotate(ra * 3.14/180 / 2);
        }

        if(ra < 90 && ra > -90)
            ctx.rotate((<any>window).playerRotateAngleDelta * 3.14/180 / 2);

        // draw player
        ctx.beginPath();
        ctx.drawImage(
            this.image, // image
            this.position, // crop x
            0, // crop y
            this.spriteWidth, // crop width
            this.image.height, // crop height
            this.pos.x, // canvas x
            this.pos.y, // canvas y
            this.width, // image width
            this.height // image height
        );
        ctx.closePath();
    }

    getIntersectionPoints(layer) {
        let absolutePoint = SceneIntersectionsPoint.toAbsoluteCoords(layer, this.point, this.pos, this.scaleNum);
        absolutePoint.type = "circle";
        absolutePoint._class = "player";

        return [absolutePoint];
    }

    isVisible(layer) {
        return true;
    }

    isActual(layer) {
        return true;
    }

}