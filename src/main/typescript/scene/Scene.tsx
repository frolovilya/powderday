import {Size} from "scene/types/Size";
import * as React from "react";
import Screen from "device/Screen"

export default class Scene extends React.Component {

    private domNode: HTMLElement;

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
                    ref={(div) => { this.domNode = div; }}>{this.props.children}</div>;
    }

}
