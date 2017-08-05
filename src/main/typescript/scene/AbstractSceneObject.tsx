import {SceneObject} from "scene/SceneObject";
import SceneLayer from "scene/SceneLayer";
import {Coords} from "scene/types/Coords";
import * as React from "react";
import Canvas from "./Canvas";

export abstract class AbstractSceneObject implements SceneObject {

    // protected layer: SceneLayer;
    // protected coords: Coords;
    // protected scale: number = 1;

    props: {
        canvas: Canvas;
        coords?: Coords;
        scale?: number;
    };

    state: {
        childrenObjects: SceneObject[];
    };
    //
    // props: {
    //     canvas: Canvas;
    // };

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

    // setLayer(layer: SceneLayer) {
    //     console.log("set layer!", layer);
    //     this.layer = layer;
    // }
    // getLayer() {
    //     return this.props.layer;
    // }

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
    //
    // getCoords() {
    //     return this.props.coords;
    // }
    // //
    // setScale(scale: number) {
    //     this.setState({
    //         scale: scale
    //     });
    // }
    // getScale() {
    //     return this.state.scale;
    // }

    getClassName() {
        return "generic";
    }

    // getSize() {
    //     return {
    //         width: 0,
    //         height: 0
    //     };
    // }
    //
    // getShapes() {
    //     return [];
    // }

    getChildrenObjects() {
        return this.state.childrenObjects || [];
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
                    canvas: this.props.canvas
                });
            });
        }

    }

    abstract transform();

}