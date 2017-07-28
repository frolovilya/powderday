/*
 * Object
 */

import SceneLayer from "scene/SceneLayer";
import Circle from "scene/shapes/Circle";
import {Size} from "scene/types/Size";
import {Coords} from "scene/types/Coords";

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

	reset(): void;
	render(): void;

}