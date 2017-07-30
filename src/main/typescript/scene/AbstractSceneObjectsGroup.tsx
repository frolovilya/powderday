import {SceneObject} from "scene/SceneObject";
import SceneLayer from "scene/SceneLayer";
import {Coords} from "scene/types/Coords";
import * as React from "react";
import {AbstractSceneObject} from "./AbstractSceneObject";

export abstract class AbstractSceneObjectsGroup extends AbstractSceneObject {

    state: {
        childrenObjects;
    };

    render() {
        if(this.getLayer()) {

            this.transform();

            return <div>
                {React.Children.map(this.state.childrenObjects, (child: any) => {
                        return React.cloneElement(child, {
                            layer: this.getLayer()
                        })
                    }
                )}
            </div>
        }

        return null;
    }


}