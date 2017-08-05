import {SceneObject} from "scene/SceneObject";
import SceneLayer from "scene/SceneLayer";
import PlayerSprite from "app/scene/player/PlayerSprite";
import Circle from "scene/shapes/Circle";
import {AbstractSceneObject} from "scene/AbstractSceneObject";
import PlayerResource from "app/resources/PlayerObjectConfig"
import * as React from "react";
import Canvas from "../../../scene/Canvas";
import {Coords} from "../../../scene/types/Coords";

export default class PlayerObject extends AbstractSceneObject {

    // private sprite: PlayerSprite;
    // private shape: Circle;

    state: {
        movedToCenter: boolean;
        childrenObjects;
    };

    // private movedToCenter: boolean = false;

    props: {
        angle: number;
        canvas: Canvas;
    };

    private scale: number = 1;
    private coords: Coords;

    constructor(props) {
        super(props);

        this.scale = Math.round(PlayerResource.sprite.size.width / PlayerResource.sprite.scaleToSize.width * 100) / 100;

        this.coords = {
            x: -PlayerResource.sprite.scaleToSize.width / 2,
            y: -PlayerResource.sprite.scaleToSize.height / 2
        };

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
            movedToCenter: false,
            childrenObjects: [
                new Circle({
                    coords: PlayerResource.shape.coords,
                    radius: PlayerResource.shape.radius,
                    canvas: this.props.canvas,
                    parentCoords: this.coords,
                    scale: this.scale
                }),
                wrap(() => {
                    return {
                        rotateAngle: this.props.angle
                    }
                }, new PlayerSprite({
                    coords: this.coords,
                    scale: this.scale,
                    canvas: this.props.canvas,
                    rotateAngle: this.props.angle
                }))
            ]
        };

        (window as any).playerObject = this;
    }

    // getChildrenObjects() {
    //     // console.log("PlayerObject.getChildrenObjects()");
    //
    //     return [
    //         <Circle coords={PlayerResource.shape.coords}
    //                 radius={PlayerResource.shape.radius}
    //                 canvas={this.getCanvas()}
    //                 parentCoords={this.coords}
    //                 scale={this.scale}
    //                 ref={(shape) => this.shape = shape}
    //                 key="player_shape_1"/>,
    //         <PlayerSprite coords={this.coords}
    //                 scale={this.scale}
    //                 canvas={this.getCanvas()}
    //                 rotateAngle={this.props.angle}
    //                 key="player_sprite_1"/>
    //     ];
    // }

    getClassName() {
        return "player";
    }

    transform() {

        let canvas = this.getCanvas();

        if(!this.state.movedToCenter) {
            canvas.getContext().lineWidth = 10;
            canvas.translate({
                x: canvas.getElement().width / 2,
                y: canvas.getElement().height / 2
            });

            this.state.movedToCenter = true;
        }

        canvas.clear();
    }
    //
    // getShapes() {
    //     return [this.shape];
    // }

}