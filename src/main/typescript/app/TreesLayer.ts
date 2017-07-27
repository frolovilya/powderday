import SceneLayer from "../scene/SceneLayer";
import Accelerometer from "../device/Accelerometer";
import Model from "./Model";
import TreeFactory from "./TreeFactory";
import CommonState from "./CommonState";
import Screen from "../device/Screen"

export default class TreesLayer extends SceneLayer {

    private isPlanted = false;

    private plantInitialTrees() {
        let screenSize = Screen.getSize();

        TreeFactory.plantRect(this, {x: -screenSize.width, y: 0}, screenSize);
        TreeFactory.plantRect(this, {x: 0, y: screenSize.height * 2 / 3}, screenSize);
        TreeFactory.plantRect(this, {x: screenSize.width, y: 0}, screenSize);
        TreeFactory.plantRect(this, {x: -screenSize.width, y: screenSize.height}, screenSize);
        TreeFactory.plantRect(this, {x: 0, y: screenSize.height}, screenSize);
        TreeFactory.plantRect(this, {x: screenSize.width, y: screenSize.height}, screenSize);
    }

    private resetTreesLayer() {
        // clear tree layer
        this.clear();
        this.removeAllObjects();
        // retranslate to 0,0
        this.translate({x: -this.getTranslation().x, y: -this.getTranslation().y});
    }

    private moveLayer() {
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

    onReady() {
        this.plantInitialTrees();
    }

    reset() {
        this.resetTreesLayer();
        this.plantInitialTrees();

        super.reset();
    }

    render() {
        this.generateNewAreas();
        this.moveLayer();

        super.render();
    }
}