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
import {InteractionType} from "scene/interactions/InteractionType";

/**
 * Game main class
 */
export default class Game {

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

    private initSceneInteractions() {
        GameController.interactions().observe(InteractionType.INTERSECT, "player", "tree")(() => {
            GameController.hitATree();
        });
    }

    init() {
        this.initScene();
        this.initSceneInteractions();
    }

}