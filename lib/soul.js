// TODO: requires extend helper function
// TODO: requires event emitter module
var ethon = ethon || {},
    window = window || {};

(function (window, exports) {
    "use strict";

    var extend = exports.extend,
        eventEmitter = exports.eventEmitter,
        velocity,
        Soul = function (name, x, y) {
            this.name = name;
            this.body = null;
            this.position = { x: x, y: y };
            this.velocity = { x: 0, y: 0 };
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
        this.position.x = x;
        this.position.y = y;
    };

    /**
     * getPosition
     *
     * Return the position vector
     */
    Soul.prototype.getPosition = function () {
        return this.position;
    };

    /**
     * setVelocity
     *
     * Set the soul velocity given x and y
     */
    Soul.prototype.setVelocity = function (x, y) {
        this.velocity.x = x;
        this.velocity.y = y;
    };

    /**
     * getVelocity
     *
     * Return the velocity vector
     */
    Soul.prototype.getVelocity = function () {
        return this.velocity;
    };

    /**
     * setBody
     *
     * Set the soul body for checking collisions.
     */
    Soul.prototype.setBody = function (body) {
        this.body = body;
    };

    /**
     * getBody
     *
     * Return the soul body
     */
    Soul.prototype.getBody = function () {
        return this.body;
    };

    /**
     * update
     *
     * Update the soul position based on current velocity.
     */
    Soul.prototype.update = function (dt) {
        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;
    };

    exports.Soul = Soul;
}(window, ethon));
