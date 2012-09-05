var define = define || undefined;

define(function (require) {
    "use strict";

    var extend       = require("ethon/extend"),
        eventEmitter = require("ethon/event_emitter"),
        Soul;


    /**
     * constructor function
     *
     * Initialize soul name and position
     */
    Soul = function (name, x, y) {
        this.name = name;
        this.body = null;
        this.collisionMap = null;
        this.checkCollision = true;
        this.remove = false;
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
     * getName
     *
     * Return the soul name
     */
    Soul.prototype.getName = function () {
        return this.name;
    };

    Soul.prototype.setCollisionMap = function (map) {
        this.collisionMap = map;
    };

    /**
     * update
     *
     * Update the soul position based on current velocity.
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
                x = this.position.x;
            }
            if (collision.y) {
                y = this.position.y;
            }
        }

        this.position.x = x;
        this.position.y = y;
    };

    // TODO: Improve or add something
    Soul.prototype.destroy = function () {
        this.remove = true;
    };

    return Soul;
});
