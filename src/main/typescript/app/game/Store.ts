import {createStore} from "redux";
import { combineReducers } from 'redux'
import {gameReducer} from "app/game/reducers/GameReducer";
import {sceneReducer} from "app/game/scene/reducers/SceneReducer";
import {objectsRegistryReducer} from "scene/interactions/reducers/ObjectsRegistryReducer";

/**
 * Redux store
 */
let store = createStore(combineReducers({
    game: gameReducer,
    scene: sceneReducer,
    registry: objectsRegistryReducer
}));

(window as any).store = store;

export default store;