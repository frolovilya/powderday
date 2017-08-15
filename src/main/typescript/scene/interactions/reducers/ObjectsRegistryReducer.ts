import {LayerObject} from "scene/layers/objects/LayerObject";

/**
 * Objects registry contains objects grouped by class names (LayerObject.getClassName())
 */
const defaultState = {
    registry: {
        objects: {}
    }
};

/**
 * (Redux) state reducer that reacts to actions changing Objects Registry
 *
 * @param state
 * @param action
 */
export const objectsRegistryReducer = (state = defaultState.registry, action) => {
    switch(action.type) {
        case "REGISTER_SCENE_OBJECT":
            return {
                ...state,
                objects: {
                    ...(state.objects),
                    [action.className]: action.sceneObjects
                }
            };
        case "RESET":
            return defaultState.registry;
        default:
            return state;
    }
};

/**
 * Add LayerObject to objects registry
 *
 * @param layerObject
 */
export const registerSceneObjectsAction = (layerObject: LayerObject[] | LayerObject) => {
    const objects = Array.isArray(layerObject) ? layerObject : [layerObject];

    return {
        type: "REGISTER_SCENE_OBJECT",
        className: objects[0].getClassName(),
        sceneObjects: objects
    }
};

/**
 * Reset registry to default state
 */
export const resetAction = () => {
    return {
        type: "RESET"
    }
};
