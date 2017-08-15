import Canvas from "scene/layers/Canvas";
import Coords from "scene/Coords";
import {Size} from "../../types/Size";

export interface LayerObject {

	getCanvas(): Canvas;

	getCoords(): Coords;

	getSize(): Size;

	getClassName(): string;

	setState(stateUpdate): void;

	getChildrenObjects(): LayerObject[];

	update(props?): void;

	transform(): void;

}