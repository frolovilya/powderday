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

    // state: {
    //     size: Size;
    //     canvas: Canvas;
    //     childrenObjects: any;
    // };

    // private ConnectedForest;

    constructor(props) {
        super(props);

        // console.log("init TreesLayer");

        const wrap = function(mapStateToProps: (state) => object, sceneObject: SceneObject) {
            store.subscribe(() => {
                sceneObject.update(mapStateToProps(store.getState()));
            });

            return sceneObject;
        };

        const mapStateToProps = (state) => {
            return {
                Sx: state.movement.Sx,
                Sy: state.movement.Sy
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

        // this.ConnectedForest = connect(mapStateToProps)(Forest);
    }

    // getChildrenObjects() {
    //     return [
    //         <this.ConnectedForest canvas={this.getCanvas()} key="forest_1" />
    //     ];
    // }

}