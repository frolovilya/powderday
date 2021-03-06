import {GameState} from "app/game/GameState";

/**
 * Game state
 */
const defaultState = {
    game: {
        state: GameState.STOPPED
    }
};

/**
 * (Redux) state reducer that reacts to actions changing game state
 *
 * @param state
 * @param action
 */
export const gameReducer = (state = defaultState.game, action) => {
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
        case "RESET":
            return defaultState.game;
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