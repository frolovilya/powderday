import SceneLayer from "scene/SceneLayer";
import PlayerObject from "app/scene/player/PlayerObject";
import * as React from "react";
import { connect } from 'react-redux'
import {SceneObject} from "../../../scene/SceneObject";
import store from "app/Store";

export default class PlayerLayer extends SceneLayer {

    private ConnectedPlayerObject;

    constructor(props) {
        super(props);

        // console.log("PlayerLayer.constructor()");

        // const mapStateToProps = (state) => {
        //     return {
        //         angle: state.movement.angle
        //     }
        // };
        //
        // const ConnectedPlayerObject = connect(mapStateToProps)(PlayerObject);
        //
        // this.state.childrenObjects = [
        //     <ConnectedPlayerObject key="player_1" />
        // ];

        const mapStateToProps = (state) => {
            return {
                angle: state.movement.angle
            }
        };

        const wrap = function(mapStateToProps: (state) => object, sceneObject: SceneObject) {
            store.subscribe(() => {
                sceneObject.update(mapStateToProps(store.getState()));
            });
            
            return sceneObject;
        };

        // this.ConnectedPlayerObject = connect(mapStateToProps)(PlayerObject);
        //
        //

        this.state.childrenObjects = [
            wrap(mapStateToProps, new PlayerObject({
                canvas: this.getCanvas()
            }))
        ]

    }

    // private mapStateToProps = (state) => {
    //     return {
    //         angle: state.movement.angle
    //     }
    // };

    // getChildrenObjects() {
    //     // console.log("PlayerLayer.getChildrenObjects()");
    //
    //     // const ConnectedPlayerObject = connect(mapStateToProps)(PlayerObject);
    //
    //     return [
    //         <this.ConnectedPlayerObject canvas={this.getCanvas()} key="player_1" />
    //     ];
    // }

}