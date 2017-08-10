import {SceneObject} from "scene/SceneObject";
import {Point} from "scene/types/Point";
import Circle from "scene/shapes/Circle";

export default class ObjectsIntersections {

    private intersectCallbacks = {};
    
    // constructor() {
    //     function select(state) {
    //         return state.scene.movement
    //     }
    //
    //     let currentValue;
    //     store.subscribe(() => {
    //         let previousValue = currentValue;
    //         currentValue = select(store.getState());
    //
    //         if(previousValue != currentValue)
    //             this.check(store.getState());
    //     });
    // }


    public check(state) {
        // console.log("ObjectsIntersections.check()", state);

        let sceneObjectsRegistry = state.registry.objects;

        // let sceneObjects = [];
        // let sceneLayers = scene.getLayers();
        // for(let sceneLayer of sceneLayers) {
        //     sceneObjects = sceneObjects.concat(sceneLayer.getObjects());
        // }
        //
        // // let sceneObjects = scene.getLayers()
        // //     .map((layer: SceneLayer) => layer.getObjects())
        // //     .reduce((a, b) => a.concat(b), []);
        // //
        // // Object.keys(this.intersectCallbacks).map((callbackName) => {
        // //
        // //     // let objectsByClasses = callbackName.split(",").map((className) => {
        // //     //     return sceneObjects.filter(sceneObject => sceneObject.getClassName() == className)
        // //     // })
        // //
        // //     let [classA, classB] = callbackName.split(",");
        // //     sceneObjects.reduce(([objectsA, objectsB], sceneObject) => {
        // //
        // //         if(sceneObject.getClassName() == classA) {
        // //             objectsA.push(sceneObject)
        // //         } else if(sceneObject.getClassName() == classB) {
        // //             objectsB.push(sceneObject)
        // //         }
        // //
        // //         return [objectsA, objectsB]
        // //
        // //     }, [[], []]);
        // //
        // //
        // //
        // // });


        // get callback classes
        for(let callbackName in this.intersectCallbacks) {
            let [classA, classB] = callbackName.split(",");

            // let aObjects = [];
            // let bObjects = [];
            // for(let sceneObject of sceneObjects) {
            //     if(sceneObject.getClassName() == classA) {
            //         aObjects.push(sceneObject)
            //     } else if(sceneObject.getClassName() == classB) {
            //         bObjects.push(sceneObject);
            //     }
            // }

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

    private getShapes(sceneObject: SceneObject) {
        return sceneObject.getChildrenObjects().filter((sceneObject) => {
            return sceneObject instanceof Circle;
        });
    }

    private checkObjectsIntersection(objectA: SceneObject, objectB: SceneObject) {
        let aShape = this.getShapes(objectA)[0];
        let bShape = this.getShapes(objectB)[0];

        // let aAbsoluteCoords = this.toAbsoluteCoords(
        //     this.toLayerCoords(aShape.getCoords(), objectA), objectA.getLayer());
        //
        // let bAbsoluteCoords = this.toAbsoluteCoords(
        //     this.toLayerCoords(bShape.getCoords(), objectB), objectB.getLayer());

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

    // toLayerCoords(coords: Coords, sceneObject: SceneObject): Coords {
    //     return {
    //         x: sceneObject.getCoords().x + Math.round(coords.x / sceneObject.getScale() * 100) / 100,
    //         y: sceneObject.getCoords().y + Math.round(coords.y / sceneObject.getScale() * 100) / 100
    //     };
    // }
    //
    private toAbsoluteCoords(sceneObject: SceneObject): Point {
        // return {
        //     x: coords.x + layer.getCanvas().getTranslation().x,
        //     y: coords.y + layer.getCanvas().getTranslation().y
        // };

        const translation = sceneObject.getCanvas().getTranslation();
        const coords = sceneObject.getCoords().getPoint();

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

        //this.intersectCallbacks[id].length = 0;
    }

}