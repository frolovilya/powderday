/**
 * Game math model
 */
export default {

    parameters: {
        time: 0.06, // update frequency (time delta) (sec)
        mass: 80, // player mass (kg)
        gravity: 9.81, // gravity (m/sec^2)
        kGravity: 0.2,
        kSnowFriction: 150, // snow friction k.
        kSpeedCompensation: 0.00025,
        powSpeedCompensation: 3,
        kAngleAccelerationMultiplier: 2,
        kEdgePressureAccelerationMultiplier: 0.3
    },

    /**
     * Calculate deck angle
     *
     * @params prevAngle previous deck angle
     * @params accX acceleration on X
     */
    angle: function(prevAngle, accX) {
        let sign = (accX >= 0 ? 1 : -1);

        let angle = (prevAngle + sign * Math.pow(accX, 2) * this.parameters.kAngleAccelerationMultiplier
            * this.parameters.time) % 360;

        if(angle >= 90)
            angle = 90;
        if(angle <= -90)
            angle = -90;

        return angle;
    },

    /**
     * Calculate pressure on snowboard edge
     *
     * @param accY acceleration on Y
     */
    edgePressure: function(accY) {
        //return Math.abs(accY < -1 ? accY : 1) * this.parameters.kEdgePressureAccelerationMultiplier;
        return this.parameters.kEdgePressureAccelerationMultiplier;
    },

    /**
     * Calculate snow friction force
     *
     * @param angle
     * @param edgePressure
     */
    snowFrictionForce: function(angle, edgePressure) {
        return Math.abs(Math.sin(angle * 3.14 / 180)) * (1 + edgePressure) * this.parameters.kSnowFriction;
    },

    /**
     * Calculate gravity force
     *
     * F = kg * (m / sec^2)
     */
    gravityForce: function() {
        return this.parameters.mass * this.parameters.gravity * this.parameters.kGravity;
    },

    /**
     * Calculate result force
     *
     * @param angle deck angle
     * @param edgePressure deck edge pressure
     */
    resultForce: function(angle, edgePressure) {
        return this.gravityForce() - this.snowFrictionForce(angle, edgePressure);
    },

    /**
     * Acceleration
     *
     * @param angle deck angle
     * @param edgePressure deck edge pressure
     */
    acceleration: function(angle, edgePressure) {
        return this.resultForce(angle, edgePressure) / this.parameters.mass;
    },

    /**
     * Speed
     *
     * @param V0 start speed
     * @param angle deck angle
     * @param edgePressure deck edge pressure
     * @param dt time frame
     */
    V: function(V0, angle, edgePressure, dt) {
        let speed = V0 + this.acceleration(angle, edgePressure) * dt;

        return (speed > 0 ? speed : 0);
    },

    /**
     * Calculate speed compensation
     *
     * Vcomp = k * V^3
     *
     * @param V speed
     */
    speedCompensation: function(V) {
        return this.parameters.kSpeedCompensation * Math.pow(V, this.parameters.powSpeedCompensation);
    },

    /**
     * Calculate current speed
     *
     * Va = V - Vcomp = V - k * V^3
     *
     * @param V0 start speed
     * @param angle deck angle
     * @param accY acceleration on Y
     */
    Va: function(V0, angle, accY) {
        let edgePressure = this.edgePressure(accY);
        let speed = this.V(V0, angle, edgePressure, this.parameters.time);
        let speedCompensated = speed - this.speedCompensation(speed);

        return (speedCompensated > 0 ? speedCompensated : 0);
    },

    /**
     * Project speed on X
     *
     * @param V speed
     * @param angle deck angle
     */
    Vax: function(V, angle) {
        return V * Math.sin(angle * 3.14 / 180) * 2;
    },

    /**
     * Project speed on Y
     *
     * @param V
     * @param angle
     *
    Vay: function(V, angle) {
        return V * Math.cos(angle * 3.14 / 180);
    },*/

    /**
     * Calculate X distance
     *
     * @param Vx V projection on X
     */
    Sx: function(Vx) {
        return Vx * this.parameters.time * 10;
    },

    /**
     * Calculate Y distance
     *
     * @param Vy V projection on Y
     */
    Sy: function(Vy) {
        return -Vy * this.parameters.time * 10 * 1.5;
    },

    score: function(prevScore, Sy) {
        return prevScore + Math.round( Math.abs(Sy) / 5 );
    }

}
