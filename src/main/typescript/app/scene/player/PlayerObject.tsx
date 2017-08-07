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
    };

    constructor(props) {
        super({
            ...props,
            scale: Math.round(PlayerResource.sprite.size.width / PlayerResource.sprite.scaleToSize.width * 100) / 100,
            coords: new Coords({
                x: -PlayerResource.sprite.scaleToSize.width / 2,
                y: -PlayerResource.sprite.scaleToSize.height / 2
            }, null)
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
            // movedToCenter: false,
            childrenObjects: [
                new Circle({
                    coords: new Coords(PlayerResource.shape.coords, this.props.coords),
                    radius: PlayerResource.shape.radius,
                    canvas: this.props.canvas,
                    scale: this.props.scale
                }),
                wrap(() => {
                    return {
                        rotateAngle: this.props.angle
                    }
                }, new PlayerSprite({
                    coords: new Coords({x: 0, y: 0}, this.props.coords),
                    scale: this.props.scale,
                    canvas: this.props.canvas,
                    rotateAngle: this.props.angle
                }))
            ]
        };

        this.registerObject();

        (window as any).playerObject = this;
    }

    getClassName() {
        return "player";
    }

    transform() {
        let canvas = this.getCanvas();

        // if(!this.state.movedToCenter) {
        //     canvas.getContext().lineWidth = 10;
        //     canvas.translate({
        //         x: canvas.getElement().width / 2,
        //         y: canvas.getElement().height / 2
        //     });
        //
        //     this.state.movedToCenter = true;
        // }

        canvas.clear();
    }

}