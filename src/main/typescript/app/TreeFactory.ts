import SceneLayer from "../scene/SceneLayer";
import {Coords} from "../scene/types/Coords";
import {Size} from "../scene/types/Size";
import TreeObject from "./TreeObject";
import Resources from "./Resources";

export default class TreeFactory {

    static plantRect(layer: SceneLayer, coords: Coords, size: Size) {
        let treeCount = Math.floor(Math.random() * (10 - 3) + 3);

        for(let i = 0; i < treeCount; i++) {
            // position on area
            let randomPosition = {
                x: coords.x + Math.floor(Math.random() * size.width),
                y: coords.y + Math.floor(Math.random() * size.height)
            };

            // get random tree
            let treeNum = Math.round( Math.random() * (Resources.trees.length - 1) );
            let tree = Resources.trees[treeNum];
            let treeObject = new TreeObject(tree, randomPosition);

            // sizes
            let maxWidth = 160;
            let minWidth = maxWidth * 0.7;

            // scale
            let newWidth = Math.floor( Math.random() * (maxWidth - minWidth) + minWidth );
            let scale = treeObject.getSize().width / newWidth;
            treeObject.setScale(scale);

            // add tree to layer
            layer.addObject( treeObject );
        }
    }

}