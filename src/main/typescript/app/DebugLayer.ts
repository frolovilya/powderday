import SceneLayer from "../scene/SceneLayer";
import Accelerometer from "../device/Accelerometer";
import Model from "./Model";
import TreeFactory from "./TreeFactory";
import CommonState from "./CommonState";

export default class DebugLayer extends SceneLayer {

    constructor(layerId: string) {
        super(layerId);

        this.getContext().font = "bold 12px Arial";
    }

    private preRender() {
        this.clear();
        this.getContext().fillStyle = "#000000";
        //this.context.fillText("y: " + (acceleration.y).toFixed(5), 10, 40);
        //this.context.fillText("angle: " + (angle).toFixed(5), 10, 20);
        //this.context.fillText("delta: " + (angle - prevAngle).toFixed(5), 10, 80);
        //this.context.fillText("speed X: " + (Vx).toFixed(5), 10, 60);
        //this.context.fillText("layer X: " + this.treeLayer.position.x, 10, 80);
        //this.context.fillText("layer Y: " + this.treeLayer.position.y, 10, 100);
        //this.context.fillText("Sx: " + (Sx).toFixed(5), 10, 140);
        //this.context.fillText("Sy: " + (Sy).toFixed(5), 10, 160);
        this.getContext().fillText("Score: " + CommonState.getState().score, 10, 20);
        this.getContext().fillText("Objects (trees): " + this.getScene().getLayer("tree").getObjects().length, 10, 40);
        this.getContext().fillText("treeLayer.tr.x: " + this.getScene().getLayer("tree").getTranslation().x, 10, 60);
        this.getContext().fillText("acc.x: " + (Accelerometer.getAcceleration().x).toFixed(5), 10, 80);
        this.getContext().fillText("Speed: " + (CommonState.getState().Vy).toFixed(5), 10, 100);
    }

    render() {
        this.preRender();

        super.render();
    }
}