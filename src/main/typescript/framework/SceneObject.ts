/*
 * Object
 */

import SceneLayer from "./SceneLayer";

export interface SceneObject {

	render(layer: SceneLayer): void;

	isVisible(layer: SceneLayer): boolean;

	isActual(layer: SceneLayer): boolean;

	getIntersectionPoints(layer: SceneLayer);

}
