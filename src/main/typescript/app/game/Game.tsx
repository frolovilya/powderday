import Scene from "scene/Scene";
import TreesLayer from "app/game/scene/layers/trees/TreesLayer";
import * as ReactDOM from "react-dom";
import * as React from "react";
import PlayerLayer from "app/game/scene/layers/player/PlayerLayer";
import { Provider } from 'react-redux';
import store from "app/game/Store";
import GameScreen from "app/game/screens/GameScreen";
import { connect } from 'react-redux'
import GameController from "app/game/GameController";
import DebugLayer from "app/game/scene/layers/debug/DebugLayer";

export default class Main {

    private scene;

    private initScene() {

        const GameScreenWrap = connect((state) => {
            return {
                gameState: state.game.state,
                score: state.scene.score,
                acceleration: state.scene.acceleration
            }
        })(GameScreen);

        ReactDOM.render(
            <Provider store={store}>
                <GameScreenWrap>
                    <Scene ref={(scene) => { this.scene = scene; }}>
                        <PlayerLayer layerId="player" zIndex={10} />
                        <TreesLayer layerId="tree" zIndex={100} />
                        <DebugLayer layerId="debug" zIndex={200} />
                    </Scene>
                </GameScreenWrap>
            </Provider>,
            document.getElementById("game")
        );

    }

    init() {
        this.initScene();

        GameController.getIntersections().onIntersect("player", "tree", () => {
            console.log("inside intersect callback!");
            GameController.hitATree();
        });

        (window as any).game = this;
    }

}