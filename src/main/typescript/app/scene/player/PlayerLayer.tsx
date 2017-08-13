import SceneLayer from "scene/SceneLayer";
import PlayerObject from "app/scene/player/PlayerObject";
import * as React from "react";
import { connect } from 'react-redux'
import {SceneObject} from "../../../scene/SceneObject";
import store from "app/Store";
import {AbstractSceneObject} from "../../../scene/AbstractSceneObject";
import {wrap} from "scene/SceneObjectWrap";

export default class PlayerLayer extends SceneLayer {

    constructor(props) {
        super(props);

        this.state.childrenObjects = [
            wrap((state) => {
                return {
                    angle: state.scene.movement.angle,
                    gameState: state.game.state
                }
            }, new PlayerObject({
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