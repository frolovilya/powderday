import {SceneObject} from "scene/SceneObject";
import SceneLayer from "scene/SceneLayer";
import {Coords} from "scene/types/Coords";
import * as React from "react";

export abstract class AbstractSceneObject extends React.Component implements SceneObject {

    protected layer: SceneLayer;

    protected coords: Coords;
    protected scale: number = 1;

    props: {
        layer?: SceneLayer;
    };

    constructor(props) {
        super(props);

        this.layer = this.props.layer;
    }

    setLayer(layer: SceneLayer) {
        console.log("set layer!", layer);
        this.layer = layer;
    }
    getLayer() {
        return this.layer;
    }

    getCoords() {
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

    reset() {
    }

    getClassName() {
        return "generic";
    }

    getSize() {
        return {
            width: 0,
            height: 0
        };
    }

    getShapes() {
        return [];
    }

    render() {
        if(this.getLayer() /*&& this.getLayer().isReady()*/) {
            this.transform();
        }

        return null;
    }

    abstract transform();

}