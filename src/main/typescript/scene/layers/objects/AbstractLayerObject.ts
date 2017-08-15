import {LayerObject} from "scene/layers/objects/LayerObject";
import Canvas from "scene/layers/Canvas";
import Coords from "scene/Coords";
import {Size} from "scene/types/Size";

/**
 * Abstract Layer Object (LO) implementation.
 *
 * Transforms canvas based on given props and current state.
 * Can contains other LOs.
 */
export abstract class AbstractLayerObject implements LayerObject {

    /**
     * Same as React props.
     * Should not be changed inside LO, immutable.
     */
    props: {
        canvas: Canvas; // canvas to transform
        coords: Coords; // object coordinates relative to parent object or canvas
        size?: Size; // object size
        scale?: number; // object scale
        checkVisibility?: boolean; // flag to enable visibility check when rendering
    };

    state: {
        childrenObjects: LayerObject[]; // any Layer Object can group other Layer Objects
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

    /**
     * Update LO state.
     * This will trigger re-rendering of this LO and all children LOs.
     *
     * @param stateUpdates state updates object
     */
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

    /**
     * Define class name in order to use in LO Registry.
     * Required for LO interactions.
     *
     * @returns {string} class name
     */
    getClassName() {
        return "generic";
    }

    /**
     * Get LOs grouped by this LO
     *
     * @returns {LayerObject[]}
     */
    getChildrenObjects() {
        return this.state.childrenObjects || [];
    }

    /**
     * Returns points array that define LO visibility.
     * Override this method to return custom visibility points.
     *
     * @returns {Point[]}
     */
    protected getVisibilityPoints() {
        let topLeft = this.props.coords.getPoint();
        let size = this.props.size;

        return [
            topLeft,
            {x: topLeft.x + size.width, y: topLeft.y},
            {x: topLeft.x, y: topLeft.y + size.height},
            {x: topLeft.x + size.width, y: topLeft.y + size.height}
        ];
    }

    /**
     * Check that this LO is visible on the current canvas.
     * Object is visible when at least one point defined in getVisibilityPoints() is visible.
     *
     * @returns {boolean} true if visible, false otherwise
     */
    private isVisible() {
        if(!this.props.checkVisibility)
            return true;

        return this.getVisibilityPoints()
                .filter((point) => this.getCanvas().isPointVisible(point)).length > 0;
    }

    /**
     * Update LO props and trigger re-rendering of this LO and all children LOs
     *
     * @param props props update object
     */
    update(props?) {
        this.props = {
            ...(this.props),
            ...props
        };

        this.render();
    }

    private render() {
        if(this.getCanvas() && this.isVisible()) {
            this.transform();

            this.getChildrenObjects().map((sceneObject) => {
                sceneObject.update({
                    canvas: this.getCanvas()
                });
            });
        }
    }

    /**
     * Override this method to define transformations performed on Canvas by LO
     * Default implementation is empty.
     */
    transform() {}

}