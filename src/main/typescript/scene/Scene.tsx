import {Size} from "scene/types/Size";
import * as React from "react";
import Screen from "device/Screen"
import SceneLayer from "scene/layers/SceneLayer";

/**
 * Scene.
 *
 * Wrapper component for all scene elements (Scene Layers).
 */
export default class Scene extends React.Component {

    private domNode: HTMLElement;

    props: {
        children: React.ReactElement<SceneLayer>[]
    };

    state: {
        size: Size;
    };

    constructor(props) {
        super(props);

        this.state = {
            size: Screen.getSize()
        }
    }

    render() {
        return <div className="scene"
                    style={{width: this.state.size.width, height: this.state.size.height}}
                    ref={(div) => { this.domNode = div; }}>
            {React.Children.map(this.props.children, (child: any) => (
                React.cloneElement(child, {
                    size: this.state.size
                })
            ))}
            </div>;
    }

}
