/*
 * Trees
 */
import {SceneObject} from "../scene/SceneObject";
import Circle from "../scene/intersections/points/Circle";
import SceneLayer from "../scene/SceneLayer";

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

    render(layer: SceneLayer) {
        var ctx = layer.context;

        // draw circle
        ctx.beginPath();
        var iPoint = Circle.toLayerCoords(this.point, this.pos, this.scaleNum);
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

    isVisible(layer: SceneLayer) {
        var topX = layer.translation.x + this.pos.x;
        var topY = layer.translation.y + this.pos.y;

        return ( layer.isPointVisible(topX, topY)
            || layer.isPointVisible(topX + this.width, topY)
            || layer.isPointVisible(topX, topY + this.height)
            || layer.isPointVisible(topX + this.width, topY + this.height) );
    }

    isActual(layer: SceneLayer) {
        return layer.translation.y + this.pos.y + this.height > 0;
    }

    getIntersectionPoints(layer: SceneLayer) {
        var absolutePoint = Circle.toAbsoluteCoords(layer, this.point, this.pos, this.scaleNum);
        absolutePoint.className = "tree";

        return [absolutePoint];
    }

}