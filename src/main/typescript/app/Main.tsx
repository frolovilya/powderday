/*
 * Application logic
 */
import Model from "app/Model";
import Scene from "scene/Scene";
import PlayerObject from "app/scene/player/PlayerObject";
import Animation from "scene/Animation";
import Accelerometer from "device/Accelerometer";
import Screen from "device/Screen"
import {Size} from "scene/types/Size";
import SceneLayer from "scene/SceneLayer";
import CommonState from "app/SharedState";
import TreesLayer from "app/scene/trees/TreesLayer";
import DebugLayer from "app/scene/debug/DebugLayer";
import * as ReactDOM from "react-dom";
import * as React from "react";
import PlayerLayer from "app/scene/player/PlayerLayer";
import { Provider } from 'react-redux';
import store from "app/Store";
import {moveAction} from "app/Store";

export default class Main {

    private animation = new Animation();

    private scene;

    private initScene() {

        /*
         <DebugLayer layerId="debug" zIndex={200} />

         */

        ReactDOM.render(
            <Provider store={store}>
                <Scene ref={(scene) => { this.scene = scene; }}>
                    <PlayerLayer layerId="player" zIndex={10} />
                    <TreesLayer layerId="tree" zIndex={100} />
                </Scene>
            </Provider>,
            document.getElementById("scene")
        );

    }

    private startGame() {
        Accelerometer.startWatch(Model.parameters.time * 1000);
        this.animation.start(() => { this.update() });
    }

    private pauseGame() {
        this.animation.stop();
        Accelerometer.stopWatch();
    }

    // private bindButtonsHandlers() {
    //     // start game button
    //     $("#startGameScene .button").click((e) => {
    //         e.preventDefault();
    //
    //         $("#startGameScene").hide();
    //
    //         this.startGame();
    //     });
    //
    //     // replay button
    //     //$("#endGameScene .button").unbind("click");
    //     $("#endGameScene .button").click((e) => {
    //         e.preventDefault();
    //
    //         $("#endGameScene").hide();
    //
    //         CommonState.reset();
    //
    //         // this.scene.reset();
    //         // this.scene.render();
    //         this.scene.forceUpdate();
    //
    //         // start animation
    //         this.startGame();
    //     });
    // }
    //
    // private handleObjectsIntersections() {
    //     // tree/player intersection event handler
    //     // this.scene.intersections.onIntersect("tree", "player", () => {
    //     //     this.pauseGame();
    //     //
    //     //     $("#endGameScene").show();
    //     //     $("#score").text(CommonState.getState().score);
    //     // });
    // }

    // init game state
    init() {
        CommonState.reset();

        // initialize scene
        // this.scene = new Scene("scene");
        // this.scene.resize(Screen.getSize());
        //
        // ReactDOM.render(React.createElement(<Scene />, null), document.getElementById("scene"));

        // this.initPlayerLayer();
        // this.initTreesLayer();
        // this.initDebugLayer();

        this.initScene();

        // this.scene.setState({
        //     size: Screen.getSize()
        // });

        // pre-render scene
        // this.scene.reset();
        // this.scene.render();

        // this.bindButtonsHandlers();
        // this.handleObjectsIntersections();

        (window as any).game = this;

        window.setTimeout(() => {
            this.startGame();
        }, 2000);
    }

    update() {
        // CommonState.calculate();

        // this.scene.render();
        // this.scene.forceUpdate();
        // this.scene.interact();

        store.dispatch(moveAction(Accelerometer.getAcceleration()));

    }
    
}