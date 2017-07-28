import Model from "app/Model";
import Accelerometer from "device/Accelerometer";

export default class SharedState {

    private static state = {
        angle: 0,
        Vy: 0,
        Vx: 0,
        Sx: 0,
        Sy: 0,
        score: 0
    };

    public static reset() {
        SharedState.state = {
            angle: 0,
            Vy: 0,
            Vx: 0,
            Sx: 0,
            Sy: 0,
            score: 0
        };
    }
    
    public static calculate() {
        SharedState.state.angle = Model.calcAngle(SharedState.state.angle, Accelerometer.getAcceleration().x);

        let kp = Model.calcKantPressure(Accelerometer.getAcceleration().y);
        SharedState.state.Vy = Model.Va(SharedState.state.Vy, SharedState.state.angle, kp, Model.parameters.time);
        SharedState.state.Vx = Model.Vax(SharedState.state.Vy, SharedState.state.angle);

        SharedState.state.Sx = SharedState.state.Vx * Model.parameters.time * 10;
        SharedState.state.Sy = -SharedState.state.Vy * Model.parameters.time * 10 * 1.5;

        SharedState.state.score += Math.round( Math.abs(SharedState.state.Sy) / 5 );
    }

    public static getState() {
        return SharedState.state;
    }

}