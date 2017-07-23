/*
 * Scene and layers manipulation
 */
import SceneLayer from "./SceneLayer";
import SceneIntersections from "./SceneIntersections";

export default class Scene {

    private debug;

    private element;

    private layers = {};

    public intersections = new SceneIntersections();

    constructor(elementId) {
        this.debug = true;

        // initialize scene element
        this.element = document.getElementById(elementId);
        this.element.className = "scene";
    }

    getWidth() {
        return parseInt(this.element.style.width);
    }

    getHeight() {
        return parseInt(this.element.style.height);
    }

    // set scene size
    resize(width, height) {
        this.element.style.width = width + "px";
        this.element.style.height = height + "px";
    }

    createLayer(layerId, zIndex, enable3d) {
        var canvas = document.createElement("canvas");
        canvas.id = layerId;
        //canvas.style = "z-index: " + zIndex;
        canvas.style.zIndex = zIndex;
        this.element.appendChild(canvas);
        if(enable3d)
            canvas.className = "translate3d";

        this.layers[layerId] = new SceneLayer(this, canvas);
        this.layers[layerId].fitToSceneSize();

        return this.layers[layerId];
    }

    getLayer(layerId) {
        return this.layers[layerId];
    }

    render() {
        // clear intersection points list
        this.intersections.clearPoints();

        // render layers
        for(var i in this.layers) {
            this.layers[i].render();
        }

        // check for new intersections & fire callbacks
        this.intersections.check();
    }
}

/*
 * Animation
 */
(<any>window).animId = null;
(<any>window).requestAnimFrame = (function() {
    return  window.requestAnimationFrame        ||
        window.webkitRequestAnimationFrame  ||
        (<any>window).mozRequestAnimationFrame     ||
        function(callback) {
            return window.setTimeout(callback, 1000 / 30);
        };
})();
(<any>window).cancelAnimFrame = (function() {
    return  window.cancelAnimationFrame       ||
        window.webkitCancelAnimationFrame ||
        (<any>window).mozCancelAnimationFrame    ||
        function(id) {
            window.clearTimeout(id);
        }
})();
