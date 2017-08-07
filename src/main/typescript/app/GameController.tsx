import * as React from "react";
import store, {pauseGameAction, startGameAction, moveAction, hitATreeAction} from "app/Store";
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

export default class GameController {

    // props: {
    //     gameState: GameState;
    // };

    // state: {
    //     isStarted: boolean;
    // };

    private static animation = new Animation();

    constructor() {
        // function select(state) {
        //     return state.game.state
        // }
        //
        // let currentValue;
        // store.subscribe(() => {
        //     let previousValue = currentValue;
        //     currentValue = select(store.getState());
        //
        //     if(previousValue != currentValue)
        //         this.update(currentValue);
        // });

        // this.state = {
        //     isStarted: false
        // };
    }

    public static startGame = () => {
        // if(!this.state.isStarted) {
            store.dispatch(startGameAction());

            Accelerometer.startWatch(Model.parameters.time * 1000);
            GameController.animation.start(() => {
                store.dispatch(moveAction(Accelerometer.getAcceleration()));
            });

            // this.state.isStarted = true;
        // }
    };

    public static stopGame = () => {
        // if(this.state.isStarted) {
            GameController.animation.stop();
            Accelerometer.stopWatch();

            // this.state.isStarted = false;

            store.dispatch(pauseGameAction());
        // }
    };

    public static hitATree = () => {
        GameController.animation.stop();
        Accelerometer.stopWatch();

        // this.state.isStarted = false;

        store.dispatch(hitATreeAction());
    }

    // update(gameState: GameState) {
    //     switch(gameState) {
    //         case GameState.STOPPED:
    //         case GameState.PAUSED:
    //         case GameState.HIT_A_TREE:
    //             this.stopGame();
    //             break;
    //         case GameState.STARTED:
    //             this.startGame();
    //             break;
    //         default:
    //             break;
    //     }
    // }

}