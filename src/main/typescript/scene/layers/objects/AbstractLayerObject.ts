import {LayerObject} from "scene/layers/objects/LayerObject";
import Canvas from "scene/layers/Canvas";
import Coords from "scene/Coords";

export abstract class AbstractLayerObject implements LayerObject {

    props: {
        canvas: Canvas;
        coords: Coords;
        scale: number;
    };

    state: {
        childrenObjects: LayerObject[];
    };

    constructor(props?) {
        this.props = {
            canvas: null,
            coords: new Coords({
                x: 0,
                y: 0
            }),
            scale: 1,
            ...props
        };

        this.state = {
            childrenObjects: []
        };
    }

    setState(stateUpdates) {
        const state = this.state;
        this.state = {
            state,
            ...stateUpdates
        };

        this.update();
    }
    
    getCanvas() {
        return this.props.canvas;
    }

    getCoords() {
        return this.props.coords;
    }

    getClassName() {
        return "generic";
    }

    getChildrenObjects() {
        return this.state.childrenObjects || [];
    }

    update(props?) {

        // console.log("update() sceneObject " + this.getClassName(), props);

        this.props = {
            ...(this.props),
            ...props
        };
        
        if(this.getCanvas()) {

            this.transform();

            this.getChildrenObjects().map((sceneObject) => {
                sceneObject.update({
                    canvas: this.getCanvas()
                });
            });
        }

    }

    transform() {};

}