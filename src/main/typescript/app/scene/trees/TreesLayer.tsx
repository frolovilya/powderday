import SceneLayer from "scene/SceneLayer";
import Accelerometer from "device/Accelerometer";
import Model from "app/Model";
import TreeFactory from "app/scene/trees/TreeFactory";
import {Size} from "scene/types/Size";
import Forest from "app/scene/trees/Forest";
import * as React from "react";
import Canvas from "../../../scene/Canvas";
import { connect } from 'react-redux'
import {SceneObject} from "../../../scene/SceneObject";
import store from "app/Store";
import {AbstractSceneObject} from "scene/AbstractSceneObject";
import {wrap} from "../../../scene/SceneObjectWrap";

export default class TreesLayer extends SceneLayer {

    constructor(props) {
        super(props);

        this.state.childrenObjects = [
            wrap((state) => {
                return {
                    Sx: state.scene.movement.Sx,
                    Sy: state.scene.movement.Sy,
                    gameState: state.game.state
                }
            }, new Forest({
                canvas: this.getCanvas(),
                Sx: 0,
                Sy: 0
            }))
        ];

        (window as any).treesLayer = this;
    }

}