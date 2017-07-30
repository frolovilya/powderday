import SceneLayer from "scene/SceneLayer";
import Accelerometer from "device/Accelerometer";
import Model from "app/Model";
import TreeFactory from "app/scene/trees/TreeFactory";
import SharedState from "app/SharedState";
import {Size} from "scene/types/Size";
import Forest from "app/scene/trees/Forest";
import * as React from "react";

export default class TreesLayer extends SceneLayer {

    // private isPlanted = false;

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



    // private resetTreesLayer() {
    //     // clear tree layer
    //     this.getCanvas().clear();
    //     // this.removeAllObjects();
    //     // retranslate to 0,0
    //     this.getCanvas().translate({
    //         x: -this.getCanvas().getTranslation().x,
    //         y: -this.getCanvas().getTranslation().y
    //     });
    // }
    //



    // private generateNewAreas() {
    //     let forest = [];
    //     // generate new areas
    //     let sceneSize = Screen.getSize();
    //     // let offsetY = Math.abs(this.getCanvas().getTranslation().y) % sceneSize.height;
    //     let offsetY = Math.abs(this.state.Sy) % sceneSize.height;
    //     // //let offsetX = Math.abs(this.treeLayer.translation.x) % sw;
    //     //
    //     // if( offsetY <= sceneSize.height / 2 )
    //     //     this.isPlanted = false;
    //     // if( offsetY > sceneSize.height / 2 && !this.isPlanted ) {
    //     forest = forest.concat(TreeFactory.plantRect({
    //                 x: -sceneSize.width,
    //                 y: -this.getCanvas().getTranslation().y - offsetY + 2 * sceneSize.height
    //             },
    //             {width: sceneSize.width, height: sceneSize.height}
    //         ));
    //     forest = forest.concat(TreeFactory.plantRect({
    //                 x: 0,
    //                 y: -this.getCanvas().getTranslation().y - offsetY + 2 * sceneSize.height
    //             },
    //             {width: sceneSize.width, height: sceneSize.height}
    //         ));
    //     forest = forest.concat(TreeFactory.plantRect({
    //                 x: sceneSize.width,
    //                 y: -this.getCanvas().getTranslation().y - offsetY + 2 * sceneSize.height
    //             },
    //             {width: sceneSize.width, height: sceneSize.height}
    //         ));
    //         // this.isPlanted = true;
    //     // }
    //
    //     return forest;
    // }

    // reset() {
    //     this.resetTreesLayer();
    //     this.state.childrenObjects = this.getInitialTrees();
    //
    //     super.reset();
    // }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     console.log("should trees layer update?", arguments)
    //     // if(this.state.childrenObjects.length != nextState.childrenObjects.length)
    //     //     return true;
    //
    //     let sceneSize = Screen.getSize();
    //     // let offsetY = Math.abs(this.getCanvas().getTranslation().y) % sceneSize.height;
    //     let offsetY = Math.abs(this.state.Sy) % sceneSize.height;
    //
    //     return offsetY > sceneSize.height / 2;
    // }

    // componentWillUpdate() {
    //     console.log("trees layer will update");
    //
    //     this.state.childrenObjects = this.generateNewAreas();
    // }
}