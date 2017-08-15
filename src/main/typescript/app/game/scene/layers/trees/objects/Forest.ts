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

export default class Forest extends AbstractLayerObject {

    props: {
        Sx: number;
        Sy: number;
        canvas: Canvas;
        scale: number;
        coords: Coords;
        gameState: GameState;
    };

    state: {
        sceneSize: Size;
        childrenObjects;
    };

    private treesMap = {};
    private cachedTrees = [];
    private prevPosition = {x: -1, y: -1};

    constructor(props) {
        super({
            ...props,
            checkVisibility: false
        });

        this.state.sceneSize = Screen.getSize();

        (window as any).forest = this;
    }

    transform() {
        if(this.props.gameState == GameState.STOPPED) {
            this.reset();
        }

        this.moveForest();
    }

    getChildrenObjects() {
        return this.getTreesAroundCurrentPosition();
    }

    private getCurrentScreenPosition(): Point {
        return {
            x: Math.floor(-this.getCanvas().getTranslation().x / this.state.sceneSize.width),
            y: Math.floor(Math.abs(this.getCanvas().getTranslation().y) / this.state.sceneSize.height)
        }
    }

    private getScreenRectByPosition(position: Point): [Coords, Size] {
        let sceneSize = Screen.getSize();

        return [
            new Coords({
                x: position.x * sceneSize.width,
                y: position.y * sceneSize.height
            }),
            {
                width: sceneSize.width,
                height: sceneSize.height
            }
        ]
    }

    private plantRect(position: Point) {
        if(!this.treesMap[position.y])
            this.treesMap[position.y] = {};

        if(!this.treesMap[position.y][position.x]) {
            let [coords, size] = this.getScreenRectByPosition(position);
            this.treesMap[position.y][position.x] = TreeFactory.plantRect(this.getCanvas(), coords, size);
        }

        return this.treesMap[position.y][position.x];
    }

    private cleanupTrees(currentPosition) {
        for (let i = 0; i < currentPosition.y - 1; i++) {
            this.treesMap[i] = undefined;
        }
    }

    private getTreesAroundCurrentPosition() {
        let curPos = this.getCurrentScreenPosition();

        if(this.prevPosition.x != curPos.x || this.prevPosition.y != curPos.y) {
            this.cleanupTrees(curPos);

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

    private moveForest() {
        this.getCanvas().clear();
        this.getCanvas().translate({
            x: Math.round(this.props.Sx),
            y: Math.round(this.props.Sy)
        });
    }

    private reset() {
        this.getCanvas().clear();
        this.getCanvas().clearTranslation();

        this.treesMap = {};
        this.prevPosition = {x: -1, y: -1}
    }

}