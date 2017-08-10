import Coords from "scene/types/Coords";
import {Size} from "scene/types/Size";
import TreeObject from "app/scene/trees/TreeObject";
import Resources from "app/resources/TreeObjectsConfig";
import * as React from "react";
import Canvas from "../../../scene/Canvas";

export default class TreeFactory {

    static plantRect(canvas: Canvas, coords: Coords, size: Size) {
        let trees = [];

        // const rectCoords = coords.getPoint();

        let treeCount = Math.floor(Math.random() * (10 - 3) + 3);
        for(let i = 0; i < treeCount; i++) {
            // get random tree
            let treeNum = Math.round( Math.random() * (Resources.length - 1) );
            let tree = Resources[treeNum];

            // sizes
            // let maxWidth = 160;
            // let minWidth = maxWidth * 0.7;

            // scale
            // let newWidth = Math.floor( Math.random() * (maxWidth - minWidth) + minWidth );
            // let scale = tree.sprite.size.width / newWidth;
            let scale = Math.random() * (1 - 0.6) + 0.6;

            // position on area
            let randomPosition = new Coords({
                x: Math.floor(Math.random() * size.width),
                y: Math.floor(Math.random() * size.height)
            }, coords, scale);

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