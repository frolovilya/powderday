import {SceneObject} from "./SceneObject";
import Scene from "./Scene";

export default class SceneLayer {

    public scene: Scene;

    public canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    public translation;

    public objectsList: SceneObject[] = [];

    private onRenderCallbacks = {
        "BEFORE": []
    };

    constructor(scene: Scene, layerId: string, zIndex: string) {
        this.scene = scene;

        this.canvas = this.createCanvas(layerId, zIndex, true);
        this.context = this.canvas.getContext("2d");

        // keep the track of layer translation to get absolute coords
        this.translation = {
            x: 0,
            y: 0
        };
    }

    private createCanvas(layerId: string, zIndex: string, enableTranslate3d: boolean) {
        let canvas = document.createElement("canvas");
        canvas.id = layerId;
        canvas.style.zIndex = zIndex;
        if(enableTranslate3d)
            canvas.className = "translate3d";

        return canvas;
    }

    placeAt(domNode: HTMLElement) {
        domNode.appendChild(this.canvas);
        this.fitToSceneSize();
    }

    getContext(): CanvasRenderingContext2D {
        return this.context;
    }

    translate(x, y) {
        this.translation.x += x;
        this.translation.y += y;

        this.context.translate(x, y);
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

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    fitToSceneSize() {
        this.resize( this.scene.getWidth(), this.scene.getHeight() );
    }

    isPointVisible(x, y) {
        return ( x > 0 && x < this.scene.getWidth()
            && y > 0 && y < this.scene.getHeight() );
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

    registerOnBeforeRenderCallback(callback: () => void) {
        this.onRenderCallbacks.BEFORE.push(callback);
    }

    render() {
        this.onRenderCallbacks.BEFORE.map((callback) => callback(this.context));
        this.onRenderCallbacks.BEFORE.length = 0;

        for(let i = 0; i < this.objectsList.length; i++) {
            let obj = this.objectsList[i];

            if(obj.isActual()) {
                // render if visible
                if(obj.isVisible()) {
                    obj.render();

                    /* get object intersection points
                    let intersectPoints = obj.getIntersectionPoints(this);
                    for(let j = 0; j < intersectPoints.length; j++) {
                        this.scene.intersections.addPoint(intersectPoints[j]);
                    }*/
                }

            } else {
                // delete object if it's not longer needed
                this.objectsList.splice(i, 1);
                i--;

            }
        }
    }

}
