/*
 * Trees
 */
import SceneIntersectionsPoint from "../framework/SceneIntersectionsPoint";
import {SceneObject} from "../framework/SceneObject";

export default class TreeObject implements SceneObject {
    
    private image;
    
    private pos;
    
    public width;
    
    private height;
    
    private ratio;
    
    private scaleNum;

    private point;

    constructor(treeResource, posX, posY) {
        this.image = new Image();
        this.image.src = treeResource.src;

        this.pos = {
            x: posX,
            y: posY
        }

        // sprite size
        //this.width = this.image.width;
        //this.height = this.image.height;
        //this.ratio = this.image.width / this.image.height;
        this.width = treeResource.size.width;
        this.height = treeResource.size.height;
        this.ratio = this.width / this.height;

        // resize sprite
        this.scaleNum = 1;

        // intersection point
        this.point = treeResource.point;
    }

    scale(scaleNum) {
        this.scaleNum = scaleNum;
        this.width = this.width / scaleNum;
        this.height = this.height / scaleNum;
    };

    isPointVisible(layer, x, y) {
        return ( x > 0 && x < layer.scene.getWidth()
        && y > 0 && y < layer.scene.getHeight() );
    }

    render(layer) {
        var ctx = layer.ctx;

        // draw circle
        ctx.beginPath();
        var iPoint = SceneIntersectionsPoint.toLayerCoords(this.point, this.pos, this.scaleNum);
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

        // draw image
        ctx.beginPath();
        ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);
        ctx.closePath();
    }

    isVisible(layer) {
        var topX = layer.translation.x + this.pos.x;
        var topY = layer.translation.y + this.pos.y;

        return ( this.isPointVisible(layer, topX, topY)
        || this.isPointVisible(layer, topX + this.width, topY)
        || this.isPointVisible(layer, topX, topY + this.height)
        || this.isPointVisible(layer, topX + this.width, topY + this.height) );
    }

    isActual(layer) {
        return layer.translation.y + this.pos.y + this.height > 0;
    }

    getIntersectionPoints(layer) {
        var absolutePoint = SceneIntersectionsPoint.toAbsoluteCoords(layer, this.point, this.pos, this.scaleNum);
        absolutePoint.type = "circle";
        absolutePoint._class = "tree";

        return [absolutePoint];
    }

}