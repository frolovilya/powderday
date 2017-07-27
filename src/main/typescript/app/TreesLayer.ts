import SceneLayer from "../scene/SceneLayer";
import Accelerometer from "../device/Accelerometer";
import Model from "./Model";
import TreeFactory from "./TreeFactory";
import CommonState from "./CommonState";

export default class TreesLayer extends SceneLayer {

    // private state: any = {}

    private isPlanted = false;

    private moveLayer() {
        // // calculate angle
        // this.state.angle = Model.calcAngle(this.state.angle, Accelerometer.getAcceleration().x);
        //
        // /*
        //  * Trees
        //  */
        // // calculate speed
        // let kp = Model.calcKantPressure(Accelerometer.getAcceleration().y);
        // this.state.Vy = Model.Va(this.state.Vy, this.state.angle, kp, Model.parameters.time);
        // this.state.Vx = Model.Vax(this.state.Vy, this.state.angle);

        // canvas translate coords
        // let Sx = CommonState.getState().Vx * Model.parameters.time * 10;
        // let Sy = -CommonState.getState().Vy * Model.parameters.time * 10 * 1.5;

        this.clear();
        this.translate({
            x: Math.round(CommonState.getState().Sx),
            y: Math.round(CommonState.getState().Sy)
        });
    }

    private generateNewAreas() {
        // generate new areas
        let sceneSize = this.getScene().getSize();
        let offsetY = Math.abs(this.getTranslation().y) % sceneSize.height;
        //let offsetX = Math.abs(this.treeLayer.translation.x) % sw;

        if( offsetY <= sceneSize.height / 2 )
            this.isPlanted = false;
        if( offsetY > sceneSize.height / 2 && !this.isPlanted ) {
            TreeFactory.plantRect(
                this,
                {
                    x: -sceneSize.width,
                    y: -this.getTranslation().y - offsetY + 2 * sceneSize.height
                },
                {width: sceneSize.width, height: sceneSize.height}
            );
            TreeFactory.plantRect(
                this,
                {
                    x: 0,
                    y: -this.getTranslation().y - offsetY + 2 * sceneSize.height
                },
                {width: sceneSize.width, height: sceneSize.height}
            );
            TreeFactory.plantRect(
                this,
                {
                    x: sceneSize.width,
                    y: -this.getTranslation().y - offsetY + 2 * sceneSize.height
                },
                {width: sceneSize.width, height: sceneSize.height}
            );
            this.isPlanted = true;
        }
    }

    render() {
        this.generateNewAreas();
        this.moveLayer();

        super.render();
    }
}