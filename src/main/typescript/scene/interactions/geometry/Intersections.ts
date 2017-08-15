import Shape from "scene/layers/objects/shapes/Shape";
import Circle from "scene/layers/objects/shapes/Circle";
import {Point} from "scene/types/Point";
import {LayerObject} from "scene/layers/objects/LayerObject";

export default {

    check([shapesA, shapesB]: Shape[][]) {
        let shapeA = shapesA[0];
        let shapeB = shapesB[0];

        if(shapeA instanceof Circle && shapeB instanceof Circle) {
            return this._checkCircles(shapeA, shapeB);

        } else {
            throw new Error("Intersections check not implemented")
        }
    },

    _checkCircles(circleA: Circle, circleB: Circle) {
        let coordsA = this._toAbsoluteCoords(circleA);
        let radiusA = circleA.getRadius();

        let coordsB = this._toAbsoluteCoords(circleB);
        let radiusB = circleB.getRadius();

        let distance = Math.sqrt(
            Math.pow(coordsB.x - coordsA.x, 2)
            + Math.pow(coordsB.y - coordsA.y, 2)
        );

        return distance <= (radiusA + radiusB);
    },

    _toAbsoluteCoords(layerObject: LayerObject): Point {
        return layerObject.getCoords().getAbsolutePoint(layerObject.getCanvas().getTranslation());
    }

}