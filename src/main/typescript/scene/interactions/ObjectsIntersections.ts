import {LayerObject} from "scene/layers/objects/LayerObject";
import {Point} from "scene/types/Point";
import Circle from "scene/layers/objects/shapes/Circle";
import Shape from "scene/layers/objects/shapes/Shape";

export default class ObjectsIntersections {

    private intersectCallbacks = {};

    public check(state) {

        let sceneObjectsRegistry = state.registry.objects;

        // get callback classes
        for(let callbackName in this.intersectCallbacks) {
            let [classA, classB] = callbackName.split(",");

            const aObjects = sceneObjectsRegistry[classA];
            const bObjects = sceneObjectsRegistry[classB];

            if(aObjects && bObjects) {
                for (let i = 0; i < aObjects.length; i++) {
                    for (let j = 0; j < bObjects.length; j++) {
                        if (this.checkObjectsIntersection(aObjects[i], bObjects[j])) {
                            this.fireCallbacks(classA, classB);
                            break;
                        }
                    }
                }

            }
        }
    }

    private getShapes(layerObject: LayerObject) {
        return layerObject.getChildrenObjects().filter((layerObject) => {
            return layerObject instanceof Shape;
        });
    }

    private checkObjectsIntersection(objectA: LayerObject, objectB: LayerObject) {
        let aShape = this.getShapes(objectA)[0];
        let bShape = this.getShapes(objectB)[0];

        let aAbsoluteCoords = this.toAbsoluteCoords(aShape);
        let bAbsoluteCoords = this.toAbsoluteCoords(bShape);

        let isIntersect = this.checkCircles(aAbsoluteCoords, (aShape as Circle).getRadius(),
                                 bAbsoluteCoords, (bShape as Circle).getRadius());
        if(isIntersect) {
            console.log(aAbsoluteCoords, bAbsoluteCoords);
            bShape.update({
                radius: 20
            });
        }

        return isIntersect;

    }

    private toAbsoluteCoords(layerObject: LayerObject): Point {

        const translation = layerObject.getCanvas().getTranslation();
        const coords = layerObject.getCoords().getPoint();

        return {
            x: coords.x + translation.x,
            y: coords.y + translation.y
        }

    }

    private checkCircles(coords1: Point, radius1: number,
                 coords2: Point, radius2: number): boolean {
        let distance = Math.sqrt(
            Math.pow(coords2.x - coords1.x, 2)
            + Math.pow(coords2.y - coords1.y, 2)
        );

        return distance <= (radius1 + radius2);
    }

    onIntersect(a: string, b: string, callback) {
        let id = [a, b].sort().join(",");

        console.log("onIntersect: " + id);

        if(this.intersectCallbacks[id] == undefined)
            this.intersectCallbacks[id] = [];

        this.intersectCallbacks[id].push(callback);
    }

    private fireCallbacks(a: string, b: string) {
        let id = [a, b].sort().join(",");

        if(this.intersectCallbacks[id] == undefined)
            return;

        console.log("ObjectsIntersections.fireCallbacks", a, b);

        let cb = this.intersectCallbacks[id];
        for(let i = 0; i < cb.length; i++) {
            cb[i]();
        }

    }

}