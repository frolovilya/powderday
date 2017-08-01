import {SceneObject} from "scene/SceneObject";
import SceneLayer from "scene/SceneLayer";
import {Coords} from "scene/types/Coords";
import * as React from "react";
import Canvas from "./Canvas";

export abstract class AbstractSceneObject extends React.Component implements SceneObject {

    protected layer: SceneLayer;

    protected coords: Coords;
    protected scale: number = 1;

    state: {
        childrenObjects;
    };

    props: {
        canvas: Canvas;
    };

    constructor(props) {
        super(props);

        // console.log("init scene object " + this.getClassName())
        
        this.state = {
            childrenObjects: []
        };

        // this.layer = this.props.layer;
    }

    // setLayer(layer: SceneLayer) {
    //     console.log("set layer!", layer);
    //     this.layer = layer;
    // }
    // getLayer() {
    //     return this.props.layer;
    // }
    
    getCanvas() {
        return this.props.canvas;
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

    getChildrenObjects() {
        return this.state.childrenObjects;
    }

    render() {
        // console.log("render scene object " + this.getClassName());
        
        if(this.getCanvas()) {

            this.transform();

            return <span>{this.getChildrenObjects()}
                {/*{React.Children.map(this.getChildrenObjects(), (child: any) => {*/}
                        {/*return React.cloneElement(child, {*/}
                            {/*canvas: this.getCanvas()*/}
                        {/*})*/}
                    {/*}*/}
                {/*)}*/}
            </span>
        }

        return null;
    }

    abstract transform();

}