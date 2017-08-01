import SceneIntersections from "scene/interactions/ObjectsIntersections";
import {Size} from "scene/types/Size";
import * as React from "react";
import Screen from "device/Screen"

export default class Scene extends React.Component {

    private domNode: HTMLElement;

    private intersections = new SceneIntersections();

    state: {
        size: Size;
    };

    constructor(props) {
        super(props);

        this.state = {
            size: Screen.getSize()
        }
    }

    getSize(): Size {
        return this.state.size;
    }

    getLayers() {
        return React.Children.map(this.props.children, function() {
            console.log(this, arguments);
            return this;
        });
    }

    render() {
        // console.log("Render Main");

        return <div className="scene"
                    style={{width: this.state.size.width, height: this.state.size.height}}
                    ref={(div) => { this.domNode = div; }}>{this.props.children}</div>;
    }

    // componentDidUpdate() {
    //     // check for new intersections & fire callbacks
    //     this.intersections.check(this);
    // }
}
