export default class Accelerometer {

    // accelerometer state
    private static acceleration = {
        x: 0,
        y: 0,
        z: 0
    };

    // the watch id references the current `watchAcceleration`
    private static watchID = null;

    private constructor() {}

    static startWatch(frequency: number) {
        let options = {
            frequency: frequency
        };

        Accelerometer.watchID = (<any>navigator).accelerometer.watchAcceleration(
            (acceleration) => Accelerometer.onSuccess(acceleration),
            () => Accelerometer.onError(),
            options
        );
    }

    static stopWatch() {
        if (Accelerometer.watchID) {
            (<any>navigator).accelerometer.clearWatch(Accelerometer.watchID);
            Accelerometer.watchID = null;
        }
    }

    // onSuccess: get a snapshot of the current acceleration
    private static onSuccess(acceleration) {
        Accelerometer.acceleration = acceleration;
    }

    // onError: failed to get the acceleration
    private static onError() {
        alert('failed to get the acceleration');
    }

    static getAcceleration() {
        return Accelerometer.acceleration;
    }

}