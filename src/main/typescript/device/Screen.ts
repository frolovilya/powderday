import {Size} from "scene/types/Size";
export default class Screen {

    static getSize(): Size {
        return {
            width: $((<any>window)).width(),
            height: $((<any>window)).height()
        }
    }

}