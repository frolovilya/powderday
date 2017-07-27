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
//import * as $ from "jquery";

export default class Main {

    // layers
    private playerLayer: SceneLayer = null;
    private treeLayer: SceneLayer = null;
    private debugLayer: SceneLayer = null;

    // game state
    // private state: any;

    private animation = new Animation();

    private scene: Scene;

    // private resetState() {
    //     this.state = {
    //         angle: 0,
    //         prevAngle: 0,
    //         Vy: 0,
    //         Vx: 0,
    //         score: 0
    //     };
    // }

    private initPlayerLayer() {
        // this.playerLayer = this.scene.createLayer("player", "10");
        this.playerLayer = new SceneLayer("player").placeAt(this.scene, "10");
        this.playerLayer.getContext().lineWidth = 10;
        this.playerLayer.translate({
            x: this.playerLayer.getCanvas().width / 2,
            y: this.playerLayer.getCanvas().height / 2
        });

        let playerObject = new PlayerObject(Resources.player);
        this.playerLayer.addObject(playerObject);
    }

    private initTreesLayer() {
        //this.treeLayer = this.scene.createLayer("tree", "100");
        this.treeLayer = new TreesLayer("tree").placeAt(this.scene, "100");

        this.plantInitialTrees();
    }

    private plantInitialTrees() {
        let screenSize = Screen.getSize();

        TreeFactory.plantRect(this.treeLayer, {x: -screenSize.width, y: 0}, screenSize);
        TreeFactory.plantRect(this.treeLayer, {x: 0, y: screenSize.height * 2 / 3}, screenSize);
        TreeFactory.plantRect(this.treeLayer, {x: screenSize.width, y: 0}, screenSize);
        TreeFactory.plantRect(this.treeLayer, {x: -screenSize.width, y: screenSize.height}, screenSize);
        TreeFactory.plantRect(this.treeLayer, {x: 0, y: screenSize.height}, screenSize);
        TreeFactory.plantRect(this.treeLayer, {x: screenSize.width, y: screenSize.height}, screenSize);
    }

    private resetTreesLayer() {
        // clear tree layer
        this.treeLayer.clear();
        this.treeLayer.removeAllObjects();
        // retranslate to 0,0
        this.treeLayer.translate({x: -this.treeLayer.getTranslation().x, y: -this.treeLayer.getTranslation().y});
    }

    private initDebugLayer() {
        // this.debugLayer = this.scene.createLayer("debug", "200");
        this.debugLayer = new SceneLayer("debug").placeAt(this.scene, "200");
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

            this.resetTreesLayer();

            this.plantInitialTrees();

            // pre-render scene
            this.scene.render();

            // start animation
            this.startGame();
        });
    }

    private handleObjectsIntersections() {
        // tree/player intersection event handler
        this.scene.intersections.onIntersect("tree", "player", () => {
            this.pauseGame();

            this.debugLayer.clear();

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
        this.scene.render();

        this.bindButtonsHandlers();

        this.handleObjectsIntersections();
    }

    // update state
    // private planted = false;
    update() {
        /*
         * Player
         */
        // calculate angle
        //this.state.prevAngle = this.state.angle;
        // this.state.angle = Model.calcAngle(this.state.angle, Accelerometer.getAcceleration().x);
        // (<any>window).playerRotateAngle = this.state.angle;
        // (<any>window).playerRotateAngleDelta = (this.state.angle - this.state.prevAngle);

        /*
         * Trees
         */
        // calculate speed
        // let kp = Model.calcKantPressure(Accelerometer.getAcceleration().y);
        // this.state.Vy = Model.Va(this.state.Vy, this.state.angle, kp, Model.parameters.time);
        // this.state.Vx = Model.Vax(this.state.Vy, this.state.angle);
        //
        // // canvas translate coords
        // let Sx = this.state.Vx * Model.parameters.time * 10;
        // let Sy = -this.state.Vy * Model.parameters.time * 10 * 1.5;
        // this.treeLayer.registerOnBeforeRenderCallback(() => {
        //     this.treeLayer.clear();
        //     this.treeLayer.translate({
        //         x: Math.round(Sx),
        //         y: Math.round(Sy)
        //     });
        // });

        // calculate score
        // this.state.score += Math.round( Math.abs(Sy) / 5 );

        // // generate new areas
        // let sceneSize = this.scene.getSize();
        // let offsetY = Math.abs(this.treeLayer.getTranslation().y) % sceneSize.height;
        // //let offsetX = Math.abs(this.treeLayer.translation.x) % sw;
        //
        // if( offsetY <= sceneSize.height / 2 )
        //     this.planted = false;
        // if( offsetY > sceneSize.height / 2 && !this.planted ) {
        //     TreeFactory.plantRect(
        //         this.treeLayer,
        //         {
        //             x: -sceneSize.width,
        //             y: -this.treeLayer.getTranslation().y - offsetY + 2 * sceneSize.height
        //         },
        //         {width: sceneSize.width, height: sceneSize.height}
        //     );
        //     TreeFactory.plantRect(
        //         this.treeLayer,
        //         {
        //             x: 0,
        //             y: -this.treeLayer.getTranslation().y - offsetY + 2 * sceneSize.height
        //         },
        //         {width: sceneSize.width, height: sceneSize.height}
        //     );
        //     TreeFactory.plantRect(
        //         this.treeLayer,
        //         {
        //             x: sceneSize.width,
        //             y: -this.treeLayer.getTranslation().y - offsetY + 2 * sceneSize.height
        //         },
        //         {width: sceneSize.width, height: sceneSize.height}
        //     );
        //     this.planted = true;
        // }

        /*
         * Debug
         */
        // add debug text
        // //if(this.scene.debug) {
        //     this.debugLayer.registerOnBeforeRenderCallback(() => {
        //         this.debugLayer.clear();
        //         this.debugLayer.getContext().fillStyle = "#000000";
        //         //this.debugLayer.context.fillText("y: " + (acceleration.y).toFixed(5), 10, 40);
        //         //this.debugLayer.context.fillText("angle: " + (angle).toFixed(5), 10, 20);
        //         //this.debugLayer.context.fillText("delta: " + (angle - prevAngle).toFixed(5), 10, 80);
        //         //this.debugLayer.context.fillText("speed X: " + (Vx).toFixed(5), 10, 60);
        //         //this.debugLayer.context.fillText("layer X: " + this.treeLayer.position.x, 10, 80);
        //         //this.debugLayer.context.fillText("layer Y: " + this.treeLayer.position.y, 10, 100);
        //         //this.debugLayer.context.fillText("Sx: " + (Sx).toFixed(5), 10, 140);
        //         //this.debugLayer.context.fillText("Sy: " + (Sy).toFixed(5), 10, 160);
        //         this.debugLayer.getContext().fillText("Score: " + this.state.score, 10, 20);
        //         this.debugLayer.getContext().fillText("Objects (trees): " + this.treeLayer.getObjects().length, 10, 40);
        //         this.debugLayer.getContext().fillText("treeLayer.tr.x: " + this.treeLayer.getTranslation().x, 10, 60);
        //         this.debugLayer.getContext().fillText("acc.x: " + (Accelerometer.getAcceleration().x).toFixed(5), 10, 80);
        //         this.debugLayer.getContext().fillText("Speed: " + (this.state.Vy).toFixed(5), 10, 100);
        //
        //     });
        // //}

        CommonState.calculate();

        this.scene.render();
    }
    
}