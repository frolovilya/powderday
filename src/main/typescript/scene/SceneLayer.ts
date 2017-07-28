import {SceneObject} from "scene/SceneObject";
import Scene from "scene/Scene";
import {Size} from "scene/types/Size";
import {Coords} from "scene/types/Coords";

export default class SceneLayer {

    // private id;

    private scene: Scene;

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private translation;

    private objectsList: SceneObject[] = [];

    constructor(private layerId: string) {
        this.canvas = this.createCanvas(true);
        this.context = this.canvas.getContext("2d");

        // keep the track of layer translation to get absolute coords
        this.translation = {
            x: 0,
            y: 0
        };
    }

    placeAt(scene: Scene, zIndex: string) {
        this.scene = scene;
        this.canvas.style.zIndex = zIndex;

        scene.addLayer(this);

        this.fitToSceneSize();

        this.onReady();

        return this;
    }

    protected onReady() {
    }

    getId() {
        return this.layerId;
    }

    getScene() {
        return this.scene;
    }

    private createCanvas(enableTranslate3d: boolean) {
        let canvas = document.createElement("canvas");
        canvas.id = this.layerId;
        // canvas.style.zIndex = zIndex;
        if(enableTranslate3d)
            canvas.className = "translate3d";

        return canvas;
    }

    getCanvas() {
        return this.canvas;
    }

    getContext(): CanvasRenderingContext2D {
        return this.context;
    }

    translate(coords: Coords) {
        this.translation.x += coords.x;
        this.translation.y += coords.y;

        this.context.translate(coords.x, coords.y);
    }

    getTranslation() {
        return this.translation;
    }

    clearTransform() {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        /*this.translate(
            this.canvas.width / 2,
            this.canvas.height / 2
        );*/
        this.translation.x = this.canvas.width / 2;
        this.translation.y = this.canvas.height / 2;

        this.context.translate(this.translation.x, this.translation.y);
        /*layer.context.translate(
            layer.canvas.width / 2,
            layer.canvas.height / 2
        );*/
    }

    resize(newSize: Size) {
        this.canvas.width = newSize.width;
        this.canvas.height = newSize.height;
    }

    fitToSceneSize() {
        this.resize( this.scene.getSize() );
    }

    isPointVisible(point: Coords) {
        let sceneSize = this.scene.getSize();
        return ( point.x > 0 && point.x < sceneSize.width
            && point.y > 0 && point.y < sceneSize.height );
    }

    clear() {
        //this.resize(this.canvas.width, this.canvas.height);
        this.context.save();
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.restore();
    }

    addObject(sceneObject: SceneObject) {
        sceneObject.setLayer(this);
        this.objectsList.push(sceneObject);
    }

    removeAllObjects() {
        this.objectsList.length = 0;
    }

    getObjects() {
        return this.objectsList;
    }

    render() {
        for(let i = 0; i < this.objectsList.length; i++) {
            let obj = this.objectsList[i];

            if(obj.isActual()) {
                // render if visible
                if(obj.isVisible()) {
                    obj.render();
                }

            } else {
                // delete object if it's not longer needed
                this.objectsList.splice(i, 1);
                i--;

            }
        }
    }

    reset() {
        this.objectsList
            .filter((sceneObject) => sceneObject.isActual())
            .map((sceneObject) => sceneObject.reset());
    }

}
