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

    componentDidMount() {
        (window as any).playerLayer = this;

        this.getCanvas().getContext().lineWidth = 10;
        this.getCanvas().translate({
            x: this.getCanvas().getElement().width / 2,
            y: this.getCanvas().getElement().height / 2
        });

        this.forceUpdateChildrenObjects();
    }

}