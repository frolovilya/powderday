import Sprite from "../scene/Sprite";
import {Coords} from "../scene/types/Coords";

export default class PlayerSprite extends Sprite {

    private positions: object;
    private position: number;

    getPositions(): object {
        return this.positions;
    }
    setPositions(value: object) {
        this.positions = value;
    }

    getPosition(): number {
        return this.position;
    }
    setPosition(value: number) {
        this.position = value;
    }

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