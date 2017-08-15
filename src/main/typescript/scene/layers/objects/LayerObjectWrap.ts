import {LayerObject} from "scene/layers/objects/LayerObject";

export const wrap = function(store, getUpdateProps: (state?) => object, sceneObject: LayerObject) {

    let LayerObjectWrap = function() {};
    LayerObjectWrap.prototype = Object.create(sceneObject);
    LayerObjectWrap.prototype.update = function(props) {
        const propsToUpdate = getUpdateProps(store ? store.getState() : null);
        sceneObject.update({
            ...propsToUpdate,
            ...props
        })
    };

    return new LayerObjectWrap();
};