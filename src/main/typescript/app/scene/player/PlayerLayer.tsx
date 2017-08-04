import SceneLayer from "scene/SceneLayer";
import PlayerObject from "app/scene/player/PlayerObject";
import * as React from "react";
import { connect } from 'react-redux'

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

        this.ConnectedPlayerObject = connect(mapStateToProps)(PlayerObject);
    }

    // private mapStateToProps = (state) => {
    //     return {
    //         angle: state.movement.angle
    //     }
    // };

    getChildrenObjects() {
        // console.log("PlayerLayer.getChildrenObjects()");

        // const ConnectedPlayerObject = connect(mapStateToProps)(PlayerObject);

        return [
            <this.ConnectedPlayerObject canvas={this.getCanvas()} key="player_1" />
        ];
    }

}