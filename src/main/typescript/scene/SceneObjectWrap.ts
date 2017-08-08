import {SceneObject} from "./SceneObject";
import store from "../app/Store";

export const wrap = function(getUpdateProps: (state) => object, sceneObject: SceneObject) {
    let SceneObjectWrap = class {
        update(props) {
            const propsToUpdate = getUpdateProps(store.getState());
            sceneObject.update({
                ...propsToUpdate,
                ...props
            })
        }
        getCanvas() {
            return sceneObject.getCanvas();
        }
        getCoords() {
            return sceneObject.getCoords();
        }
        getClassName() {
            return sceneObject.getClassName();
        }
        setState(stateUpdates) {
            return sceneObject.setState(stateUpdates);
        }
        getChildrenObjects() {
            return sceneObject.getChildrenObjects();
        }
        registerObject() {
            return sceneObject.registerObject();
        }
        transform() {
            return sceneObject.transform();
        }
    };

    return new SceneObjectWrap();
};