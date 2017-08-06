import SceneLayer from "scene/SceneLayer";
import Accelerometer from "device/Accelerometer";
import Model from "app/Model";
import TreeFactory from "app/scene/trees/TreeFactory";
import SharedState from "app/SharedState";
import {Size} from "scene/types/Size";
import Forest from "app/scene/trees/Forest";
import * as React from "react";
import Canvas from "../../../scene/Canvas";
import { connect } from 'react-redux'
import {SceneObject} from "../../../scene/SceneObject";
import store from "app/Store";

export default class TreesLayer extends SceneLayer {

    constructor(props) {
        super(props);

        const wrap = function(mapStateToProps: (state) => object, sceneObject: SceneObject) {
            store.subscribe(() => {
                sceneObject.update(mapStateToProps(store.getState()));
            });

            return sceneObject;
        };

        const mapStateToProps = (state) => {
            return {
                Sx: state.scene.movement.Sx,
                Sy: state.scene.movement.Sy
            }
        };

        this.state.childrenObjects = [
            wrap(mapStateToProps, new Forest({
                canvas: this.getCanvas(),
                Sx: 0,
                Sy: 0
            }))
        ];

        (window as any).treesLayer = this;
    }

}