import Game from "app/game/Game"

/**
 * Application entry point
 */
class App {

    /**
     * Start application
     */
    static start() {
        new App().bindEvents();
    }

    /**
     * Bind event listeners
     *
     * Bind any events that are required on startup. Common events are:
     * 'load', 'deviceready', 'offline', and 'online'.
     */
    bindEvents() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    }

    /**
     * DeviceReady event handler
     *
     * The scope of 'this' is the event. 
     */
    onDeviceReady() {
        new Game().init();
    }
    
}

(<any>window).App = App;
