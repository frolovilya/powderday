/*
 * Application logic
 */
import TreeObject from "./TreeObject";
import Resources from "./Resources";
import Model from "./Model";
import Scene from "../scene/Scene";
import PlayerObject from "./PlayerObject";
//import * as $ from "jquery";

export default class Main {

    // fill screen with trees
    plantTrees(layer, x, y, width, height) {
        let treeCount = Math.floor(Math.random() * (10 - 3) + 3);

        for(let i = 0; i < treeCount; i++) {
            // position on area
            let randomPosition = {
                x: x + Math.floor(Math.random() * width),
                y: y + Math.floor(Math.random() * height)
            };

            // get random tree
            let treeNum = Math.round( Math.random() * (Resources.trees.length - 1) );
            let tree = Resources.trees[treeNum];
            let treeObject = new TreeObject(tree, randomPosition);

            // sizes
            let maxSize = 160;
            let minSize = maxSize * 0.7;

            let newWidth = Math.floor( Math.random() * (maxSize - minSize) + minSize );
            let scale = treeObject.getSize().width / newWidth;
            treeObject.scale(scale);

            // add tree to layer
            layer.addObject( treeObject );
        }
    }

    // layers
    private playerLayer = null;
    private treeLayer = null;
    private debugLayer = null;

    // game state
    private state = {
        angle: 0,
        prevAngle: 0,
        Vy: 0,
        Vx: 0,
        score: 0
    };

    private animated = true;

    // accelerometer state
    private acc = {
        x: 0,
        y: 0,
        z: 0
    };

    // init game state
    init() {
        // initialize scene
        (<any>window).scene = new Scene("scene");

        // screen size
        let ww = $((<any>window)).width();
        let wh = $((<any>window)).height();

        // resize scene
        (<any>window).scene.resize(ww, wh);

        // default state
        let playerObject = new PlayerObject(Resources.player);
        this.playerLayer = (<any>window).scene.createLayer("player", 10, true);
        this.playerLayer.context.lineWidth = 10;
        this.playerLayer.translate(
            this.playerLayer.canvas.width / 2,
            this.playerLayer.canvas.height / 2
        );
        this.playerLayer.addObject(playerObject);

        this.treeLayer = (<any>window).scene.createLayer("tree", 100, true);
        this.plantTrees(this.treeLayer, -ww, 0, ww, wh);
        this.plantTrees(this.treeLayer, 0, wh * 2 / 3, ww, wh);
        this.plantTrees(this.treeLayer, ww, 0, ww, wh);
        this.plantTrees(this.treeLayer, -ww, wh, ww, wh);
        this.plantTrees(this.treeLayer, 0, wh, ww, wh);
        this.plantTrees(this.treeLayer, ww, wh, ww, wh);

        this.debugLayer = (<any>window).scene.createLayer("debug", 200);
        this.debugLayer.context.font = "bold 12px Arial";

        // pre-render scene
        (<any>window).scene.render();

        // start game button
        $("#startGameScene .button").click((e) => {
            e.preventDefault();

            $("#startGameScene").hide();

            // start animation
            this.startWatch();
            this.animated = true;
            //startAnim();
            (<any>window).animId = (<any>window).requestAnimFrame(() => { this.startAnim() });
        });

        // tree/player intersection event handler
        (<any>window).scene.intersections.onIntersect("tree", "player", () => {
            this.stopAnim();
            this.stopWatch();
            //(<any>navigator).notification.vibrate(100);

            this.debugLayer.clear();

            $("#endGameScene").show();
            $("#score").text(this.state.score);

            // replay button
            $("#endGameScene .button").unbind("click");
            $("#endGameScene .button").click((e) => {
                e.preventDefault();

                $("#endGameScene").hide();

                // default state
                this.state = {
                    angle: 0,
                    prevAngle: 0,
                    Vy: 0,
                    Vx: 0,
                    score: 0
                };

                // clear tree layer
                this.treeLayer.clear();
                this.treeLayer.removeAllObjects();
                // retranslate to 0,0
                this.treeLayer.translate(-this.treeLayer.translation.x, -this.treeLayer.translation.y);

                // screen size
                let ww = $((<any>window)).width();
                let wh = $((<any>window)).height();

                this.plantTrees(this.treeLayer, -ww, 0, ww, wh);
                this.plantTrees(this.treeLayer, 0, wh * 2 / 3, ww, wh);
                this.plantTrees(this.treeLayer, ww, 0, ww, wh);
                this.plantTrees(this.treeLayer, -ww, wh, ww, wh);
                this.plantTrees(this.treeLayer, 0, wh, ww, wh);
                this.plantTrees(this.treeLayer, ww, wh, ww, wh);

                // pre-render scene
                (<any>window).scene.render();

                // start animation
                this.startWatch();
                this.animated = true;
                (<any>window).animId = (<any>window).requestAnimFrame(() => { this.startAnim() });
                //startAnim();
            });
        });

    }

