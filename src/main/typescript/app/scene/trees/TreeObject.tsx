/*
 * Trees
 */
import {SceneObject} from "scene/SceneObject";
import SceneLayer from "scene/SceneLayer";
import {Coords} from "scene/types/Coords";
import Circle from "scene/shapes/Circle";
import {AbstractSceneObject} from "scene/AbstractSceneObject";
import TreeSprite from "./TreeSprite";
import * as React from "react";
import Canvas from "../../../scene/Canvas";

export default class TreeObject extends AbstractSceneObject {

    // private sprite: TreeSprite;
    private shape: Circle;
    
    props: {
        treeResource: any;
        coords: Coords;
        scale: number;
        canvas: Canvas;
    };

    constructor(props) {
        super(props);

        // this.coords = this.props.coords;

        this.state.childrenObjects = [
            <Circle coords={this.props.treeResource.shape.coords}
                    radius={this.props.treeResource.shape.radius}
                    canvas={this.getCanvas()}
                    parentCoords={this.props.coords}
                    scale={this.props.scale}
                    key="tree_shape_1" />,
            <TreeSprite treeResource={this.props.treeResource}
                        canvas={this.getCanvas()}
                        coords={this.props.coords}
                        scale={this.props.scale}
                        key="tree_sprite_1" />
        ];

    }
    //
    // getChildrenObjects() {
    //     return [
    //         <Circle coords={this.props.treeResource.shape.coords}
    //                 radius={this.props.treeResource.shape.radius}
    //                 canvas={this.getCanvas()}
    //                 parentCoords={this.props.coords}
    //                 scale={this.props.scale}
    //                 key="tree_shape_1" />,
    //         <TreeSprite treeResource={this.props.treeResource}
    //                     canvas={this.getCanvas()}
    //                     coords={this.props.coords}
    //                     scale={this.props.scale}
    //                     key="tree_sprite_1" />
    //     ];
    // }

    getClassName() {
        return "tree";
    }

    transform() {
        // this.shape.draw(this.getLayer(), this.coords, this.scale);
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