import {SceneObject} from "scene/SceneObject";
import SceneLayer from "scene/SceneLayer";
import Sprite from "scene/Sprite";
import PlayerSprite from "app/scene/player/PlayerSprite";
import Circle from "scene/shapes/Circle";
import {AbstractSceneObject} from "scene/AbstractSceneObject";
import PlayerResource from "app/resources/PlayerObjectConfig"

export default class PlayerObject extends AbstractSceneObject implements SceneObject {

    private sprite: PlayerSprite;
    private shape: Circle;

    state: {
        angle: number;
        movedToCenter: boolean;
    };

    constructor(props) {
        super(props);

        this.state = {
            angle: 0,
            movedToCenter: false
        };

        this.sprite = new PlayerSprite(PlayerResource.sprite.src, PlayerResource.sprite.size);
        this.sprite.setPositions(PlayerResource.sprite.positions);

        this.setScale(Math.round(this.sprite.getSize().width / PlayerResource.sprite.scaleToSize.width * 100) / 100);

        // center
        this.coords = {
            x: -PlayerResource.sprite.scaleToSize.width / 2,
            y: -PlayerResource.sprite.scaleToSize.height / 2
        };

        this.shape = new Circle(PlayerResource.shape.coords, PlayerResource.shape.radius);

        (window as any).playerObject = this;
    }

    getClassName() {
        return "player";
    }

    transform() {
        let layer = this.getLayer();

        if(!this.state.movedToCenter) {
            layer.getCanvas().getContext().lineWidth = 10;
            layer.getCanvas().translate({
                x: layer.getCanvas().getElement().width / 2,
                y: layer.getCanvas().getElement().height / 2
            });

            this.state.movedToCenter = true;
        }

        this.sprite.rotate(this.state.angle);
        layer.getCanvas().clear();
        this.shape.draw(layer, this.coords, this.scale);
        this.sprite.draw(layer, this.coords, this.scale);
    }

    getSize() {
        return this.sprite.getSize();
    }

    getShapes() {
        return [this.shape];
    }

}