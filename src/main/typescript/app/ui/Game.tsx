import * as React from "react";
import { Provider } from 'react-redux';
import {GameState} from "app/GameState";
import GameController from "../GameController";

export default class Game extends React.Component {

    props: {
        children;
        gameState: GameState;
        score: number;
    };

    private startGame = (e) => {
        e.stopPropagation();

        GameController.getInstance().startGame();

        console.log("startGame");
    };

    private pauseGame = (e) => {
        e.stopPropagation();

        GameController.getInstance().stopGame();

        console.log("pauseGame");
    };

    private restartGame = (e) => {
        e.stopPropagation();

        GameController.getInstance().restartGame();

        console.log("restartGame");
    };

    render() {
        return <div onClick={this.pauseGame}>
            <div id="scene">{this.props.children}</div>
            {this.props.gameState != GameState.STARTED &&
                <div>
                    <div className="blueOverlay"/>
                    <div className="container">
                        {this.props.gameState == GameState.STOPPED &&
                            <div className="button" onClick={this.startGame}>Start Game</div>
                        }
                        {this.props.gameState == GameState.PAUSED &&
                            <div className="button" onClick={this.startGame}>Continue</div>
                        }
                        {this.props.gameState == GameState.HIT_A_TREE &&
                            <div className="end">
                                <div>You hit a tree!</div>
                                <div>Score: <span id="score">{this.props.score}</span></div>
                                <div className="button" onClick={this.restartGame}>Replay</div>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>;
    }

}