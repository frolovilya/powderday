import {SceneObject} from "scene/SceneObject";
import {Size} from "scene/types/Size";
import Screen from "device/Screen"
import * as React from "react";
import Canvas from "scene/Canvas";

export default class SceneLayer extends React.Component {

    protected canvas: Canvas;

    props: {
        layerId: string;
        zIndex: number;
    };

    state: {
        size: Size;
        childrenObjects: SceneObject[];
        canvas: Canvas;
    };

    constructor(props) {
        super(props);

        this.state = {
            size: Screen.getSize(),
            childrenObjects: [],
            canvas: null
        };

    }

    componentDidMount() {
        this.setState({
            canvas: this.canvas
        });
    }

    getCanvas() {
        return this.canvas;
    }

    getChildrenObjects() {
        return this.state.childrenObjects;
    }

    render() {
        return <span>
            <Canvas layerId={this.props.layerId}
                   zIndex={this.props.zIndex}
                   size={Screen.getSize()}
                   ref={(canvas: Canvas) => this.canvas = canvas } />
            {this.getChildrenObjects().map((sceneObject) => {
                sceneObject.update({
                    canvas: this.state.canvas
                });
            })}
        </span>
    }

}
