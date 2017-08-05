import {Coords} from "scene/types/Coords";
import {Size} from "scene/types/Size";
import TreeObject from "app/scene/trees/TreeObject";
import Resources from "app/resources/TreeObjectsConfig";
import * as React from "react";
import Canvas from "../../../scene/Canvas";

export default class TreeFactory {

    static plantRect(canvas: Canvas, coords: Coords, size: Size) {
        let trees = [];

        let treeCount = Math.floor(Math.random() * (10 - 3) + 3);
        for(let i = 0; i < treeCount; i++) {
            // position on area
            let randomPosition = {
                x: coords.x + Math.floor(Math.random() * size.width),
                y: coords.y + Math.floor(Math.random() * size.height)
            };

            // get random tree
            let treeNum = Math.round( Math.random() * (Resources.length - 1) );
            let tree = Resources[treeNum];

            // sizes
            let maxWidth = 160;
            let minWidth = maxWidth * 0.7;

            // scale
            let newWidth = Math.floor( Math.random() * (maxWidth - minWidth) + minWidth );
            let scale = tree.sprite.size.width / newWidth;

            let key = "tree_" + randomPosition.x + "_" + randomPosition.y;

            // trees.push(<TreeObject treeResource={tree}
            //                        coords={randomPosition}
            //                        scale={scale}
            //                        canvas={canvas}
            //                        key={key} />);

            trees.push(new TreeObject({
                treeResource: tree,
                coords: randomPosition,
                scale: scale,
                canvas: canvas
            }));
        }

        return trees;
    }

}