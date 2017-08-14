import Coords from "scene/Coords";
import {Size} from "scene/types/Size";
import Canvas from "scene/layers/Canvas";
import {AbstractLayerObject} from "scene/layers/objects/AbstractLayerObject";
import {LayerObject} from "scene/layers/objects/LayerObject";

export abstract class Sprite extends AbstractLayerObject {

    static imageCache = {};

    protected image: HTMLImageElement;

    props: {
        imageSrc: string,
        size: Size;
        coords: Coords;
        scale: number;
        canvas: Canvas;
    };

    state: {
        childrenObjects: LayerObject[];
        imageLoaded: boolean
    };

    constructor(props) {
        super(props);

        if(!Sprite.imageCache[this.props.imageSrc]) {
            this.image = new Image();
            this.image.src = this.props.imageSrc;

            this.state.imageLoaded = false;
            this.image.onload = () => {
                Sprite.imageCache[this.props.imageSrc] = this.image;

                this.setState({
                    imageLoaded: true
                });
            };

        } else {
            this.image = Sprite.imageCache[this.props.imageSrc];
            this.state.imageLoaded = true;

        }

    }

    getSize() {
        return this.props.size;
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