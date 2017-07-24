/*
 * Object
 */

import SceneLayer from "./SceneLayer";
import Circle from "./shapes/Circle";
import {Size} from "./types/Size";

export interface SceneObject {

	render(layer: SceneLayer): void;

	getSize(): Size;

	isVisible(layer: SceneLayer): boolean;

	isActual(layer: SceneLayer): boolean;

	getIntersectionPoints(layer: SceneLayer): Circle[];

}