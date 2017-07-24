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

    private layer: SceneLayer;

    private sprite: TreeSprite;

    private shape: Circle;
    
    private position: Coords;
    
    private scaleNum: number;

    constructor(treeResource: SceneObjectConfig, position: Coords) {

        this.sprite = new TreeSprite(treeResource.sprite.src, treeResource.sprite.size);

        this.shape = new Circle(treeResource.shape.coords, treeResource.shape.radius);

        this.position = position;

        this.scaleNum = 1;
    }

    getClassName() {
        return "tree";
    }

    setLayer(layer: SceneLayer) {
        this.layer = layer;
    }

    getLayer() {
        return this.layer;
    }

    scale(scaleNum: number) {
        this.scaleNum = Math.round(scaleNum * 100) / 100;
    };

    getScale() {
        return this.scaleNum;
    }

    render() {
        this.shape.draw(this.layer, this.position, this.scaleNum);
        this.sprite.draw(this.layer, this.position, this.scaleNum);
    }

    getSize() {
        return this.sprite.getSize();
    }

    getCoords() {
        return this.position;
    }

    isVisible() {
        let topX = this.layer.translation.x + this.position.x;
        let topY = this.layer.translation.y + this.position.y;

        return ( this.layer.isPointVisible(topX, topY)
            || this.layer.isPointVisible(topX + this.getSize().width, topY)
            || this.layer.isPointVisible(topX, topY + this.getSize().height)
            || this.layer.isPointVisible(topX + this.getSize().width, topY + this.getSize().height) );
    }

    isActual() {
        return this.layer.translation.y + this.position.y + this.getSize().height > 0;
    }

    getShapes() {
        return [this.shape];
    }

}