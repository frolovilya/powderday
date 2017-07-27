/*
 * Application logic
 */
import TreeObject from "./TreeObject";
import Resources from "./Resources";
import Model from "./Model";
import Scene from "../scene/Scene";
import PlayerObject from "./PlayerObject";
import TreeFactory from "./TreeFactory";
import Animation from "../scene/Animation";
import Accelerometer from "../device/Accelerometer";
import Screen from "../device/Screen"
import {Size} from "../scene/types/Size";
import SceneLayer from "../scene/SceneLayer";
import CommonState from "./CommonState";
import TreesLayer from "./TreesLayer";
import DebugLayer from "./DebugLayer";
//import * as $ from "jquery";

export default class Main {

    private animation = new Animation();

    private scene: Scene;

    private initPlayerLayer() {
        let playerLayer = new SceneLayer("player").placeAt(this.scene, "10");
        playerLayer.getContext().lineWidth = 10;
        playerLayer.translate({
            x: playerLayer.getCanvas().width / 2,
            y: playerLayer.getCanvas().height / 2
        });
        playerLayer.addObject(new PlayerObject(Resources.player));
    }

    private initTreesLayer() {
        new TreesLayer("tree").placeAt(this.scene, "100");
    }

    private initDebugLayer() {
        new DebugLayer("debug").placeAt(this.scene, "200");
    }

    private startGame() {
        Accelerometer.startWatch(Model.parameters.time * 1000);
        this.animation.start(() => { this.update() });
    }

    private pauseGame() {
        this.animation.stop();
        Accelerometer.stopWatch();
    }

    private bindButtonsHandlers() {
        // start game button
        $("#startGameScene .button").click((e) => {
            e.preventDefault();

            $("#startGameScene").hide();

            this.startGame();
        });

        // replay button
        //$("#endGameScene .button").unbind("click");
        $("#endGameScene .button").click((e) => {
            e.preventDefault();

            $("#endGameScene").hide();

            CommonState.reset();

            this.scene.reset();
            this.scene.render();

            // start animation
            this.startGame();
        });
    }

    private handleObjectsIntersections() {
        // tree/player intersection event handler
        this.scene.intersections.onIntersect("tree", "player", () => {
            this.pauseGame();

            $("#endGameScene").show();
            $("#score").text(CommonState.getState().score);
        });
    }

    // init game state
    init() {
        CommonState.reset();

        // initialize scene
        this.scene = new Scene("scene");
        this.scene.resize(Screen.getSize());

        this.initPlayerLayer();
        this.initTreesLayer();
        this.initDebugLayer();

        // pre-render scene
        // this.scene.reset();
        this.scene.render();

        this.bindButtonsHandlers();
        this.handleObjectsIntersections();
    }

    update() {
        CommonState.calculate();
        this.scene.render();
    }
    
}