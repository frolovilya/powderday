import {AbstractLayerObject} from "scene/layers/objects/AbstractLayerObject";
import Canvas from "scene/layers/Canvas";
import Coords from "scene/Coords";
import store from "app/game/Store";

/**
 * Layer Object that displays various debug information
 */
export default class DebugInfo extends AbstractLayerObject {

    state: {
        childrenObjects;
    };

    props: {
        coords: Coords;
        canvas: Canvas;
    };

    constructor(props) {
        super({
            ...props,
            checkVisibility: false
        })
    }

    transform() {
        this.getCanvas().clear();

        let state: any = store.getState();
        let context = this.getCanvas().getContext();

        context.fillStyle = "#000000";

        context.fillText("acc: " + (state.scene.acceleration.x).toFixed(5) + ", "
            + (state.scene.acceleration.y).toFixed(5), 10, 40);

        context.fillText("Vy: " + (state.scene.movement.Vy).toFixed(5), 10, 60);

    }

}