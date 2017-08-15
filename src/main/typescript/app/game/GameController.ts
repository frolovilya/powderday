import Model from "app/game/Model";
import Animation from "scene/Animation";
import Accelerometer from "device/Accelerometer";
import store from "app/game/Store";
import {hitATreeAction, pauseGameAction, startGameAction} from "app/game/reducers/GameReducer";
import {moveAction, resetAction} from "app/game/scene/reducers/SceneReducer";
import ObjectsInteractions from "scene/interactions/ObjectsInteractions";

/**
 * Methods to change game state
 */
export default {

    _animation: new Animation(),
    _objectsInteractions: new ObjectsInteractions(),

    startGame() {
        store.dispatch(startGameAction());

        Accelerometer.startWatch(Model.parameters.time * 1000);
        this._animation.start(() => {
            store.dispatch(moveAction(Accelerometer.getAcceleration()));
            // checking interactions after each scene update
            this._objectsInteractions.check(store.getState());
        });
    },

    stopGame() {
        this._animation.stop();
        Accelerometer.stopWatch();

        store.dispatch(pauseGameAction());
    },

    hitATree() {
        this._animation.stop();
        Accelerometer.stopWatch();

        store.dispatch(hitATreeAction());
    },

    restartGame() {
        store.dispatch(resetAction());
    },

    interactions() {
        return this._objectsInteractions;
    }

}