import Model from "app/game/Model";

/**
 * Scene state
 */
const defaultState = {
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
        },
        score: 0
    }
};

/**
 * (Redux) state reducer that reacts to actions changing game scene
 *
 * @param state
 * @param action
 */
export const sceneReducer = (state = defaultState.scene, action) => {
    switch(action.type) {
        case "MOVE": {
            const acc = action.acceleration;

            const angle = Model.angle(state.movement.angle, acc.x);

            const Vy = Model.Va(state.movement.Vy, angle, acc.y);
            const Vx = Model.Vax(Vy, angle);

            const Sx = Model.Sx(Vx);
            const Sy = Model.Sy(Vy);

            const score = Model.score(state.score, Sy);

            return {
                ...state,
                acceleration: acc,
                movement: {
                    angle,
                    Vy,
                    Vx,
                    Sx,
                    Sy
                },
                score: score
            }
        }
        case "RESET":
            return defaultState.scene;
        default:
            return state;
    }
};

/**
 * Move scene
 *
 * @param acceleration device acceleration
 */
export const moveAction = (acceleration: DeviceAcceleration) => {
    return {
        type: "MOVE",
        acceleration
    }
};

export const resetAction = () => {
    return {
        type: "RESET"
    }
};