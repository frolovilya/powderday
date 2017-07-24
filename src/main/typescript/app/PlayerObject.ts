import {SceneObject} from "../scene/SceneObject";
import SceneLayer from "../scene/SceneLayer";
import Sprite from "../scene/Sprite";
import PlayerSprite from "./PlayerSprite";
import Circle from "../scene/shapes/Circle";

export default class PlayerObject implements SceneObject {

    private sprite: PlayerSprite;

    private shape: Circle;

    private scaleNum;

    private pos;

    constructor(playerResource) {
        this.sprite = new PlayerSprite(playerResource.sprite.src, playerResource.sprite.size);
        this.sprite.setPositions(playerResource.sprite.positions);
        this.sprite.setPosition(0);

        // single sprite size
        let fixedSize = {
            width: 80,
            height: 80
        };
        this.scaleNum = this.sprite.getSize().width / fixedSize.width;

        this.pos = {
            x: -fixedSize.width / 2,
            y: -fixedSize.height / 2
        };

        // player rotation
        (<any>window).playerRotateAngle = 0;
        
        this.shape = new Circle(playerResource.shape.coords, playerResource.shape.radius)
    }

    render(layer: SceneLayer) {

        this.sprite.rotate((<any>window).playerRotateAngle);

        layer.clear();

        this.shape.draw(layer, this.pos, this.scaleNum);
        this.sprite.draw(layer, this.pos, this.scaleNum);
    }

    getSize() {
        return this.sprite.getSize();
    }

    getIntersectionPoints(layer: SceneLayer) {
        let absolutePoint = Circle.toAbsoluteCoords(layer, this.shape, this.pos, this.scaleNum);
        absolutePoint.className = "player";

        return [absolutePoint];
    }

    isVisible(layer) {
        return true;
    }

    isActual(layer) {
        return true;
    }

}