import Model from "app/game/Model";
import ObjectsIntersections from "scene/interactions/ObjectsIntersections";
import Animation from "scene/Animation";
import Accelerometer from "device/Accelerometer";
import store from "./Store";
import {hitATreeAction, pauseGameAction, startGameAction} from "app/game/reducers/GameReducer";
import {moveAction, resetAction} from "app/game/scene/reducers/SceneReducer";

export default {

    _animation: new Animation(),
    _objectsIntersections: new ObjectsIntersections(),

    startGame() {
        store.dispatch(startGameAction());

        Accelerometer.startWatch(Model.parameters.time * 1000);
        this._animation.start(() => {
            store.dispatch(moveAction(Accelerometer.getAcceleration()));
            this._objectsIntersections.check(store.getState());
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

    getIntersections() {
        return this._objectsIntersections;
    }

}