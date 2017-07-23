import Sprite from "../scene/Sprite";
import {Coords} from "../scene/types/Coords";

export default class TreeSprite extends Sprite {

    draw(context: CanvasRenderingContext2D, parentCoords: Coords, scale: number = 1) {
        context.beginPath();
        context.drawImage(
            this.image,
            parentCoords.x + this.coords.x,
            parentCoords.y + this.coords.x,
            this.size.width / scale,
            this.size.height / scale
        );
        context.closePath();
    }

}