/*
 * Object
 */

import SceneLayer from "./SceneLayer";
import Circle from "./shapes/Circle";
import {Size} from "./types/Size";
import {Coords} from "./types/Coords";

export interface SceneObject {

	setLayer(layer: SceneLayer);
	getLayer(): SceneLayer;

	getClassName(): string;

	getCoords(): Coords;

	getSize(): Size;

	getScale(): number;

	render(): void;

	isVisible(): boolean;

	isActual(): boolean;

	getShapes(): Circle[];

}