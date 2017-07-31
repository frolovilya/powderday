import SceneLayer from "scene/SceneLayer";
import Accelerometer from "device/Accelerometer";
import Model from "app/Model";
import TreeFactory from "app/scene/trees/TreeFactory";
import SharedState from "app/SharedState";
import {Size} from "scene/types/Size";
import Forest from "app/scene/trees/Forest";
import * as React from "react";

export default class TreesLayer extends SceneLayer {

    state: {
        size: Size;
        childrenObjects: any;
    };

    constructor(props) {
        super(props);

        console.log("init TreesLayer");

        this.state.childrenObjects = [
            <Forest key="forest_1" />
        ];

        (window as any).treesLayer = this;
    }

}