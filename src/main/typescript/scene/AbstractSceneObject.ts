import {SceneObject} from "./SceneObject";
import SceneLayer from "./SceneLayer";
import {Coords} from "./types/Coords";

export abstract class AbstractSceneObject implements SceneObject {

    protected layer: SceneLayer;

    protected coords: Coords;

    protected scale: number = 1;

    public setLayer(layer: SceneLayer) {
        this.layer = layer;
    }
    public getLayer() {
        return this.layer;
    }

    public getCoords() {
        return this.coords;
    }

    setScale(scale: number) {
        this.scale = scale;
    }
    getScale() {
        return this.scale;
    }

    isVisible() {
        return true;
    }

    isActual() {
        return true;
    }

    abstract getClassName();

    abstract getSize();

    abstract render();

    abstract getShapes();

}