import SceneLayer from "scene/SceneLayer";
import DebugInfoObject from "./DebugInfoObject";

export default class DebugLayer extends SceneLayer {

    constructor(props) {
        super(props);

        this.state.childrenObjects = [
            new DebugInfoObject({
                canvas: this.getCanvas()
            })
        ]

    }

}