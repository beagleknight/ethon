/*global define*/

/**
 * Provides a quad shape for testing collisions.
 *
 * @class QuadBody
 */
define(function (require) {
    "use strict";

    /**
     * Initialize a QuadBody
     *
     * @method QuadBody
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     * @param {Number} w Width of the shape
     * @param {Number} h Height of the shape
     * @param {String} collisionGroup Identifier of the collision group. Used
     * on collision testing.
     */
    var QuadBody = function (x, y, w, h, collisionGroup) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.collisionGroup = collisionGroup;
    };

    return QuadBody;
});