    // the watch id references the current `watchAcceleration`
    private watchID = null;
    startWatch() {
        let options = { frequency: Model.parameters.time * 1000 };
        this.watchID = (<any>navigator).accelerometer.watchAcceleration(
            (acceleration) => {
                this.onSuccess(acceleration)
            },
            () => {
                this.onError();
            },
            options);
    }

    stopWatch() {
        if (this.watchID) {
            (<any>navigator).accelerometer.clearWatch(this.watchID);
            this.watchID = null;
        }
    }

    // onSuccess: get a snapshot of the current acceleration
    onSuccess(acceleration) {
        this.acc = acceleration;
    }

    // onError: failed to get the acceleration
    onError() {
        alert('failed to get the acceleration');
    }

    // animation loop
    startAnim() {
        if(this.animated) {
            (<any>window).animId = (<any>window).requestAnimFrame(() => { this.startAnim(); });
            this.update();
        }
    };
    stopAnim() {
        this.animated = false;
        (<any>window).cancelAnimFrame((<any>window).animId);
    };

    // update state
    private planted = false;
    update() {
        /*
         * Player
         */
        // calculate angle
        this.state.prevAngle = this.state.angle;
        this.state.angle = Model.calcAngle(this.state.angle, this.acc.x);
        (<any>window).playerRotateAngle = this.state.angle;
        (<any>window).playerRotateAngleDelta = (this.state.angle - this.state.prevAngle);

        /*
         * Trees
         */
        // calculate speed
        let kp = Model.calcKantPressure(this.acc.y);
        this.state.Vy = Model.Va(this.state.Vy, this.state.angle, kp, Model.parameters.time);
        this.state.Vx = Model.Vax(this.state.Vy, this.state.angle);

        // canvas translate coords
        let Sx = this.state.Vx * Model.parameters.time * 10;
        let Sy = -this.state.Vy * Model.parameters.time * 10 * 1.5;
        this.treeLayer.registerOnBeforeRenderCallback(() => {
            this.treeLayer.clear();
            this.treeLayer.translate(
                Math.round(Sx),
                Math.round(Sy)
            );
        });

        // calculate score
        this.state.score += Math.round( Math.abs(Sy) / 5 );

        // generate new areas
        let sh = (<any>window).scene.getHeight();
        let sw = (<any>window).scene.getWidth();
        let offsetY = Math.abs(this.treeLayer.translation.y) % sh;
        //let offsetX = Math.abs(this.treeLayer.translation.x) % sw;

        if( offsetY <= sh / 2 )
            this.planted = false;
        if( offsetY > sh / 2 && !this.planted ) {
            this.plantTrees(
                this.treeLayer,
                -sw, -this.treeLayer.translation.y - offsetY + 2 * sh,
                sw, sh
            );
            this.plantTrees(
                this.treeLayer,
                0, -this.treeLayer.translation.y - offsetY + 2 * sh,
                sw, sh
            );
            this.plantTrees(
                this.treeLayer,
                sw, -this.treeLayer.translation.y - offsetY + 2 * sh,
                sw, sh
            );
            this.planted = true;
        }

        /*
         * Debug
         */
        // add debug text
        //if((<any>window).scene.debug) {
            this.debugLayer.registerOnBeforeRenderCallback(() => {
                this.debugLayer.clear();
                this.debugLayer.context.fillStyle = "#000000";
                this.debugLayer.context.fillText("acc.x: " + (this.acc.x).toFixed(5), 10, 80);
                //this.debugLayer.context.fillText("y: " + (acceleration.y).toFixed(5), 10, 40);
                //this.debugLayer.context.fillText("angle: " + (angle).toFixed(5), 10, 20);
                //this.debugLayer.context.fillText("delta: " + (angle - prevAngle).toFixed(5), 10, 80);
                //this.debugLayer.context.fillText("speed X: " + (Vx).toFixed(5), 10, 60);
                //this.debugLayer.context.fillText("layer X: " + this.treeLayer.position.x, 10, 80);
                //this.debugLayer.context.fillText("layer Y: " + this.treeLayer.position.y, 10, 100);
                //this.debugLayer.context.fillText("Sx: " + (Sx).toFixed(5), 10, 140);
                //this.debugLayer.context.fillText("Sy: " + (Sy).toFixed(5), 10, 160);
                this.debugLayer.context.fillText("Score: " + this.state.score, 10, 20);
                this.debugLayer.context.fillText("Objects (tree): " + this.treeLayer.objectsList.length, 10, 40);
                //this.debugLayer.context.fillText("Objects (player): " + this.playerLayer.objectsList.length, 10, 60);
                this.debugLayer.context.fillText("Speed: " + (this.state.Vy).toFixed(5), 10, 100);

            });
        //}

        // render layers
        (<any>window).scene.render();
    }
    
}