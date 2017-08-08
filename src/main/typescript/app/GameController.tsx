import * as React from "react";
import store, {pauseGameAction, startGameAction, moveAction, hitATreeAction} from "app/Store";
import { Provider } from 'react-redux';
import Model from "app/Model";
import ObjectsIntersections from "scene/interactions/ObjectsIntersections";
import Animation from "scene/Animation";
import Accelerometer from "../device/Accelerometer";

export default class GameController {

    // props: {
    //     gameState: GameState;
    // };

    // state: {
    //     isStarted: boolean;
    // };

    private static instance = null;

    private animation;// = new Animation();

    private objectsIntersections;// = new ObjectsIntersections();

    private constructor() {
        this.animation = new Animation();
        this.objectsIntersections = new ObjectsIntersections();

        function select(state) {
            return state.scene.movement
        }

        let currentValue;
        store.subscribe(() => {
            let previousValue = currentValue;
            currentValue = select(store.getState());

            if(previousValue != currentValue)
                this.objectsIntersections.check(store.getState());
        });

    }

    public static getInstance() {
        if(!GameController.instance) {
            GameController.instance = new GameController();
        }

        return GameController.instance;
    }

    public startGame = () => {
        // if(!this.state.isStarted) {
            store.dispatch(startGameAction());

            Accelerometer.startWatch(Model.parameters.time * 1000);
            this.animation.start(() => {
                store.dispatch(moveAction(Accelerometer.getAcceleration()));

                // this.objectsIntersections.check(store.getState());
            });

            // this.state.isStarted = true;
        // }
    };

    public stopGame = () => {
        // if(this.state.isStarted) {
            this.animation.stop();
            Accelerometer.stopWatch();

            // this.state.isStarted = false;

            store.dispatch(pauseGameAction());
        // }
    };

    public hitATree = () => {
        this.animation.stop();
        Accelerometer.stopWatch();

        // this.state.isStarted = false;

        store.dispatch(hitATreeAction());
    };

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

    public getIntersections() {
        return this.objectsIntersections;
    }

}