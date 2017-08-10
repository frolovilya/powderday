import {AbstractSceneObject} from "scene/AbstractSceneObject";
import Canvas from "../../../scene/Canvas";
import Coords from "../../../scene/types/Coords";
import store from "../../Store";
import Accelerometer from "../../../device/Accelerometer";

export default class DebugInfoObject extends AbstractSceneObject {

    state: {
        childrenObjects;
    };

    props: {
        angle: number;
        coords: Coords;
        scale: number;
        canvas: Canvas;
    };

    transform() {
        this.getCanvas().clear();

        let state: any = store.getState();

        let context = this.getCanvas().getContext();

        context.fillStyle = "#000000";
        //this.context.fillText("y: " + (acceleration.y).toFixed(5), 10, 40);
        //this.context.fillText("angle: " + (angle).toFixed(5), 10, 20);
        //this.context.fillText("delta: " + (angle - prevAngle).toFixed(5), 10, 80);
        //this.context.fillText("speed X: " + (Vx).toFixed(5), 10, 60);
        //this.context.fillText("layer X: " + this.treeLayer.position.x, 10, 80);
        //this.context.fillText("layer Y: " + this.treeLayer.position.y, 10, 100);
        //this.context.fillText("Sx: " + (Sx).toFixed(5), 10, 140);
        //this.context.fillText("Sy: " + (Sy).toFixed(5), 10, 160);
        // context.fillText("Score: " + CommonState.getState().score, 10, 20);
        // this.getContext().fillText("Objects (trees): " + this.getScene().getLayer("tree").getObjects().length, 10, 40);
        // this.getContext().fillText("treeLayer.tr.x: " + this.getScene().getLayer("tree").getTranslation().x, 10, 60);
        // context.fillText("acc.x: " + (Accelerometer.getAcceleration().x).toFixed(5), 10, 80);
        // context.fillText("Speed: " + (CommonState.getState().Vy).toFixed(5), 10, 100);


        context.fillText("acc: " + (state.scene.acceleration.x).toFixed(5) + ", "
            + (state.scene.acceleration.y).toFixed(5), 10, 40);

    }

}