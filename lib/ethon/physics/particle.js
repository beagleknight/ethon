/*global define*/

define(function (require) {
    "use strict";

    var Vector = require("ethon/physics/vector"),
        Particle;

    /**
     * Simple object that can be simulated in the physics system
     * The constructor function initialize its attributes
     * @class Particle
     * @function constructor
     * @returns A new particle initialized in the origin with zero
     * velocity and acceleration
     */
    Particle = function () {
        this.position = new Vector();
        this.velocity = new Vector();
        this.acceleration = new Vector();
    };

    return Particle;
});
