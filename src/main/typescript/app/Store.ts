import {createStore} from "redux";
import { combineReducers } from 'redux'
import Model from "app/Model";
import {SceneObject} from "../scene/SceneObject";
import {default as GameController, GameState} from "app/GameController";

const defaultState = {
    game: {
        state: GameState.STOPPED
    },
    scene: {
        acceleration: {
            x: 0,
            y: 0,
            z: 0
        },
        movement: {
            angle: 0,
            Vy: 0,
            Vx: 0,
            Sx: 0,
            Sy: 0
        }
    },
    registry: {
        objects: {}
    }
};

export const moveAction = (acceleration) => {
    return {
        type: "MOVE",
        acceleration
    }
};

(window as any).moveAction = moveAction;

const sceneReducer = (state = defaultState.scene, action) => {
    switch(action.type) {
        case "MOVE": {
            const acc = action.acceleration;

            const angle = Model.calcAngle(state.movement.angle, acc.x);
            const kp = Model.calcKantPressure(acc.y);
            const Vy = Model.Va(state.movement.Vy, angle, kp, Model.parameters.time);
            const Vx = Model.Vax(Vy, angle);

            const Sx = Vx * Model.parameters.time * 10;
            const Sy = -Vy * Model.parameters.time * 10 * 1.5;

            return {
                ...state,
                acceleration: acc,
                movement: {
                    angle,
                    Vy,
                    Vx,
                    Sx,
                    Sy
                }
            }
        }
        default:
            return state;
    }
};


const gameStateReducer = (state = defaultState.game, action) => {
    switch(action.type) {
        case "START":
            return {
                ...state,
                state: GameState.STARTED
            };
        case "PAUSE":
            return {
                ...state,
                state: GameState.PAUSED
            };
        case "HIT_A_TREE":
            return {
                ...state,
                state: GameState.HIT_A_TREE
            };
        default:
            return state;
    }
};

export const startGameAction = () => {
    return {
        type: "START"
    }
};

export const pauseGameAction = () => {
    return {
        type: "PAUSE"
    }
};

export const hitATreeAction = () => {
    return {
        type: "HIT_A_TREE"
    }
};

const sceneInteractionsReducer = (state = defaultState.registry, action) => {
    switch(action.type) {
        case "REGISTER_SCENE_OBJECT":
            return {
                ...state,
                objects: {
                    ...(state.objects),
                    [action.className]: action.sceneObjects
                }
            };
        default:
            return state;
    }
};

export const registerSceneObjectsAction = (sceneObjects: SceneObject[] | SceneObject) => {
    const objects = Array.isArray(sceneObjects) ? sceneObjects : [sceneObjects];

    return {
        type: "REGISTER_SCENE_OBJECT",
        className: objects[0].getClassName(),
        sceneObjects: objects
    }
};


let store = createStore(combineReducers({
    game: gameStateReducer,
    scene: sceneReducer,
    registry: sceneInteractionsReducer
}));
(window as any).store = store;

export default store;

