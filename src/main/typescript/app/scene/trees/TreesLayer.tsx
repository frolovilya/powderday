import SceneLayer from "scene/SceneLayer";
import Accelerometer from "device/Accelerometer";
import Model from "app/Model";
import TreeFactory from "app/scene/trees/TreeFactory";
import SharedState from "app/SharedState";
import {Size} from "scene/types/Size";
import Forest from "app/scene/trees/Forest";
import * as React from "react";
import Canvas from "../../../scene/Canvas";
import { connect } from 'react-redux'
import {SceneObject} from "../../../scene/SceneObject";
import store from "app/Store";
import {AbstractSceneObject} from "scene/AbstractSceneObject";

export default class TreesLayer extends SceneLayer {

    constructor(props) {
        super(props);

        // function select(state) {
        //     return state.scene.movement
        // }
        //
        // let currentValue;
        // const wrap = function(mapStateToProps: (state) => object, sceneObject: SceneObject) {
        //     store.subscribe(() => {
        //         let previousValue = currentValue;
        //         currentValue = select(store.getState());
        //         if(previousValue != currentValue)
        //             sceneObject.update(mapStateToProps(store.getState()));
        //     });
        //
        //     return sceneObject;
        // };

        const mapStateToProps = () => {
            const state: any = store.getState();
            return {
                Sx: state.scene.movement.Sx,
                Sy: state.scene.movement.Sy
            }
        };

        const wrap = function(getUpdateProps: () => object, sceneObject: SceneObject) {
            let SceneObjectWrap = class {
                update(props) {
                    const propsToUpdate = getUpdateProps();
                    sceneObject.update({
                        ...propsToUpdate,
                        ...props
                    })
                }
                getCanvas() {
                    return sceneObject.getCanvas();
                }
                getCoords() {
                    return sceneObject.getCoords();
                }
                getClassName() {
                    return sceneObject.getClassName();
                }
                setState(stateUpdates) {
                    return sceneObject.setState(stateUpdates);
                }
                getChildrenObjects() {
                    return sceneObject.getChildrenObjects();
                }
                registerObject() {
                    return sceneObject.registerObject();
                }
                transform() {
                    return sceneObject.transform();
                }
            };

            return new SceneObjectWrap();
        };

        this.state.childrenObjects = [
            wrap(mapStateToProps, new Forest({
                canvas: this.getCanvas(),
                Sx: 0,
                Sy: 0
            }))
        ];

        (window as any).treesLayer = this;
    }

}