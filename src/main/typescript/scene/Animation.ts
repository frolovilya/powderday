export default class Animation {

    private animationHandlerId = null;

    //private isAnimationInProcess = null;

    private requestAnimFrame = (function() {
        return  window.requestAnimationFrame        ||
            window.webkitRequestAnimationFrame  ||
            (<any>window).mozRequestAnimationFrame    ||
             function(callback) {
                return window.setTimeout(callback, 1000 / 30);
             };
    })();

    private cancelAnimFrame = (function() {
        return window.cancelAnimationFrame       ||
            window.webkitCancelAnimationFrame ||
            (<any>window).mozCancelAnimationFrame    ||
             function(id) {
                 window.clearTimeout(id);
             }
    })();

    // animation loop
    start(callback: () => void) {
        //if(this.isAnimationInProcess || this.isAnimationInProcess == null) {
            this.animationHandlerId = this.requestAnimFrame.call(window, () => { this.start(callback); });
            callback();
        //}
    }

    stop() {
        //this.isAnimationInProcess = false;
        this.cancelAnimFrame.call(window, this.animationHandlerId);
    }
}