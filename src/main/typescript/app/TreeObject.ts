/*
 * Trees
 */
import {SceneObject} from "../scene/SceneObject";
import SceneLayer from "../scene/SceneLayer";
import Sprite from "../scene/Sprite";
import {Coords} from "../scene/types/Coords";
import Circle from "../scene/shapes/Circle";
import {SceneObjectConfig} from "../scene/types/SceneObjectConfig";
import TreeSprite from "./TreeSprite";

export default class TreeObject implements SceneObject {

    private sprite: TreeSprite;

    private shape: Circle;
    
    //private image;
    
    private position: Coords;
    
    //public width;
    
    //private height;
    
    //private ratio;
    
    private scaleNum;

    //private point;

    constructor(treeResource: SceneObjectConfig, position: Coords) {
        //this.image = new Image();
        //this.image.src = treeResource.src;

        this.sprite = new TreeSprite(treeResource.sprite.src, treeResource.sprite.size);

        this.shape = new Circle(treeResource.shape.coords, treeResource.shape.radius);

        this.position = position;

        this.scaleNum = 1;

        // sprite size
        //this.width = treeResource.size.width;
        //this.height = treeResource.size.height;
        //this.ratio = this.width / this.height;

        // resize sprite
        //this.scaleNum = 1;

        // intersection point
        //this.point = treeResource.point;
    }

    scale(scaleNum) {
        this.scaleNum = scaleNum;
        /*this.width = this.width / scaleNum;
        this.height = this.height / scaleNum;*/

        //this.sprite.scale(scaleNum);
        //this.shape.scale(scaleNum);
    };

    render(layer: SceneLayer) {
        this.drawCircle(layer.context);
        this.drawTreeImage(layer.context);
    }

    private drawCircle(context: CanvasRenderingContext2D) {
        /*context.beginPath();
        let iPoint = Circle.toLayerCoords(this.point, this.position, this.scaleNum);
        context.arc(
            iPoint.x,
            iPoint.y,
            iPoint.radius,
            0, 2 * Math.PI, false
        );
        context.lineWidth = 2;
        context.strokeStyle = '#FFDBC9';
        context.stroke();
        context.closePath();*/

        this.shape.draw(context, this.position, this.scaleNum)
    }

    private drawTreeImage(context: CanvasRenderingContext2D) {
        this.sprite.draw(context, this.position, this.scaleNum);
    }

    isVisible(layer: SceneLayer) {
        let topX = layer.translation.x + this.position.x;
        let topY = layer.translation.y + this.position.y;

        return ( layer.isPointVisible(topX, topY)
            || layer.isPointVisible(topX + this.sprite.getSize().width, topY)
            || layer.isPointVisible(topX, topY + this.sprite.getSize().height)
            || layer.isPointVisible(topX + this.sprite.getSize().width, topY + this.sprite.getSize().height) );
    }

    isActual(layer: SceneLayer) {
        return layer.translation.y + this.position.y + this.sprite.getSize().height > 0;
    }

    getIntersectionPoints(layer: SceneLayer) {
        let absolutePoint = Circle.toAbsoluteCoords(layer, this.shape, this.position, this.scaleNum);
        absolutePoint.className = "tree";

        return [absolutePoint];
    }

}