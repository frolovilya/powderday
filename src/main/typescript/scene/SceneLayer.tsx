import {SceneObject} from "scene/SceneObject";
import {Size} from "scene/types/Size";
import {Coords} from "scene/types/Coords";
import Screen from "device/Screen"
import * as React from "react";
import Canvas from "scene/Canvas";

export default class SceneLayer extends React.Component {

    protected canvas: Canvas;

    private objectsList: SceneObject[] = [];
    
    props: {
        layerId: string;
        zIndex: number;
    };

    state: {
        size: Size;
        childrenObjects;
        canvas: Canvas;
    };

    constructor(props) {
        super(props);

        // console.log("init SceneLayer");

        this.state = {
            size: Screen.getSize(),
            childrenObjects: [],
            canvas: null
        };

    }

    componentDidMount() {
        // this.forceUpdateReferencedObjects();
        this.setState({
            canvas: this.canvas
        });
    }

    getId() {
        return this.props.layerId;
    }
    
    // setCanvas(canvas: Canvas) {
    //     this.setState({
    //         canvas: canvas
    //     })
    // }

    getCanvas() {
        return this.canvas;
    }

    // isPointVisible(point: Coords) {
    //     let sceneSize = Screen.getSize();
    //     return ( point.x > 0 && point.x < sceneSize.width
    //         && point.y > 0 && point.y < sceneSize.height );
    // }

    // addObjectReference(sceneObject: SceneObject) {
    //     sceneObject.setLayer(this);
    //     this.objectsList.push(sceneObject);
    // }
    //
    // getObjectsReferences() {
    //     return this.objectsList;
    // }
    //
    // forceUpdateReferencedObjects() {
    //     this.objectsList.forEach((obj: SceneObject) => obj.forceUpdate())
    // }

    getChildrenObjects() {
        return this.state.childrenObjects;
    }

    render() {
        // console.log("render layer " + this.getId());

        return <span>
            <Canvas layerId={this.props.layerId}
                   zIndex={this.props.zIndex}
                   size={Screen.getSize()}
                   ref={(canvas: Canvas) => this.canvas = canvas } />{this.getChildrenObjects()}
            {/*{React.Children.map(this.getChildrenObjects(), (child: any) => {*/}
                    {/*return React.cloneElement(child, {*/}
                        {/*// ref: (obj: SceneObject) => { this.addObjectReference(obj) }*/}
                        {/*canvas: this.state.canvas*/}
                    {/*})*/}
                {/*}*/}
            {/*)}*/}
        </span>
    }

    reset() {
        // this.objectsList
        //     .filter((sceneObject) => sceneObject.isActual())
        //     .map((sceneObject) => sceneObject.reset());
    }

}
