/*
 * Scene and layers manipulation
 */
import SceneLayer from "./SceneLayer";
import SceneIntersections from "./intersections/SceneIntersections";
import {Size} from "./types/Size";

export default class Scene {

    private domNode: HTMLElement;

    private layers = {};

    public intersections = new SceneIntersections();

    constructor(elementId: string) {
        // TODO handle element not found
        this.domNode = document.getElementById(elementId);
        this.domNode.className = "scene";
    }

    getSize(): Size {
        return {
            width: parseInt(this.domNode.style.width),
            height: parseInt(this.domNode.style.height)
        }
    }

    // set scene size
    resize(newSize: Size) {
        this.domNode.style.width = newSize.width + "px";
        this.domNode.style.height = newSize.height + "px";

        // TODO fit layer's sizes?
    }

    // createLayer(layerId: string, zIndex: string): SceneLayer {
    //     let layer = new SceneLayer(this, layerId, zIndex);
    //     layer.placeAt(this.domNode);
    //
    //     this.layers[layerId] = layer;
    //
    //     return this.layers[layerId];
    // }

    addLayer(layer: SceneLayer) {
        this.domNode.appendChild(layer.getCanvas());
        this.layers[layer.getId()] = layer;
    }

    getLayer(layerId: string): SceneLayer {
        return this.layers[layerId];
    }

    getLayers() {
        return this.layers;
    }

    render() {
        // render layers
        for(let i in this.layers) {
            this.layers[i].render();
        }

        // check for new intersections & fire callbacks
        this.intersections.check(this);
    }
}
