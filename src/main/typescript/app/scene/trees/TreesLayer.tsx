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

export default class TreesLayer extends SceneLayer {

    // state: {
    //     size: Size;
    //     canvas: Canvas;
    //     childrenObjects: any;
    // };

    private ConnectedForest;

    constructor(props) {
        super(props);

        // console.log("init TreesLayer");

        // this.state.childrenObjects = [
        //     <Forest key="forest_1" />
        // ];

        (window as any).treesLayer = this;


        const mapStateToProps = (state) => {
            return {
                Sx: state.movement.Sx,
                Sy: state.movement.Sy
            }
        };

        this.ConnectedForest = connect(mapStateToProps)(Forest);
    }

    getChildrenObjects() {
        return [
            <this.ConnectedForest canvas={this.getCanvas()} key="forest_1" />
        ];
    }

}