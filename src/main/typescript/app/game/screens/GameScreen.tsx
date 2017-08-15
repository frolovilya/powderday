import * as React from "react";
import {GameState} from "app/game/GameState";
import GameController from "app/game/GameController";

/**
 * Main Game screen UI component
 */
export default class GameScreen extends React.Component {

    props: {
        children;
        gameState: GameState;
        score: number; // game score
    };

    private startGame = (e) => {
        e.stopPropagation();

        GameController.startGame();
    };

    private pauseGame = (e) => {
        e.stopPropagation();

        GameController.stopGame();
    };

    private restartGame = (e) => {
        e.stopPropagation();

        GameController.restartGame();
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