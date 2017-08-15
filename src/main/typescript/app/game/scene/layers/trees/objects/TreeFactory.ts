import Coords from "scene/Coords";
import {Size} from "scene/types/Size";
import Tree from "app/game/scene/layers/trees/objects/Tree";
import Resources from "app/game/scene/resources/TreeObjectsConfig";
import Canvas from "scene/layers/Canvas";

export default class TreeFactory {

    static plantRect(canvas: Canvas, coords: Coords, size: Size) {
        let trees = [];

        let treeCount = Math.floor(Math.random() * (10 - 3) + 3);
        for(let i = 0; i < treeCount; i++) {
            // get random tree
            let treeNum = Math.round( Math.random() * (Resources.length - 1) );
            let tree = Resources[treeNum];

            let scale = Math.random() * (1 - 0.6) + 0.6;

            let treeSize = {
                width: tree.sprite.size.width * scale,
                height: tree.sprite.size.height * scale
            };

            // position on area
            let randomPosition = new Coords({
                x: Math.floor(Math.random() * size.width),
                y: Math.floor(Math.random() * size.height)
            }, coords, scale);

            trees.push(new Tree({
                treeResource: tree,
                coords: randomPosition,
                scale: scale,
                canvas: canvas,
                size: treeSize
            }));
        }

        return trees;
    }

}