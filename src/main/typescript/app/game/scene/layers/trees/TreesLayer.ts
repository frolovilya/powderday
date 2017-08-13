import SceneLayer from "scene/layers/SceneLayer";
import Forest from "app/game/scene/layers/trees/objects/Forest";
import { connect } from 'react-redux'
import {wrap} from "scene/layers/objects/LayerObjectWrap";
import store from "app/game/Store";

export default class TreesLayer extends SceneLayer {

    constructor(props) {
        super(props);

        this.state.childrenObjects = [
            wrap(store, (state) => {
                return {
                    Sx: state.scene.movement.Sx,
                    Sy: state.scene.movement.Sy,
                    gameState: state.game.state
                }
            }, new Forest({
                canvas: this.getCanvas(),
                Sx: 0,
                Sy: 0
            }))
        ];

        (window as any).treesLayer = this;
    }

}