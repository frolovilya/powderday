import {LayerObject} from "scene/layers/objects/LayerObject";

const defaultState = {
    registry: {
        objects: {}
    }
};

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

export const registerSceneObjectsAction = (layerObject: LayerObject[] | LayerObject) => {
    const objects = Array.isArray(layerObject) ? layerObject : [layerObject];

    return {
        type: "REGISTER_SCENE_OBJECT",
        className: objects[0].getClassName(),
        sceneObjects: objects
    }
};

export const resetAction = () => {
    return {
        type: "RESET"
    }
};
