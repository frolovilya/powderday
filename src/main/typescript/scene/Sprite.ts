import {Coords} from "scene/types/Coords";
import {Size} from "scene/types/Size";
import SceneLayer from "./SceneLayer";
import * as React from "react";

export abstract class Sprite extends React.Component {

    protected image: HTMLImageElement;
    protected size: Size;
    //
    // protected coords: Coords;

    // protected isImageLoaded: boolean = false;

    props: {
        coords: Coords;
        layer: SceneLayer;
    };

    state: {
        imageLoaded: boolean;
    };

    // constructor(imageSrc: string, size: Size, coords: Coords = {x: 0, y: 0}) {
    //     this.image = new Image();
    //     this.image.src = imageSrc;
    //
    //     this.size = size;
    //
    //     this.coords = coords;
    // }

    constructor(props) {
        super(props);

        this.state = {
            imageLoaded: false
        };
    }

    protected initImage(imageSrc: string, size: Size) {
        this.image = new Image();
        this.image.src = imageSrc;

        this.image.onload = () => {
            console.log("image loaded!");
            this.setState({
                imageLoaded: true
            });
        };

        this.size = size;
    }

    getSize() {
        return this.size;
    }

    getRatio() {
        return this.size.width / this.size.height;
    }

    getImage() {
        return this.image;
    }

    getCoords() {
        return this.props.coords;
    }

    render() {
        if(this.state.imageLoaded) {
            this.draw()
        }

        return null;
    }

    abstract draw();

}