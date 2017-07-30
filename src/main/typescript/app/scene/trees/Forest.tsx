import {AbstractSceneObject} from "scene/AbstractSceneObject";
import Screen from "device/Screen"
import TreeFactory from "app/scene/trees/TreeFactory";
import * as React from "react";
import {AbstractSceneObjectsGroup} from "scene/AbstractSceneObjectsGroup";

export default class Forest extends AbstractSceneObjectsGroup {

    state: {
        Sx: number;
        Sy: number;
        childrenObjects;
    };

    constructor(props) {
        super(props);

        this.state = {
            Sx: 0,
            Sy: 0,
            childrenObjects: this.getInitialTrees()
        };

        (window as any).forest = this;
    }

    transform() {
        this.moveForest();
        this.state.childrenObjects = this.state.childrenObjects.concat(this.generateNewAreas());
    }

    private moveForest() {
        this.getLayer().getCanvas().clear();
        this.getLayer().getCanvas().translate({
            x: Math.round(this.state.Sx),
            y: Math.round(this.state.Sy)
        });
    }

    private getInitialTrees() {
        let screenSize = Screen.getSize();

        let forest = [];
        forest = forest.concat(TreeFactory.plantRect({x: -screenSize.width, y: 0}, screenSize));
        forest = forest.concat(TreeFactory.plantRect({x: 0, y: screenSize.height * 2 / 3}, screenSize));
        forest = forest.concat(TreeFactory.plantRect({x: screenSize.width, y: 0}, screenSize));
        forest = forest.concat(TreeFactory.plantRect({x: -screenSize.width, y: screenSize.height}, screenSize));
        forest = forest.concat(TreeFactory.plantRect({x: 0, y: screenSize.height}, screenSize));
        forest = forest.concat(TreeFactory.plantRect({x: screenSize.width, y: screenSize.height}, screenSize));

        console.log("initial trees count " + forest.length);

        return forest;
    }

    private generateNewAreas() {
        let forest = [];
        // generate new areas
        let sceneSize = Screen.getSize();
        let offsetY = Math.abs(this.getLayer().getCanvas().getTranslation().y) % sceneSize.height;
        // let offsetY = Math.abs(this.state.Sy) % sceneSize.height;
        // //let offsetX = Math.abs(this.treeLayer.translation.x) % sw;
        //
        // if( offsetY <= sceneSize.height / 2 )
        //     this.isPlanted = false;
        if(offsetY > sceneSize.height / 2) {
            forest = forest.concat(TreeFactory.plantRect({
                        x: -sceneSize.width,
                        y: -this.getLayer().getCanvas().getTranslation().y - offsetY + 2 * sceneSize.height
                    },
                    {width: sceneSize.width, height: sceneSize.height}
                ));
            forest = forest.concat(TreeFactory.plantRect({
                        x: 0,
                        y: -this.getLayer().getCanvas().getTranslation().y - offsetY + 2 * sceneSize.height
                    },
                    {width: sceneSize.width, height: sceneSize.height}
                ));
            forest = forest.concat(TreeFactory.plantRect({
                        x: sceneSize.width,
                        y: -this.getLayer().getCanvas().getTranslation().y - offsetY + 2 * sceneSize.height
                    },
                    {width: sceneSize.width, height: sceneSize.height}
                ));
            // this.isPlanted = true;
        }

        return forest;
    }

}