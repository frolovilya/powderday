import Canvas from "scene/layers/Canvas";
import Coords from "scene/Coords";

export interface LayerObject {

	getCanvas(): Canvas;

	getCoords(): Coords;

	getClassName(): string;

	setState(stateUpdate): void;

	getChildrenObjects(): LayerObject[];

	update(props?): void;

	transform(): void;

}