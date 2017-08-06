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

    props: {
        treeResource: any;
        coords: Coords;
        scale: number;
        canvas: Canvas;
    };

    constructor(props) {
        super(props);

        this.state.childrenObjects = [
            new Circle({
                coords: this.props.treeResource.shape.coords,
                radius: this.props.treeResource.shape.radius,
                canvas: this.getCanvas(),
                parentCoords: this.props.coords,
                scale: this.props.scale
            }),
            new TreeSprite({
                treeResource: this.props.treeResource,
                coords: this.props.coords,
                scale: this.props.scale,
                canvas: this.getCanvas()
            })
        ]

    }

    getClassName() {
        return "tree";
    }

}