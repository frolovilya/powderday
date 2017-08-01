import {createStore} from "redux";
import Model from "app/Model";

const defaultState = {
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
};

export const moveAction = (acceleration) => {
    return {
        type: "MOVE",
        acceleration
    }
};

// window.moveAction = moveAction;

const systemReducer = (state = defaultState, action) => {
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
    }

    return state;
};

let store = createStore(systemReducer);
// window.store = store;

export default store;

