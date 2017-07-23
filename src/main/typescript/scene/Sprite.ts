import {Coords} from "./types/Coords";
import {Size} from "./types/Size";

export default class Sprite {

    protected image: HTMLImageElement;
    protected size: Size;

    protected coords: Coords;

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

}