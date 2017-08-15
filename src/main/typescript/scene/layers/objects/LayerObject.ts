import Canvas from "scene/layers/Canvas";
import Coords from "scene/Coords";

/**
 * Layer Object interface
 *
 * @see AbstractLayerObject.ts for details
 */
export interface LayerObject {

	getCanvas(): Canvas;

	getCoords(): Coords;

	getClassName(): string;

	setState(stateUpdate): void;

	getChildrenObjects(): LayerObject[];

	update(props?): void;

	transform(): void;

}