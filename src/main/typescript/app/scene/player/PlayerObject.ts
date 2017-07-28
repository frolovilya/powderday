import {SceneObject} from "scene/SceneObject";
import SceneLayer from "scene/SceneLayer";
import Sprite from "scene/Sprite";
import PlayerSprite from "app/scene/player/PlayerSprite";
import Circle from "scene/shapes/Circle";
import {AbstractSceneObject} from "scene/AbstractSceneObject";
import Model from "app/Model";
import Accelerometer from "device/Accelerometer";
import SharedState from "app/SharedState";
import PlayerResource from "app/resources/PlayerObjectConfig"

export default class PlayerObject extends AbstractSceneObject implements SceneObject {

    private sprite: PlayerSprite;
    private shape: Circle;

    constructor() {
        super();

        this.sprite = new PlayerSprite(PlayerResource.sprite.src, PlayerResource.sprite.size);
        this.sprite.setPositions(PlayerResource.sprite.positions);
        this.sprite.setPosition(0);

        // TODO: refactor
        // single sprite size
        let fixedSize = {
            width: 80,
            height: 80
        };
        this.scale = Math.round(this.sprite.getSize().width / fixedSize.width * 100) / 100;

        this.coords = {
            x: -fixedSize.width / 2,
            y: -fixedSize.height / 2
        };

        this.shape = new Circle(PlayerResource.shape.coords, PlayerResource.shape.radius)
    }

    getClassName() {
        return "player";
    }

    render() {
        this.sprite.rotate(SharedState.getState().angle);

        this.layer.clear();

        this.shape.draw(this.layer, this.coords, this.scale);
        this.sprite.draw(this.layer, this.coords, this.scale);
    }

    getSize() {
        return this.sprite.getSize();
    }

    getShapes() {
        return [this.shape];
    }

}