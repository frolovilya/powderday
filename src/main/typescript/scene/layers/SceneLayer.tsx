import {LayerObject} from "scene/layers/objects/LayerObject";
import {Size} from "scene/types/Size";
import * as React from "react";
import Canvas from "scene/layers/Canvas";

/**
 * Scene Layer.
 *
 * Connects Canvas with Layer Objects.
 */
export default class SceneLayer extends React.Component {

    protected canvas: Canvas;

    props: {
        layerId: string;
        zIndex: number;
        size?: Size;
    };

    static defaultProps = {
        size: {
            width: 0,
            height: 0
        }
    };

    state: {
        childrenObjects: LayerObject[];
        canvas: Canvas;
    };

    constructor(props) {
        super(props);

        this.state = {
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

    /**
     * Get the list of children layer objects to render.
     * Override this method to dynamically set children layer objects.
     *
     * @returns {LayerObject[]}
     */
    getChildrenObjects() {
        return this.state.childrenObjects;
    }

    render() {
        return <span>
            <Canvas layerId={this.props.layerId}
                   zIndex={this.props.zIndex}
                   size={this.props.size}
                   ref={(canvas: Canvas) => this.canvas = canvas } />
            {this.getChildrenObjects().map((sceneObject) => {
                sceneObject.update({
                    canvas: this.state.canvas
                });
            })}
        </span>
    }

}
