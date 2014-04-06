(function (require) {
    "use strict";

    var inherit      = require("./inherit"),
        EventEmitter = require("./event_emitter"),
        Soul;


    /**
     * Initialize name and position.
     *
     * @method Soul
     * @param {String} name Soul's identifier in game
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     */
    Soul = function (name, x, y) {
        EventEmitter.call(this);
        this.name = name;
        this.position = { x: x, y: y };
        this.velocity = { x: 0, y: 0 };
        this.body = null;
        this.collisionMap = null;
        this.checkCollision = true;
        this.remove = false;
    };

    // inherit EventEmitter for register and trigger custom events.
    inherit(Soul, EventEmitter);

    /**
     * Sets the soul position.
     *
     * @method setPosition
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     */
    Soul.prototype.setPosition = function (x, y) {
        this.position.x = x;
        this.position.y = y;
    };

    /**
     * Return the position vector
     * 
     * @method getPosition
     * @return The position of the soul
     */
    Soul.prototype.getPosition = function () {
        return this.position;
    };

    /**
     * Set the soul velocity given x and y
     *
     * @method setVelocity
     * @param {Number} x Velocity on the x-axis
     * @param {Number} y Velocity on the y-axis
     */
    Soul.prototype.setVelocity = function (x, y) {
        this.velocity.x = x;
        this.velocity.y = y;
    };

    /**
     * Return the velocity vector
     *
     * @method getVelocity
     * @return The velocity of the soul
     */
    Soul.prototype.getVelocity = function () {
        return this.velocity;
    };

    /**
     * Add vector to velocity vector
     *
     * @method addVelocity
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     */
    Soul.prototype.addVelocity = function (x, y) {
        this.velocity.y += x;
        this.velocity.y += y;
    };

    /**
     * Set the soul body for checking collisions.
     * 
     * @method setBody
     * @param {Object} body
     */
    Soul.prototype.setBody = function (body) {
        this.body = body;
    };

    /**
     * Return the soul body
     *
     * @method getBody
     * @return The soul body
     */
    Soul.prototype.getBody = function () {
        return this.body;
    };

    /**
     * Return the soul name
     *
     * @method getName
     * @return The soul name
     */
    Soul.prototype.getName = function () {
        return this.name;
    };

    /**
     * Set map to check collision against it.
     *
     * @method setCollisionMap
     * @param {CollisionMap} map
     */
    Soul.prototype.setCollisionMap = function (map) {
        this.collisionMap = map;
    };

    /**
     * Update the soul position based on current velocity.
     * Check collision against collision map and restore
     * position if collides.
     *
     * @method update
     * @param {Number} dt Milliseconds passed since last update
     */
    Soul.prototype.update = function (dt) {
        var x, y, collision;

        x = this.position.x + this.velocity.x * dt;
        y = this.position.y + this.velocity.y * dt;

        // Check collision against map if needed
        if (this.checkCollision && this.body !== null && this.collisionMap !== null) {
            collision = this.collisionMap.checkCollision(this);
            // Restore position if collision
            if (collision.x) {
                x = Math.round(this.position.x);
                if (this.velocity.x > 0) {
                    x -= x % 20;
                }
            }
            if (collision.y) {
                y = Math.round(this.position.y);
                y -= y % 20;
            }
        }

        this.position.x = x;
        this.position.y = y;
    };

    /**
     * Mark soul to be destroyed on the next loop.
     *
     * @method destroy
     */
    Soul.prototype.destroy = function () {
        this.remove = true;
    };

    module.exports = Soul;
}());
