import {SceneObject} from "scene/SceneObject";
import SceneLayer from "scene/SceneLayer";
import PlayerSprite from "app/scene/player/PlayerSprite";
import Circle from "scene/shapes/Circle";
import {AbstractSceneObject} from "scene/AbstractSceneObject";
import PlayerResource from "app/resources/PlayerObjectConfig"
import * as React from "react";
import Canvas from "../../../scene/Canvas";

export default class PlayerObject extends AbstractSceneObject {

    // private sprite: PlayerSprite;
    private shape: Circle;

    state: {
        movedToCenter: boolean;
        childrenObjects;
    };

    props: {
        angle: number;
        canvas: Canvas;
    };

    constructor(props) {
        super(props);

        this.setScale(Math.round(PlayerResource.sprite.size.width / PlayerResource.sprite.scaleToSize.width * 100) / 100);

        // center
        this.coords = {
            x: -PlayerResource.sprite.scaleToSize.width / 2,
            y: -PlayerResource.sprite.scaleToSize.height / 2
        };

        this.state = {
            movedToCenter: false,
            childrenObjects: []
        };

        (window as any).playerObject = this;
    }

    getChildrenObjects() {
        return [
            <Circle coords={PlayerResource.shape.coords}
                    radius={PlayerResource.shape.radius}
                    canvas={this.getCanvas()}
                    parentCoords={this.coords}
                    scale={this.scale}
                    ref={(shape) => this.shape = shape} />,
            <PlayerSprite coords={this.coords}
                          scale={this.scale}
                          canvas={this.getCanvas()}
                          rotateAngle={this.props.angle} />
        ];
    }

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

    getShapes() {
        return [this.shape];
    }

}