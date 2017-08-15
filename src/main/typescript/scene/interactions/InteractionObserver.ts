import {LayerObject} from "scene/layers/objects/LayerObject";
import Shape from "scene/layers/objects/shapes/Shape";
import Intersections from "scene/interactions/geometry/Intersections"
import {InteractionType} from "scene/interactions/InteractionType";

type Callback = () => void

/**
 * Check interactions of defined interactionType, notify callbacks
 */
export default class InteractionObserver {

    private callbacks: Callback[];

    constructor(private interactionType: InteractionType,
                private classNames: string[]) {
        this.callbacks = [];
    }

    /**
     * Add Callback function that will be called when interaction occurs
     *
     * @param callback
     */
    public addCallback(callback: Callback) {
        this.callbacks.push(callback);
    }

    private notify() {
        for(let i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i]();
        }
    }

    /**
     * Check interaction of this.interactionType for objects with this.classNames.
     * Current implementation is simplified to check only two objects classes.
     *
     * @param sceneObjectsRegistry
     */
    public check(sceneObjectsRegistry) {
        let [aObjects, bObjects] = this.classNames.map((className) => sceneObjectsRegistry[className]);

        if (aObjects && bObjects) {
            for (let i = 0; i < aObjects.length; i++) {
                for (let j = 0; j < bObjects.length; j++) {
                    if (this.checkObjectsInteraction([aObjects[i], bObjects[j]])) {
                        this.notify();
                    }
                }
            }
        }
    }

    /**
     * To interact with others, Layer Object must contain
     * at least on children Layer Object of type Shape
     *
     * @param layerObject
     * @returns {Shape[]}
     */
    private getShapes(layerObject: LayerObject) {
        return layerObject.getChildrenObjects().filter((layerObject) => {
            return layerObject instanceof Shape;
        });
    }

    private checkObjectsInteraction(objects: LayerObject[]) {
        let shapes = objects
            .map((layerObject) => this.getShapes(layerObject) as Shape[])
            .filter((shapes) => shapes.length > 0);

        if(shapes.length < objects.length)
            return false;

        switch(this.interactionType) {
            case InteractionType.INTERSECT:
                return Intersections.check(shapes);
            default:
                return false;
        }
    }

}