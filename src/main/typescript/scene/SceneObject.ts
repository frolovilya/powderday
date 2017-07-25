/*
 * Object
 */

import SceneLayer from "./SceneLayer";
import Circle from "./shapes/Circle";
import {Size} from "./types/Size";
import {Coords} from "./types/Coords";

export interface SceneObject {

	getClassName(): string;

	setLayer(layer: SceneLayer);
	getLayer(): SceneLayer;

	getShapes(): Circle[];

	getCoords(): Coords;

	getSize(): Size;

	setScale(scale: number);
	getScale(): number;

	isVisible(): boolean;
	isActual(): boolean;

	render(): void;

}