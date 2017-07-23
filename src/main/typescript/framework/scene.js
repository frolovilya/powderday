/*
 * Scene and layers manipulation
 */
var Scene = function(elementId) {
    this.debug = true;

    // initialize scene element
    this.element = document.getElementById(elementId);
    this.element.className = "scene";

    this.getWidth = function() {
        return parseInt(this.element.style.width);
    }

    this.getHeight = function() {
        return parseInt(this.element.style.height);
    }

    // set scene size
    this.resize = function(width, height) {
        this.element.style.width = width + "px";
        this.element.style.height = height + "px";
    }

    // layers manipulation
    this._layers = {};

    this.createLayer = function(layerId, zIndex, enable3d) {
        var canvas = document.createElement("canvas");
        canvas.id = layerId;
        canvas.style = "z-index: " + zIndex;
        this.element.appendChild(canvas);
        if(enable3d)
            canvas.className = "translate3d";

        this._layers[layerId] = new Scene.Layer(this, canvas);
        this._layers[layerId].fitToSceneSize();

        return this._layers[layerId];
    }

    this.getLayer = function(layerId) {
        return this._layers[layerId];
    }

    this.render = function() {
        // clear intersection points list
        Scene.Intersections.clearPoints();

        // render layers
        for(var i in this._layers) {
            this._layers[i].render();
        }

        // check for new intersections & fire callbacks
        Scene.Intersections.check();
    }
}

/*
 * Animation
 */
window.animId = null;
window.requestAnimFrame = (function() {
    return  window.requestAnimationFrame        ||
            window.webkitRequestAnimationFrame  ||
            window.mozRequestAnimationFrame     ||
            function(callback) {
                return window.setTimeout(callback, 1000 / 30);
            };
})();
window.cancelAnimFrame = (function() {
    return  window.cancelAnimationFrame       || 
            window.webkitCancelAnimationFrame || 
            window.mozCancelAnimationFrame    || 
            function(id) {
                window.clearTimeout(id);
            }
})();
