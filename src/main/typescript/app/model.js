/*
 * Application math model
 */
var model = {

    parameters: {
        time: 0.06, // sec
        mass: 75, // kg
        gravity: 9.81,
        kGravityHeight: 0.2,
        kSnowFriction: 150,
        kAirFriction: 0.00025,
        powAir: 3,
        kAngleAccelerationMultiplier: 2,
        kKantPressureAccelerationMultiplier: 0.3
    },

    // calculate deck angle
    calcAngle: function(prevAngle, acceleration) {
        var sign = (acceleration >= 0 ? 1 : -1);

        var angle = (prevAngle + sign * Math.pow(acceleration, 2) 
            * this.parameters.kAngleAccelerationMultiplier * this.parameters.time) % 360;
        if(angle >= 90)
            angle = 90;
        if(angle <= -90)
            angle = -90;

        return angle;
    },

    // calculate kant pressure
    calcKantPressure: function(acceleration) {    
        return this.parameters.kKantPressureAccelerationMultiplier;
        /*if(acceleration < 0) {
            return acceleration * this.parameters.kKantPressureAccelerationMultiplier;
        } else {
            return 0;
        }*/
    },

    // snow friction
    Fs: function(angle, kantPressure) {
        return this.parameters.kSnowFriction * Math.abs(Math.sin(angle * 3.14 / 180)) * (1 + kantPressure);
    },

    // air friction
    Fa: function(V) {
        return this.parameters.kAirFriction * Math.pow(V, this.parameters.powAir);
    },

    // gravity
    Ft: function() {
        return this.parameters.mass * this.parameters.gravity * this.parameters.kGravityHeight;
    },

    // newton
    Fr: function(angle, kantPressure) {
        return this.Ft() - this.Fs(angle, kantPressure);
    },

    // acceleration
    A: function(angle, kantPressure) {
        return this.Fr(angle, kantPressure) / this.parameters.mass;
    },

    // speed
    V: function(V0, angle, kantPressure, dt) {
        var speed = V0 + this.A(angle, kantPressure) * dt;

        return (speed > 0 ? speed : 0);
    },

    // compensate speed
    Va: function(V0, angle, kantPressure, dt) {
        var speed = this.V(V0, angle, kantPressure, dt);
        var speedCompensated = speed - this.Fa(speed);

        return (speedCompensated > 0 ? speedCompensated : 0);
    },

    // Va -> x
    Vax: function(V, angle) {
        return V * Math.sin(angle * 3.14 / 180) * 2;
    },

    // Va -> y
    Vay: function(V, angle) {
        return V * Math.cos(angle * 3.14 / 180);
    }

}
