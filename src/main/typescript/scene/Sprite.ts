import {Coords} from "scene/types/Coords";
import {Size} from "scene/types/Size";
import SceneLayer from "./SceneLayer";
import * as React from "react";
import Canvas from "scene/Canvas";
import {AbstractSceneObject} from "./AbstractSceneObject";
import {SceneObject} from "scene/SceneObject";

export abstract class Sprite extends AbstractSceneObject {

    protected image: HTMLImageElement;
    // protected size: Size;

    props: {
        imageSrc: string,
        size: Size;
        coords: Coords;
        canvas: Canvas;
    };

    state: {
        childrenObjects: SceneObject[];
        imageLoaded: boolean
    };

    constructor(props) {
        super(props);

        this.state.imageLoaded = false;

        this.image = new Image();
        this.image.src = this.props.imageSrc;

        this.image.onload = () => {
            this.setState({
                imageLoaded: true
            });
        };
    }

    getSize() {
        return this.props.size;
    }

    getRatio() {
        return this.props.size.width / this.props.size.height;
    }

    getImage() {
        return this.image;
    }

    getCoords() {
        return this.props.coords;
    }

    transform() {
        if(this.state.imageLoaded) {
            this.draw()
        }
    }

    abstract draw();

}