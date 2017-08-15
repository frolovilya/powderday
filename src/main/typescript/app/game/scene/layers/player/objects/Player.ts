import PlayerSprite from "app/game/scene/layers/player/objects/PlayerSprite";
import Circle from "scene/layers/objects/shapes/Circle";
import {AbstractLayerObject} from "scene/layers/objects/AbstractLayerObject";
import PlayerResource from "app/game/scene/resources/PlayerObjectConfig"
import Canvas from "scene/layers/Canvas";
import Coords from "scene/Coords";
import {GameState} from "app/game/GameState";
import store from "app/game/Store";
import {registerSceneObjectsAction} from "scene/interactions/reducers/ObjectsRegistryReducer";
import {wrap} from "scene/layers/objects/LayerObjectWrap";

export default class Player extends AbstractLayerObject {

    state: {
        childrenObjects;
    };

    props: {
        angle: number;
        coords: Coords;
        scale: number;
        canvas: Canvas;
        gameState: GameState;
    };

    constructor(props) {
        super({
            ...props,
            scale: PlayerResource.sprite.scale,
            coords: new Coords({
                x: -PlayerResource.sprite.size.width / 2,
                y: -PlayerResource.sprite.size.height / 2
            }, null, PlayerResource.sprite.scale),
            checkVisibility: false
        });

        this.state = {
            childrenObjects: [
                new Circle({
                    coords: new Coords(PlayerResource.shape.coords, this.props.coords, this.props.scale),
                    scale: this.props.scale,
                    radius: PlayerResource.shape.radius,
                    canvas: this.props.canvas,
                    checkVisibility: false
                }),
                wrap(null, () => {
                    return {
                        rotateAngle: this.props.angle
                    }
                }, new PlayerSprite({
                    coords: new Coords({x: 0, y: 0}, this.props.coords, this.props.scale),
                    scale: this.props.scale,
                    canvas: this.props.canvas,
                    rotateAngle: this.props.angle,
                    checkVisibility: false
                }))
            ]
        };
    }

    getClassName() {
        return "player";
    }

    transform() {
        if(this.props.gameState == GameState.STOPPED) {
            this.registerObject();
        }

        this.getCanvas().clear();
    }

    private registerObject() {
        store.dispatch(registerSceneObjectsAction(this));
    }

}