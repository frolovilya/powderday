/**
 * Animation handler
 */
export default class Animation {

    private animationHandlerId = null;

    /**
     * window.requestAnimationFrame polyfill
     */
    private requestAnimFrame = (function() {
        return window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || (<any>window).mozRequestAnimationFrame
            || function(callback) {
                return window.setTimeout(callback, 1000 / 30);
             };
    })();

    /**
     * window.cancelAnimationFrame polyfill
     */
    private cancelAnimFrame = (function() {
        return window.cancelAnimationFrame
            || window.webkitCancelAnimationFrame
            || (<any>window).mozCancelAnimationFrame
            || function(id) {
                 window.clearTimeout(id);
             };
    })();

    start(callback: () => void) {
        this.animationHandlerId = this.requestAnimFrame.call(window, () => { this.start(callback); });
        callback();
    }

    stop() {
        this.cancelAnimFrame.call(window, this.animationHandlerId);
    }
}