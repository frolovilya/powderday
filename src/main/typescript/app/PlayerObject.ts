import {SceneObject} from "../scene/SceneObject";
import SceneLayer from "../scene/SceneLayer";
import Sprite from "../scene/Sprite";
import PlayerSprite from "./PlayerSprite";
import Circle from "../scene/shapes/Circle";

export default class PlayerObject implements SceneObject {

    private layer: SceneLayer;

    private sprite: PlayerSprite;

    private shape: Circle;

    private scaleNum;

    private position;

    constructor(playerResource) {
        this.sprite = new PlayerSprite(playerResource.sprite.src, playerResource.sprite.size);
        this.sprite.setPositions(playerResource.sprite.positions);
        this.sprite.setPosition(0);

        // single sprite size
        let fixedSize = {
            width: 80,
            height: 80
        };
        this.scaleNum = Math.round(this.sprite.getSize().width / fixedSize.width * 100) / 100;

        this.position = {
            x: -fixedSize.width / 2,
            y: -fixedSize.height / 2
        };

        // player rotation
        (<any>window).playerRotateAngle = 0;
        
        this.shape = new Circle(playerResource.shape.coords, playerResource.shape.radius)
    }

    getClassName() {
        return "player";
    }

    setLayer(layer: SceneLayer) {
        this.layer = layer;
    }

    getLayer() {
        return this.layer;
    }

    getScale() {
        return this.scaleNum;
    }

    render() {

        this.sprite.rotate((<any>window).playerRotateAngle);

        this.layer.clear();

        this.shape.draw(this.layer, this.position, this.scaleNum);
        this.sprite.draw(this.layer, this.position, this.scaleNum);
    }

    getSize() {
        return this.sprite.getSize();
    }

    getCoords() {
        return this.position;
    }

    getShapes() {
        return [this.shape];
    }

    isVisible() {
        return true;
    }

    isActual() {
        return true;
    }

}