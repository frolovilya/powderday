import {AbstractSceneObject} from "scene/AbstractSceneObject";
import Screen from "device/Screen"
import TreeFactory from "app/scene/trees/TreeFactory";
import * as React from "react";
import {Coords} from "scene/types/Coords";
import {Size} from "scene/types/Size";

export default class Forest extends AbstractSceneObject {

    state: {
        Sx: number;
        Sy: number;
        childrenObjects;
    };

    private trees = [];

    constructor(props) {
        super(props);

        this.state = {
            Sx: 0,
            Sy: 0,
            childrenObjects: []
        };

        (window as any).forest = this;
    }

    transform() {
        this.moveForest();
        // console.log("trees around", this.state.childrenObjects.length)
    }

    getChildrenObjects() {
        return this.getTreesAroundCurrentPosition();
    }

    private getCurrentScreenPosition(): Coords {
        let sceneSize = Screen.getSize();

        return {
            x: Math.floor(-this.getLayer().getCanvas().getTranslation().x / sceneSize.width),
            y: Math.floor(Math.abs(this.getLayer().getCanvas().getTranslation().y) / sceneSize.height)
        }
    }

    private getScreenRectByPosition(position: Coords): [Coords, Size] {
        let sceneSize = Screen.getSize();

        return [
            {
                x: position.x * sceneSize.width,
                y: position.y * sceneSize.height
            },
            {
                width: sceneSize.width,
                height: sceneSize.height
            }
        ]
    }

    private plantRect(position: Coords) {
        if(!this.trees[position.y])
            this.trees[position.y] = [];

        if(!this.trees[position.y][position.x]) {
            let [coords, size] = this.getScreenRectByPosition(position);
            this.trees[position.y][position.x] = TreeFactory.plantRect(coords, size);
        }

        return this.trees[position.y][position.x];
    }

    private cleanupTrees() {
        let currentPosition = this.getCurrentScreenPosition();
        for(let i = 0; i < currentPosition.y; i++) {
            this.trees[i] = [];
        }
    }

    private getTreesAroundCurrentPosition() {
        this.cleanupTrees();

        let curPos = this.getCurrentScreenPosition();
        // console.log("current position", curPos);

        return [].concat(this.plantRect({x: curPos.x - 1, y: curPos.y}))
            .concat(this.plantRect(curPos))
            .concat(this.plantRect({x: curPos.x + 1, y: curPos.y}))
            .concat(this.plantRect({x: curPos.x - 1, y: curPos.y + 1}))
            .concat(this.plantRect({x: curPos.x, y: curPos.y + 1}))
            .concat(this.plantRect({x: curPos.x + 1, y: curPos.y + 1}));
    }

    private moveForest() {
        this.getLayer().getCanvas().clear();
        this.getLayer().getCanvas().translate({
            x: Math.round(this.state.Sx),
            y: Math.round(this.state.Sy)
        });
    }

}