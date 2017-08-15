import Coords from "scene/Coords";
import {Size} from "scene/types/Size";
import Canvas from "scene/layers/Canvas";
import {AbstractLayerObject} from "scene/layers/objects/AbstractLayerObject";
import {LayerObject} from "scene/layers/objects/LayerObject";

/**
 * Abstract Sprite Layer Object.
 *
 * Draws single Image on top on Canvas.
 * Provides Images cache for faster loading.
 */
export abstract class Sprite extends AbstractLayerObject {

    static imageCache = {};

    protected image: HTMLImageElement;

    props: {
        imageSrc: string; // image source path
        size: Size; // image size
        coords: Coords; // coords relative to parent object
        scale: number; // image scale
        canvas: Canvas;
    };

    state: {
        childrenObjects: LayerObject[];
        imageLoaded: boolean;
    };

    constructor(props) {
        super(props);

        // images are cached once loaded
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

    transform() {
        if(this.state.imageLoaded) {
            this.draw()
        }
    }

    /**
     * All image drawing code should be placed here
     */
    abstract draw();

}