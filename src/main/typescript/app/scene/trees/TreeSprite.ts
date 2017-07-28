import Sprite from "scene/Sprite";
import {Coords} from "scene/types/Coords";
import SceneLayer from "scene/SceneLayer";

export default class TreeSprite extends Sprite {

    draw(layer: SceneLayer, parentCoords: Coords, scale: number = 1) {
        let context = layer.getContext();

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