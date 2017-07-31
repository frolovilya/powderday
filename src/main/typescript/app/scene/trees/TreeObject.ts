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

export default class TreeObject extends AbstractSceneObject {

    private sprite: TreeSprite;
    private shape: Circle;
    
    props: {
        treeResource: any;
        coords: Coords;
        scale: number;
        layer?: SceneLayer;
    };

    constructor(props) {
        super(props);

        this.coords =  this.props.coords;

        this.sprite = new TreeSprite(
            this.props.treeResource.sprite.src,
            this.props.treeResource.sprite.size
        );

        this.shape = new Circle(
            this.props.treeResource.shape.coords,
            this.props.treeResource.shape.radius
        );
    }

    getClassName() {
        return "tree";
    }

    transform() {
        this.shape.draw(this.getLayer(), this.coords, this.scale);
        this.sprite.draw(this.getLayer(), this.coords, this.scale);
    }

    // getSize() {
    //     return this.sprite.getSize();
    // }

    // isVisible() {
    //     let topPoint = {
    //         x: this.getLayer().getCanvas().getTranslation().x + this.coords.x,
    //         y: this.getLayer().getCanvas().getTranslation().y + this.coords.y
    //     };
    //
    //     return ( this.getLayer().isPointVisible(topPoint)
    //         || this.getLayer().isPointVisible({x: topPoint.x + this.getSize().width, y: topPoint.y})
    //         || this.getLayer().isPointVisible({x: topPoint.x, y: topPoint.y + this.getSize().height})
    //         || this.getLayer().isPointVisible({
    //             x: topPoint.x + this.getSize().width,
    //             y: topPoint.y + this.getSize().height
    //         }));
    // }
    //
    // isActual() {
    //     return this.getLayer().getCanvas().getTranslation().y + this.coords.y + this.getSize().height > 0;
    // }

    getShapes() {
        return [this.shape];
    }

}