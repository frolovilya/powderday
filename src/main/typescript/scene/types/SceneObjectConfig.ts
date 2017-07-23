import {Size} from "./Size";
import {Coords} from "./Coords";

export type SceneObjectConfig = {
    sprite: {
        src: string,
        size: Size,
        positions?: object
    },
    shape: {
        coords: Coords,
        radius?: number,
        type: string
    }
}