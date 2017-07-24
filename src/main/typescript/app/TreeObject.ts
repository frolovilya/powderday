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
    
    private position: Coords;
    
    private scaleNum;

    constructor(treeResource: SceneObjectConfig, position: Coords) {

        this.sprite = new TreeSprite(treeResource.sprite.src, treeResource.sprite.size);

        this.shape = new Circle(treeResource.shape.coords, treeResource.shape.radius);

        this.position = position;

        this.scaleNum = 1;
    }

    scale(scaleNum) {
        this.scaleNum = scaleNum;
    };

    render(layer: SceneLayer) {
        this.shape.draw(layer, this.position, this.scaleNum)
        this.sprite.draw(layer, this.position, this.scaleNum);
    }

    getSize() {
        return this.sprite.getSize();
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