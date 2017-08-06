import SceneLayer from "scene/SceneLayer";
import Circle from "scene/shapes/Circle";
import {Size} from "scene/types/Size";
import {Coords} from "scene/types/Coords";
import * as React from "react";
import Canvas from "./Canvas";

export interface SceneObject {

	getClassName(): string;

	setState(stateUpdate): void;

	getChildrenObjects(): SceneObject[];

	registerObject(): void;

	update(props?): void;

	transform(): void;

}