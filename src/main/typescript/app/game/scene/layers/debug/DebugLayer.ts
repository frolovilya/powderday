import SceneLayer from "scene/layers/SceneLayer";
import DebugInfo from "app/game/scene/layers/debug/objects/DebugInfo";

/**
 * Display debug information
 */
export default class DebugLayer extends SceneLayer {

    constructor(props) {
        super(props);

        this.state.childrenObjects = [
            new DebugInfo({
                canvas: this.getCanvas()
            })
        ]

    }

}