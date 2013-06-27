/*global define*/

/**
 * Provides a circle shape for testing collisions.
 *
 * @class CircleBody
 */
define(function () {
    "use strict";

    /**
     * Initialize a CircleBody
     *
     * @method CircleBody
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     * @param {Number} r Radius
     */
    var CircleBody = function (x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    };

    return CircleBody;
});
