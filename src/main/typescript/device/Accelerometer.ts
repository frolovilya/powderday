/**
 * Device accelerometer
 */
export default {

    /**
     * Accelerometer state.
     * Changed by turning device in x,y,z axises.
     */
    _acceleration: {
        x: 0,
        y: 0,
        z: 0
    },

    /**
     * The watch id references the current "watchAcceleration"
     */
    _watchID: null,

    /**
     * Start watching current device acceleration
     *
     * @param frequency acceleration update frequency
     */
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

    /**
     * Stop watching current device acceleration
     */
    stopWatch() {
        if (this._watchID) {
            (<any>navigator).accelerometer.clearWatch(this._watchID);
            this._watchID = null;
        }
    },

    /**
     * Get a snapshot of the current acceleration
     * @private
     */
    _onSuccess(acceleration: DeviceAcceleration) {
        this._acceleration = acceleration;
    },

    /**
     * Failed to get the acceleration
     * @private
     */
    _onError() {
        alert("Failed to get the acceleration");
    },

    getAcceleration(): DeviceAcceleration {
        return this._acceleration;
    }

}