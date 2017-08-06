import {SceneObject} from "scene/SceneObject";
import SceneLayer from "scene/SceneLayer";
import {Coords} from "scene/types/Coords";
import * as React from "react";
import Canvas from "./Canvas";
import Circle from "./shapes/Circle";
import objectsRegistry, {registerSceneObjectsAction} from "scene/interactions/ObjectsRegistry";

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
            coords: {
                x: 0,
                y: 0
            },
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

    getClassName() {
        return "generic";
    }

    getChildrenObjects() {
        return this.state.childrenObjects || [];
    }

    registerObject() {
        objectsRegistry.dispatch(registerSceneObjectsAction(this));
    }

    // getShapes() {
    //     return this.getChildrenObjects().filter((sceneObject) => {
    //         return sceneObject instanceof Circle;
    //     });
    // }

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