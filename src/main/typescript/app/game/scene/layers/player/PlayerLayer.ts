import SceneLayer from "scene/layers/SceneLayer";
import Player from "app/game/scene/layers/player/objects/Player";
import { connect } from 'react-redux'
import {wrap} from "scene/layers/objects/LayerObjectWrap";
import store from "app/game/Store";

export default class PlayerLayer extends SceneLayer {

    constructor(props) {
        super(props);

        this.state.childrenObjects = [
            wrap(store, (state) => {
                return {
                    angle: state.scene.movement.angle,
                    gameState: state.game.state
                }
            }, new Player({
                canvas: this.getCanvas()
            }))
        ]

    }

    componentDidMount() {
        this.getCanvas().translate({
            x: this.getCanvas().getElement().width / 2,
            y: this.getCanvas().getElement().height / 2
        });

        super.componentDidMount();
    }

}