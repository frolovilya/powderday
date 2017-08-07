import * as React from "react";
import store, {pauseGameAction, startGameAction, moveAction} from "../Store";
import { Provider } from 'react-redux';
import Accelerometer from "../../device/Accelerometer";
import Model from "app/Model";
import Animation from "scene/Animation";
import {default as GameController, GameState} from "app/GameController";
//
// export enum GameState {
//     STOPPED,
//     PAUSED,
//     STARTED,
//     HIT_A_TREE
// }

export default class Game extends React.Component {

    props: {
        children;
        gameState: GameState;
        score: number;
    };

    // private animation = new Animation();

    // private gameController = new GameController();

    constructor(props) {
        super(props);

    //     this.startGame = this.startGame.bind(this);
    //     this.pauseGame = this.pauseGame.bind(this);
    }

    private startGame = (e) => {
        e.stopPropagation();

        // if(this.props.gameState != GameState.STARTED) {
        //     store.dispatch(startGameAction());

        GameController.startGame();

            // Accelerometer.startWatch(Model.parameters.time * 1000);
            // this.animation.start(() => {
            //     store.dispatch(moveAction(Accelerometer.getAcceleration()));
            // });

            console.log("startGame");
        // }
    };

    private pauseGame = (e) => {
        e.stopPropagation();

        // if (this.props.gameState == GameState.STARTED) {
            // this.animation.stop();
            // Accelerometer.stopWatch();

            // store.dispatch(pauseGameAction());

        GameController.stopGame();

            console.log("pauseGame");
        // }
    };

    // componentWillUpdate(nextProps) {
    //     this.gameController.update(nextProps.gameState);
    // }

    render() {
        return <div onClick={this.pauseGame}>
            <div id="scene">{this.props.children}</div>
            {this.props.gameState != GameState.STARTED &&
                <div>
                    <div className="blueOverlay"/>
                    <div className="container">
                        {this.props.gameState == GameState.STOPPED &&
                            <div className="button" onClick={this.startGame}>Start game</div>
                        }
                        {this.props.gameState == GameState.PAUSED &&
                            <div className="button" onClick={this.startGame}>Continue</div>
                        }
                        {this.props.gameState == GameState.HIT_A_TREE &&
                            <div className="end">
                                <div>You hit a tree!</div>
                                <div>Score: <span id="score">{this.props.score}</span></div>
                                {/*<div className="button" onClick={this.startGame}>Replay</div>*/}
                            </div>
                        }
                    </div>
                </div>
            }
        </div>;
    }

}