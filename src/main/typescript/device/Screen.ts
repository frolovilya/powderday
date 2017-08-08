import {Size} from "scene/types/Size";
export default class Screen {

    static getSize(): Size {
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }
    }

}