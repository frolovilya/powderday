import SceneLayer from "scene/SceneLayer";
import Accelerometer from "device/Accelerometer";
import Model from "app/Model";
import TreeFactory from "app/scene/trees/TreeFactory";
import SharedState from "app/SharedState";
import Screen from "device/Screen"

export default class TreesLayer extends SceneLayer {

    private isPlanted = false;

    constructor(props) {
        super(props);

        console.log("init TreesLayer")

        //this.props.layerId = "tree";
    }

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
        // this.getLayer().clear();
        this.removeAllObjects();
        // retranslate to 0,0
        this.translate({x: -this.getTranslation().x, y: -this.getTranslation().y});
    }

    private moveLayer() {
        // this.clear();
        this.translate({
            x: Math.round(SharedState.getState().Sx),
            y: Math.round(SharedState.getState().Sy)
        });
    }

    private generateNewAreas() {
        // generate new areas
        let sceneSize = Screen.getSize();
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

    componentDidMount() {
        super.componentDidMount();

        this.plantInitialTrees();

        // this.renderObjects();
    }

    reset() {
        this.resetTreesLayer();
        this.plantInitialTrees();

        super.reset();
    }

    componentWillUpdate() {

        this.generateNewAreas();
        this.moveLayer();

        super.render();
    }
}