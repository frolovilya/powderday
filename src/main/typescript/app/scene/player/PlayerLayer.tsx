import SceneLayer from "scene/SceneLayer";
import PlayerObject from "app/scene/player/PlayerObject";
import * as React from "react";

export default class PlayerLayer extends SceneLayer {

    constructor(props) {
        super(props);

        this.state.childrenObjects = [
            <PlayerObject key="player_1" />
        ];
    }

}