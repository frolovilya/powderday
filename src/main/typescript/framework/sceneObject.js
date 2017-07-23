/*
 * Object
 */

Scene.Object = function () {
    this.render = function (layer) {
        // abstract
    }

    this.isVisible = function (layer) {
        return true;
    }

    this.isActual = function (layer) {
        return true;
    }

    this.getIntersectionPoints = function (layer) {
        return [];
    }
}