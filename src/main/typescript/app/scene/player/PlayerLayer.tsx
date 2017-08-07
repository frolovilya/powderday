import SceneLayer from "scene/SceneLayer";
import PlayerObject from "app/scene/player/PlayerObject";
import * as React from "react";
import { connect } from 'react-redux'
import {SceneObject} from "../../../scene/SceneObject";
import store from "app/Store";

export default class PlayerLayer extends SceneLayer {

    constructor(props) {
        super(props);

        function select(state) {
            return state.scene.movement
        }

        const mapStateToProps = (state) => {
            return {
                angle: state.scene.movement.angle
            }
        };

        // const wrap = function(mapStateToProps: (state) => object, sceneObject: SceneObject) {
        //     store.subscribe(() => {
        //         sceneObject.update(mapStateToProps(store.getState()));
        //     });
        //
        //     return sceneObject;
        // };

        let currentValue;
        const wrap = function(mapStateToProps: (state) => object, sceneObject: SceneObject) {
            store.subscribe(() => {
                let previousValue = currentValue;
                currentValue = select(store.getState());
                if(previousValue != currentValue)
                    sceneObject.update(mapStateToProps(store.getState()));
            });

            return sceneObject;
        };

        this.state.childrenObjects = [
            wrap(mapStateToProps, new PlayerObject({
                canvas: this.getCanvas()
            }))
        ]

    }

    componentDidMount() {
        this.getCanvas().translate({
            x: this.getCanvas().getElement().width / 2,
            y: this.getCanvas().getElement().height / 2
        });

        super.componentDidMount();
    }

}