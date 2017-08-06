import * as React from "react";
import store, {pauseGameAction, startGameAction, moveAction} from "app/Store";
import { Provider } from 'react-redux';
import Model from "app/Model";
import Animation from "scene/Animation";
import Accelerometer from "../device/Accelerometer";

export enum GameState {
    STOPPED,
    PAUSED,
    STARTED,
    HIT_A_TREE
}

export default class GameController extends React.Component {

    props: {
        gameState: GameState;
    };

    private animation = new Animation();

    constructor(props) {
        super(props);
    }

    private startGame = () => {
        Accelerometer.startWatch(Model.parameters.time * 1000);
        this.animation.start(() => {
            store.dispatch(moveAction(Accelerometer.getAcceleration()));
        });
    };

    private stopGame = () => {
        this.animation.stop();
        Accelerometer.stopWatch();
    };

    render() {
        switch(this.props.gameState) {
            case GameState.STOPPED:
            case GameState.PAUSED:
            case GameState.HIT_A_TREE:
                this.stopGame();
                break;
            case GameState.STARTED:
                this.startGame();
                break;
            default:
                break;
        }

        return null;
    }

}