import {LayerObject} from "scene/layers/objects/LayerObject";

/**
 * Wrapper function to update Layer Object's properties
 * with the values returned by getUpdateProps().
 *
 * Used when already defined Layer Object needs to dynamically update properties
 * based on some parent Layer Object props or Redux store state.
 *
 * @param store Redux store
 * @param getUpdateProps functions that returns props updates
 * @param sceneObject scene object to wrap
 */
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