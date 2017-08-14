import {LayerObject} from "scene/layers/objects/LayerObject";

export const wrap = function(store, getUpdateProps: (state?) => object, sceneObject: LayerObject) {
    let LayerObjectWrap = class {
        update(props) {
            const propsToUpdate = getUpdateProps(store ? store.getState() : null);
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
        transform() {
            return sceneObject.transform();
        }
    };

    return new LayerObjectWrap();
};