import SceneLayer from "scene/layers/SceneLayer";
import { connect } from 'react-redux'
import {wrap} from "scene/layers/objects/LayerObjectWrap";
import store from "app/game/Store";
import Score from "app/game/scene/layers/score/objects/Score";

export default class ScoreLayer extends SceneLayer {

    constructor(props) {
        super(props);

        this.state.childrenObjects = [
            wrap(store, (state) => {
                return {
                    score: state.scene.score
                }
            }, new Score({
                canvas: this.getCanvas()
            }))
        ]

    }

}