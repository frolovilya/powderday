import {SceneObject} from "scene/SceneObject";
import SceneLayer from "scene/SceneLayer";
import PlayerSprite from "app/scene/player/PlayerSprite";
import Circle from "scene/shapes/Circle";
import {AbstractSceneObject} from "scene/AbstractSceneObject";
import PlayerResource from "app/resources/PlayerObjectConfig"
import * as React from "react";
import Canvas from "../../../scene/Canvas";
import Coords from "../../../scene/types/Coords";
import store from "../../Store";
import {GameState} from "../../GameState";

export default class PlayerObject extends AbstractSceneObject {

    state: {
        // movedToCenter: boolean;
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
        // super({
        //     ...props,
        //     scale: Math.round(PlayerResource.sprite.size.width / PlayerResource.sprite.scaleToSize.width * 100) / 100,
        //     coords: new Coords({
        //         x: -PlayerResource.sprite.scaleToSize.width / 2,
        //         y: -PlayerResource.sprite.scaleToSize.height / 2
        //     })
        // });

        super({
            ...props,
            scale: PlayerResource.sprite.scale,
            coords: new Coords({
                x: -PlayerResource.sprite.size.width / 2,
                y: -PlayerResource.sprite.size.height / 2
            }, null, PlayerResource.sprite.scale)
        });

        const wrap = function(getUpdateProps: () => object, sceneObject: SceneObject) {
            return {
                update: function(props) {
                    const propsToUpdate = getUpdateProps();
                    sceneObject.update({
                        ...propsToUpdate,
                        ...props
                    })
                }
            }
        };

        this.state = {
            childrenObjects: [
                new Circle({
                    coords: new Coords(PlayerResource.shape.coords, this.props.coords, this.props.scale),
                    scale: this.props.scale,
                    radius: PlayerResource.shape.radius,
                    canvas: this.props.canvas
                }),
                wrap(() => {
                    return {
                        rotateAngle: this.props.angle
                    }
                }, new PlayerSprite({
                    coords: new Coords({x: 0, y: 0}, this.props.coords, this.props.scale),
                    scale: this.props.scale,
                    canvas: this.props.canvas,
                    rotateAngle: this.props.angle
                }))
            ]
        };

        // this.registerObject();

        (window as any).playerObject = this;
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

}