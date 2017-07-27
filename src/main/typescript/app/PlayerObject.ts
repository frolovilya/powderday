import {SceneObject} from "../scene/SceneObject";
import SceneLayer from "../scene/SceneLayer";
import Sprite from "../scene/Sprite";
import PlayerSprite from "./PlayerSprite";
import Circle from "../scene/shapes/Circle";
import {AbstractSceneObject} from "../scene/AbstractSceneObject";
import Model from "./Model";
import Accelerometer from "../device/Accelerometer";
import CommonState from "./CommonState";

export default class PlayerObject extends AbstractSceneObject implements SceneObject {

    private sprite: PlayerSprite;
    private shape: Circle;

    // private state = {
    //     angle: 0
    // };

    constructor(playerResource) {
        super();

        this.sprite = new PlayerSprite(playerResource.sprite.src, playerResource.sprite.size);
        this.sprite.setPositions(playerResource.sprite.positions);
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

        this.shape = new Circle(playerResource.shape.coords, playerResource.shape.radius)
    }

    getClassName() {
        return "player";
    }

    // private calculateAngle() {
    //     this.state.angle = Model.calcAngle(this.state.angle, Accelerometer.getAcceleration().x);
    // }

    render() {
        // this.calculateAngle();
        this.sprite.rotate(CommonState.getState().angle);

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