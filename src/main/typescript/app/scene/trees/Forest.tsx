import {AbstractSceneObject} from "scene/AbstractSceneObject";
import Screen from "device/Screen"
import TreeFactory from "app/scene/trees/TreeFactory";
import * as React from "react";
import {Coords} from "scene/types/Coords";
import {Size} from "scene/types/Size";
import Canvas from "../../../scene/Canvas";

export default class Forest extends AbstractSceneObject {

    props: {
        Sx: number;
        Sy: number;
        canvas: Canvas;
    };

    private treesMap = {};
    private cachedTrees = [];
    private prevPosition = {x: -1, y: -1};

    constructor(props) {
        super(props);

        // this.state = {
        //     Sx: 0,
        //     Sy: 0,
        //     childrenObjects: []
        // };

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
            x: Math.floor(-this.getCanvas().getTranslation().x / sceneSize.width),
            y: Math.floor(Math.abs(this.getCanvas().getTranslation().y) / sceneSize.height)
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
        if(!this.treesMap[position.y])
            this.treesMap[position.y] = {};

        if(!this.treesMap[position.y][position.x]) {
            let [coords, size] = this.getScreenRectByPosition(position);
            this.treesMap[position.y][position.x] = TreeFactory.plantRect(this.getCanvas(), coords, size);
        }

        return this.treesMap[position.y][position.x];
    }

    private cleanupTrees() {
        let currentPosition = this.getCurrentScreenPosition();
        for(let i = 0; i < currentPosition.y; i++) {
            this.treesMap[i] = {};
        }
    }

    private getTreesAroundCurrentPosition() {
        let curPos = this.getCurrentScreenPosition();
        // console.log("current position", curPos);

        if(this.prevPosition.x != curPos.x || this.prevPosition.y != curPos.y) {
            this.cleanupTrees();

            this.cachedTrees = [].concat(this.plantRect({x: curPos.x - 1, y: curPos.y}))
                .concat(this.plantRect(curPos))
                .concat(this.plantRect({x: curPos.x + 1, y: curPos.y}))
                .concat(this.plantRect({x: curPos.x - 1, y: curPos.y + 1}))
                .concat(this.plantRect({x: curPos.x, y: curPos.y + 1}))
                .concat(this.plantRect({x: curPos.x + 1, y: curPos.y + 1}));
        }

        this.prevPosition = curPos;

        return this.cachedTrees;
    }

    private moveForest() {
        this.getCanvas().clear();
        this.getCanvas().translate({
            x: Math.round(this.props.Sx),
            y: Math.round(this.props.Sy)
        });
    }

}