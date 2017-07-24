/*
 * Scene and layers manipulation
 */
import SceneLayer from "./SceneLayer";
import SceneIntersections from "./intersections/SceneIntersections";

export default class Scene {

    private domNode: HTMLElement;

    private layers = {};

    public intersections = new SceneIntersections();

    constructor(elementId: string) {
        // TODO handle element not found
        this.domNode = document.getElementById(elementId);
        this.domNode.className = "scene";
    }

    getWidth() {
        return parseInt(this.domNode.style.width);
    }

    getHeight() {
        return parseInt(this.domNode.style.height);
    }

    // set scene size
    resize(width: number, height: number) {
        this.domNode.style.width = width + "px";
        this.domNode.style.height = height + "px";

        // TODO fit layer's sizes?
    }

    createLayer(layerId: string, zIndex: string): SceneLayer {
        let layer = new SceneLayer(this, layerId, zIndex);
        layer.placeAt(this.domNode);

        this.layers[layerId] = layer;

        return this.layers[layerId];
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

// /*
//  * Animation
//  */
// (<any>window).animId = null;
// (<any>window).requestAnimFrame = (function() {
//     return  window.requestAnimationFrame        ||
//         window.webkitRequestAnimationFrame  ||
//         (<any>window).mozRequestAnimationFrame     /*||
//         function(callback) {
//             return window.setTimeout(callback, 1000 / 30);
//         };*/
// })();
// (<any>window).cancelAnimFrame = (function() {
//     return  window.cancelAnimationFrame       ||
//         window.webkitCancelAnimationFrame ||
//         (<any>window).mozCancelAnimationFrame    /*||
//         function(id) {
//             window.clearTimeout(id);
//         }*/
// })();
