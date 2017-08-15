import Coords from "scene/Coords";
import {Size} from "scene/types/Size";
import Tree from "app/game/scene/layers/trees/objects/Tree";
import Resources from "app/game/scene/resources/TreeObjectsConfig";
import Canvas from "scene/layers/Canvas";
import {Point} from "scene/types/Point";

/**
 * Trees Layer Objects caching factory
 */
export default class TreeFactory {

    private static treesCacheMap = {};

    /**
     * Plant rect (coords, size) with Trees of random size on random position.
     * This method will cache returned trees based on position parameter.
     *
     * @param position position on trees cache map
     * @param canvas canvas to place trees on to
     * @param coords rect top left coords
     * @param size rect size
     * @returns {Array} trees array
     */
    static plantRect(position: Point, canvas: Canvas, coords: Coords, size: Size) {
        if(!TreeFactory.treesCacheMap[position.y])
            TreeFactory.treesCacheMap[position.y] = {};

        if(!TreeFactory.treesCacheMap[position.y][position.x]) {
            TreeFactory.treesCacheMap[position.y][position.x] = [];

            let treeCount = Math.floor(Math.random() * (10 - 3) + 3);
            for (let i = 0; i < treeCount; i++) {
                // get random tree
                let treeNum = Math.round(Math.random() * (Resources.length - 1));
                let tree = Resources[treeNum];

                // get random scale
                let scale = Math.random() * (1 - 0.6) + 0.6;

                // calculate tree size
                let treeSize = {
                    width: Math.round(tree.sprite.size.width * scale),
                    height: Math.round(tree.sprite.size.height * scale)
                };

                // get random position on area
                let randomPosition = new Coords({
                    x: Math.floor(Math.random() * size.width),
                    y: Math.floor(Math.random() * size.height)
                }, coords, scale);

                TreeFactory.treesCacheMap[position.y][position.x].push(new Tree({
                    treeResource: tree,
                    coords: randomPosition,
                    scale: scale,
                    canvas: canvas,
                    size: treeSize
                }));
            }
        }

        return TreeFactory.treesCacheMap[position.y][position.x];
    }

    /**
     * Remove cached trees above position (if provided) or clear cache
     *
     * @param abovePosition
     */
    static cleanupCachedTrees(abovePosition?) {
        if(!abovePosition) {
            TreeFactory.treesCacheMap = {};

        } else {
            for (let i = 0; i < abovePosition.y - 1; i++) {
                TreeFactory.treesCacheMap[i] = undefined;
            }

        }
    }

}