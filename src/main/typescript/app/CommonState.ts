import Model from "./Model";
import Accelerometer from "../device/Accelerometer";

export default class CommonState {

    private static state = {
        angle: 0,
        Vy: 0,
        Vx: 0,
        Sx: 0,
        Sy: 0,
        score: 0
    };

    public static reset() {
        CommonState.state = {
            angle: 0,
            Vy: 0,
            Vx: 0,
            Sx: 0,
            Sy: 0,
            score: 0
        };
    }
    
    public static calculate() {
        CommonState.state.angle = Model.calcAngle(CommonState.state.angle, Accelerometer.getAcceleration().x);

        let kp = Model.calcKantPressure(Accelerometer.getAcceleration().y);
        CommonState.state.Vy = Model.Va(CommonState.state.Vy, CommonState.state.angle, kp, Model.parameters.time);
        CommonState.state.Vx = Model.Vax(CommonState.state.Vy, CommonState.state.angle);

        CommonState.state.Sx = CommonState.state.Vx * Model.parameters.time * 10;
        CommonState.state.Sy = -CommonState.state.Vy * Model.parameters.time * 10 * 1.5;

        CommonState.state.score += Math.round( Math.abs(CommonState.state.Sy) / 5 );
    }

    public static getState() {
        return CommonState.state;
    }

}