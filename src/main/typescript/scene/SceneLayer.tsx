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
    };

    constructor(props) {
        super(props);

        console.log("init SceneLayer");

        this.state = {
            size: Screen.getSize(),
            childrenObjects: []
        };

    }

    // shouldComponentUpdate() {
    //     console.log("should " + this.getId() + " layer update?");
    //
    //     return false;
    // }

    componentDidMount() {
        this.forceUpdateChildrenObjects();
    }

    getId() {
        return this.props.layerId;
    }

    getCanvas() {
        return this.canvas;
    }

    isPointVisible(point: Coords) {
        let sceneSize = Screen.getSize();
        return ( point.x > 0 && point.x < sceneSize.width
            && point.y > 0 && point.y < sceneSize.height );
    }

    addObject(sceneObject: SceneObject) {
        sceneObject.setLayer(this);
        this.objectsList.push(sceneObject);
    }

    getObjects() {
        return this.objectsList;
    }

    forceUpdateChildrenObjects() {
        this.objectsList.forEach((obj: SceneObject) => obj.forceUpdate())
    }

    // isReady() {
    //     return !!this.canvas;
    // }

    render() {
        console.log("render layer " + this.getId());

        return <Canvas layerId={this.props.layerId}
                       zIndex={this.props.zIndex}
                       size={Screen.getSize()}
                       ref={(canvas: Canvas) => this.canvas = canvas }>
            {React.Children.map(this.state.childrenObjects, (child: any) => {
                    return React.cloneElement(child, {
                        ref: (obj: SceneObject) => { this.addObject(obj) }
                    })
                }
            )}
        </Canvas>
    }

    reset() {
        // this.objectsList
        //     .filter((sceneObject) => sceneObject.isActual())
        //     .map((sceneObject) => sceneObject.reset());
    }

}
