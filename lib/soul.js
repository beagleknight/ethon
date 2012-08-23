// TODO: requires extend helper function
// TODO: requires event emitter module
var ethon = ethon || {},
    window = window || {};

(function (window, exports) {
    "use strict";

    var extend = exports.extend,
        eventEmitter = exports.eventEmitter,
        position,
        velocity,
        Soul = function (name, x, y) {
            this.name = name;
            position = { x: x, y: y };
            velocity = { x: 0, y: 0 };
        };

    // Extend Soul with the EventEmitter for register
    // and trigger custom events.
    extend(eventEmitter, Soul.prototype);

    /**
     * setPosition
     *
     * Set the soul position given x and y
     */
    Soul.prototype.setPosition = function (x, y) {
        position.x = x;
        position.y = y;
    };

    /**
     * getPosition
     *
     * Return the position vector
     */
    Soul.prototype.getPosition = function () {
        return position;
    };

    /**
     * setVelocity
     *
     * Set the soul velocity given x and y
     */
    Soul.prototype.setVelocity = function (x, y) {
        velocity.x = x;
        velocity.y = y;
    };

    /**
     * getVelocity
     *
     * Return the velocity vector
     */
    Soul.prototype.getVelocity = function () {
        return velocity;
    };

    /**
     * update
     *
     * Update the soul position based on current velocity.
     */
    Soul.prototype.update = function (dt) {
        position.x += velocity.x * dt;
        position.y += velocity.y * dt;
    };

    exports.Soul = Soul;
}(window, ethon));
