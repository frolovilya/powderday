import Canvas from "./Canvas";
import Coords from "scene/types/Coords";

export interface SceneObject {

	getCanvas(): Canvas;

	getCoords(): Coords;

	getClassName(): string;

	setState(stateUpdate): void;

	getChildrenObjects(): SceneObject[];

	registerObject(): void;

	update(props?): void;

	transform(): void;

}