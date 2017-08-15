import {AbstractLayerObject} from "scene/layers/objects/AbstractLayerObject";
import Screen from "device/Screen"
import TreeFactory from "app/game/scene/layers/trees/objects/TreeFactory";
import Coords from "scene/Coords";
import {Size} from "scene/types/Size";
import Canvas from "scene/layers/Canvas";
import {Point} from "scene/types/Point";
import store from "app/game/Store";
import {GameState} from "app/game/GameState";
import {registerSceneObjectsAction} from "scene/interactions/reducers/ObjectsRegistryReducer";

/**
 * Generate trees
 */
export default class Forest extends AbstractLayerObject {

    props: {
        Sx: number; // forest movement on X
        Sy: number; // forest movement on Y
        canvas: Canvas;
        scale: number;
        coords: Coords;
        gameState: GameState;
    };

    private visibleRectSize: Size;
    private cachedTrees = [];
    private prevPosition = {x: -1, y: -1};

    constructor(props) {
        super({
            ...props,
            checkVisibility: false
        });

        this.visibleRectSize = Screen.getSize();
    }

    transform() {
        if(this.props.gameState == GameState.STOPPED) {
            this.reset();
        }

        this.moveForest();
    }

    private moveForest() {
        this.getCanvas().clear();
        this.getCanvas().translate({
            x: Math.round(this.props.Sx),
            y: Math.round(this.props.Sy)
        });
    }

    /**
     * Overriding method to dynamically return
     * trees around current player position
     */
    getChildrenObjects() {
        return this.getTreesAroundCurrentPosition();
    }

    /**
     * Screen position: number of visible screens (rects) from Canvas (0, 0) point
     *
     * @returns {{x: number, y: number}}
     */
    private getCurrentScreenPosition(): Point {
        return {
            x: Math.floor(-this.getCanvas().getTranslation().x / this.visibleRectSize.width),
            y: Math.floor(Math.abs(this.getCanvas().getTranslation().y) / this.visibleRectSize.height)
        }
    }

    /**
     * Transform screen position to rect (top left coordinates and size)
     *
     * @param position screen position
     * @returns {[Coords,Size]}
     */
    private getScreenRectByPosition(position: Point): [Coords, Size] {
        return [
            new Coords({
                x: position.x * this.visibleRectSize.width,
                y: position.y * this.visibleRectSize.height
            }),
            this.visibleRectSize
        ]
    }

    /**
     * Plant screen rect by screen position.
     * This method will return already generated cached trees
     * or generate trees for new areas.
     *
     * @param position
     * @returns {any}
     */
    private plantRect(position: Point) {
        let [coords, size] = this.getScreenRectByPosition(position);
        return TreeFactory.plantRect(position, this.getCanvas(), coords, size);
    }

    /**
     * Get trees around current screen position.
     *
     * *: position; T: trees
     * | T | * | T |
     * | T | T | T |
     *
     * @returns {Array}
     */
    private getTreesAroundCurrentPosition() {
        let curPos = this.getCurrentScreenPosition();

        if(this.prevPosition.x != curPos.x || this.prevPosition.y != curPos.y) {
            TreeFactory.cleanupCachedTrees(curPos);

            this.cachedTrees = [].concat(this.plantRect({x: curPos.x - 1, y: curPos.y}))
                .concat(this.plantRect(curPos))
                .concat(this.plantRect({x: curPos.x + 1, y: curPos.y}))
                .concat(this.plantRect({x: curPos.x - 1, y: curPos.y + 1}))
                .concat(this.plantRect({x: curPos.x, y: curPos.y + 1}))
                .concat(this.plantRect({x: curPos.x + 1, y: curPos.y + 1}));

            store.dispatch(registerSceneObjectsAction(this.cachedTrees));
        }

        this.prevPosition = curPos;

        return this.cachedTrees;
    }

    private reset() {
        this.getCanvas().clear();
        this.getCanvas().clearTranslation();

        TreeFactory.cleanupCachedTrees();
        this.prevPosition = {x: -1, y: -1}
    }

}