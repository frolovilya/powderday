/*
 * Application
 */

import Main from "./Main"

class App {

    // start application
    static start() {
        new App().bindEvents();
    }

    /*
     * bind event listeners
     *
     * Bind any events that are required on startup. Common events are:
     * 'load', 'deviceready', 'offline', and 'online'.
     */
    bindEvents() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    }

    /*
     * deviceready event handler
     *
     * The scope of 'this' is the event. 
     */
    onDeviceReady() {
        new Main().init();
    }
    
}

(<any>window).App = App;
