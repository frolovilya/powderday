export default {

    // accelerometer state
    _acceleration: {
        x: 0,
        y: 0,
        z: 0
    },

    // the watch id references the current `watchAcceleration`
    _watchID: null,

    startWatch(frequency: number) {
        let options = {
            frequency: frequency
        };

        this._watchID = (<any>navigator).accelerometer.watchAcceleration(
            (acceleration) => this._onSuccess(acceleration),
            () => this._onError(),
            options
        );
    },

    stopWatch() {
        if (this._watchID) {
            (<any>navigator).accelerometer.clearWatch(this._watchID);
            this._watchID = null;
        }
    },

    // onSuccess: get a snapshot of the current acceleration
    _onSuccess(acceleration) {
        this._acceleration = acceleration;
    },

    // onError: failed to get the acceleration
    _onError() {
        alert('failed to get the acceleration');
    },

    getAcceleration() {
        return this._acceleration;
    }

}