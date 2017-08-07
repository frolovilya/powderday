import {SceneObject} from "scene/SceneObject";
import * as React from "react";
import Canvas from "./Canvas";
import Coords from "./types/Coords";
import store, {registerSceneObjectsAction} from "../app/Store";

export abstract class AbstractSceneObject implements SceneObject {

    props: {
        canvas: Canvas;
        coords?: Coords;
        scale?: number;
    };

    state: {
        childrenObjects: SceneObject[];
    };

    constructor(props) {
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

    registerObject() {
        store.dispatch(registerSceneObjectsAction(this));
    }

    update(props?) {

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