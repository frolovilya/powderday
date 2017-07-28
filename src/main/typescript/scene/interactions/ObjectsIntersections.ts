import Circle from "scene/shapes/Circle";
import Scene from "scene/Scene";
import {SceneObject} from "scene/SceneObject";
import {Coords} from "scene/types/Coords";
import SceneLayer from "scene/SceneLayer";

export default class ObjectsIntersections {

    private intersectCallbacks = {};

    check(scene: Scene) {

        // TODO functional
        let sceneObjects = [];
        let sceneLayers = scene.getLayers();
        for(let i in sceneLayers) {
            // let layerObjects = sceneLayers[i].getObjects();
            // sceneObjects = sceneObjects.concat(layerObjects);
            sceneObjects = sceneObjects.concat(sceneLayers[i].getObjects());
        }

        // get callback classes
        for(let k in this.intersectCallbacks) {
            let classNames = k.split(",");
            let fire = false;

            let aObjects = [];
            let bObjects = [];
            for(let sceneObject of sceneObjects) {
                if(sceneObject.getClassName() == classNames[0]) {
                    aObjects.push(sceneObject)
                } else if(sceneObject.getClassName() == classNames[1]) {
                    bObjects.push(sceneObject);
                }
            }
            // sceneObjects.forEach((sceneObject) => {
            //
            // });

            if(aObjects.length > 0 && bObjects.length > 0) {

                for (let i = 0; i < aObjects.length; i++) {
                    fire = false;

                    for (let j = 0; j < bObjects.length; j++) {
                        if (this.checkObjectsIntersection(aObjects[i], bObjects[j])) {
                            fire = true;
                            break;
                        }
                    }

                    if (fire) {
                        this.fireCallbacks(classNames[0], classNames[1]);
                        break;
                    }
                }

            }
        }
    }

    checkObjectsIntersection(objectA: SceneObject, objectB: SceneObject) {
        let aShape = objectA.getShapes()[0];
        let bShape = objectB.getShapes()[0];

        let aAbsoluteCoords = this.toAbsoluteCoords(
            this.toLayerCoords(aShape.getCoords(), objectA), objectA.getLayer());

        let bAbsoluteCoords = this.toAbsoluteCoords(
            this.toLayerCoords(bShape.getCoords(), objectB), objectB.getLayer());

        let isIntersect = this.checkCircles(aAbsoluteCoords, aShape.getRadius(),
                                 bAbsoluteCoords, bShape.getRadius());
        if(isIntersect) {
            console.log(aAbsoluteCoords, aShape.getRadius(), bAbsoluteCoords, bShape.getRadius());
        }

        return isIntersect;

    }

    toLayerCoords(coords: Coords, sceneObject: SceneObject): Coords {
        return {
            x: sceneObject.getCoords().x + Math.round(coords.x / sceneObject.getScale() * 100) / 100,
            y: sceneObject.getCoords().y + Math.round(coords.y / sceneObject.getScale() * 100) / 100
        };
    }

    toAbsoluteCoords(coords: Coords, layer: SceneLayer) {
        return {
            x: coords.x + layer.getTranslation().x,
            y: coords.y + layer.getTranslation().y
        };
    }

    checkCircles(coords1: Coords, radius1: number,
                 coords2: Coords, radius2: number): boolean {
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

    fireCallbacks(a: string, b: string) {
        let id = [a, b].sort().join(",");

        if(this.intersectCallbacks[id] == undefined)
            return;

        let cb = this.intersectCallbacks[id];
        for(let i = 0; i < cb.length; i++) {
            cb[i]();
        }

        //this.intersectCallbacks[id].length = 0;
    }

}