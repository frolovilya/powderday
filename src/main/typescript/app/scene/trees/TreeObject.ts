/*
 * Trees
 */
import {SceneObject} from "scene/SceneObject";
import SceneLayer from "scene/SceneLayer";
import Sprite from "scene/Sprite";
import {Coords} from "scene/types/Coords";
import Circle from "scene/shapes/Circle";
import TreeSprite from "app/scene/trees/TreeSprite";
import {AbstractSceneObject} from "scene/AbstractSceneObject";

export default class TreeObject extends AbstractSceneObject implements SceneObject {

    private sprite: TreeSprite;

    private shape: Circle;

    constructor(treeResource, coords: Coords) {
        super();

        this.sprite = new TreeSprite(treeResource.sprite.src, treeResource.sprite.size);

        this.shape = new Circle(treeResource.shape.coords, treeResource.shape.radius);

        this.coords = coords;

    }

    getClassName() {
        return "tree";
    }

    render() {
        this.shape.draw(this.layer, this.coords, this.scale);
        this.sprite.draw(this.layer, this.coords, this.scale);
    }

    getSize() {
        return this.sprite.getSize();
    }

    isVisible() {
        let topPoint = {
            x: this.layer.getTranslation().x + this.coords.x,
            y: this.layer.getTranslation().y + this.coords.y
        };

        return ( this.layer.isPointVisible(topPoint)
            || this.layer.isPointVisible({x: topPoint.x + this.getSize().width, y: topPoint.y})
            || this.layer.isPointVisible({x: topPoint.x, y: topPoint.y + this.getSize().height})
            || this.layer.isPointVisible({
                x: topPoint.x + this.getSize().width,
                y: topPoint.y + this.getSize().height
            }));
    }

    isActual() {
        return this.layer.getTranslation().y + this.coords.y + this.getSize().height > 0;
    }

    getShapes() {
        return [this.shape];
    }

}