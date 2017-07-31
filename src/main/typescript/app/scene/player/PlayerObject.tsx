import {SceneObject} from "scene/SceneObject";
import SceneLayer from "scene/SceneLayer";
import PlayerSprite from "app/scene/player/PlayerSprite";
import Circle from "scene/shapes/Circle";
import {AbstractSceneObject} from "scene/AbstractSceneObject";
import PlayerResource from "app/resources/PlayerObjectConfig"
import * as React from "react";

export default class PlayerObject extends AbstractSceneObject implements SceneObject {

    // private sprite: PlayerSprite;
    private shape: Circle;

    state: {
        angle: number;
        movedToCenter: boolean;
        childrenObjects;
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
            angle: 0,
            movedToCenter: false,
            childrenObjects: []
        };

        (window as any).playerObject = this;
    }

    getChildrenObjects() {
        return [
            <Circle coords={PlayerResource.shape.coords}
                    radius={PlayerResource.shape.radius}
                    layer={this.getLayer()}
                    parentCoords={this.coords}
                    scale={this.scale}
                    ref={(shape) => this.shape = shape} />,
            <PlayerSprite coords={this.coords}
                          scale={this.scale}
                          layer={this.getLayer()}
                          rotateAngle={this.state.angle} />
        ];
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

        layer.getCanvas().clear();
    }

    getShapes() {
        return [this.shape];
    }

}