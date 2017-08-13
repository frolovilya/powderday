import Coords from "scene/Coords";
import Circle from "scene/layers/objects/shapes/Circle";
import {AbstractLayerObject} from "scene/layers/objects/AbstractLayerObject";
import TreeSprite from "app/game/scene/layers/trees/objects/TreeSprite";
import Canvas from "scene/layers/Canvas";

export default class Tree extends AbstractLayerObject {

    props: {
        treeResource: any;
        coords: Coords;
        scale: number;
        canvas: Canvas;
    };

    constructor(props) {
        super(props);

        this.state.childrenObjects = [
            new Circle({
                coords: new Coords(this.props.treeResource.shape.coords, this.props.coords, this.props.scale),
                scale: this.props.scale,
                radius: this.props.treeResource.shape.radius,
                canvas: this.getCanvas()
            }),
            new TreeSprite({
                treeResource: this.props.treeResource,
                coords: new Coords({x: 0, y: 0}, this.props.coords, this.props.scale),
                scale: this.props.scale,
                canvas: this.getCanvas()
            })
        ]

    }

    getClassName() {
        return "tree";
    }

}