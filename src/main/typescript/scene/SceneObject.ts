/*
 * Object
 */

import SceneLayer from "./SceneLayer";
import Circle from "./intersections/points/Circle";

export interface SceneObject {

	render(layer: SceneLayer): void;

	isVisible(layer: SceneLayer): boolean;

	isActual(layer: SceneLayer): boolean;

	getIntersectionPoints(layer: SceneLayer): Circle[];

}