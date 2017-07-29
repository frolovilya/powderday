import {Coords} from "scene/types/Coords";
import {Size} from "scene/types/Size";
import SceneLayer from "./SceneLayer";

export default class Sprite {

    protected image: HTMLImageElement;
    protected size: Size;

    protected coords: Coords;

    protected isImageLoaded: boolean = false;

    constructor(imageSrc: string, size: Size, coords: Coords = {x: 0, y: 0}) {
        this.image = new Image();
        this.image.src = imageSrc;

        this.size = size;

        this.coords = coords;
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
        return this.coords;
    }

    protectedDraw(layer: SceneLayer, parentCoords: Coords, scale: number = 1) {}

    draw(layer: SceneLayer, parentCoords: Coords, scale: number = 1) {
        if(this.isImageLoaded) {
            this.protectedDraw(layer, parentCoords, scale)
        } else {
            this.image.onload = () => {
                this.isImageLoaded = true;
                this.protectedDraw(layer, parentCoords, scale)
            }
        }
    }

}