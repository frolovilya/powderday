import {createStore} from "redux";
import {SceneObject} from "scene/SceneObject";

const defaultState = {
    registry: {
        objects: {}
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


let objectsRegistry = createStore(sceneInteractionsReducer);
(window as any).objectsRegistry = objectsRegistry;

export default objectsRegistry;

