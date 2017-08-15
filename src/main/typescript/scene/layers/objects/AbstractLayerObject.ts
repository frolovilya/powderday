import {LayerObject} from "scene/layers/objects/LayerObject";
import Canvas from "scene/layers/Canvas";
import Coords from "scene/Coords";
import {Size} from "scene/types/Size";

export abstract class AbstractLayerObject implements LayerObject {

    props: {
        canvas: Canvas;
        coords: Coords;
        size?: Size;
        scale?: number;
        checkVisibility?: boolean;
    };

    state: {
        childrenObjects: LayerObject[];
    };

    constructor(props?) {
        this.props = {
            canvas: null,
            coords: new Coords({
                x: 0,
                y: 0
            }),
            scale: 1,
            size: {
                width: 0,
                height: 0
            },
            checkVisibility: true,
            ...props
        };

        this.state = {
            childrenObjects: []
        };
    }

    setState(stateUpdates) {
        const state = this.state;
        this.state = {
            state,
            ...stateUpdates
        };

        this.update();
    }
    
    getCanvas() {
        return this.props.canvas;
    }

    getCoords() {
        return this.props.coords;
    }

    getClassName() {
        return "generic";
    }

    getChildrenObjects() {
        return this.state.childrenObjects || [];
    }

    getSize() {
        return this.props.size;
    }

    protected getVisibilityPoints() {
        let topLeft = this.props.coords.getPoint();
        let size = this.getSize();

        return [
            topLeft,
            {x: topLeft.x + size.width, y: topLeft.y},
            {x: topLeft.x, y: topLeft.y + size.height},
            {x: topLeft.x + size.width, y: topLeft.y + size.height}
        ];
    }

    private isVisible() {
        if(!this.props.checkVisibility)
            return true;

        return this.getVisibilityPoints()
                .filter((point) => this.getCanvas().isPointVisible(point)).length > 0;
    }

    update(props?) {
        this.props = {
            ...(this.props),
            ...props
        };

        if(this.getCanvas() && this.isVisible()) {
            this.transform();

            this.getChildrenObjects().map((sceneObject) => {
                sceneObject.update({
                    canvas: this.getCanvas()
                });
            });
        }
    }

    transform() {}

}