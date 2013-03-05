/*global define*/

define(function (require) {
    "use strict";

    var Vector;

    /**
     * Basic 2-dimnensional Vector class
     * The constructor function initialize both dimensions.
     * @class Vector
     * @function constructor
     * @param {Number} x Initial value for x-axis
     * @param {Number} y Initial value for y-axis
     * @returns A new vector initialized on given position or origin
     */
    Vector = function (x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };

    /**
     * Invert vector's components
     * @function invert
     * @returns nothing
     */
    Vector.prototype.invert = function () {
        this.x = -this.x;
        this.y = -this.y;
    };

    /**
     * Compute vector's magnitude
     * @function magnitude
     * @returns Vector's magnitude
     */
    Vector.prototype.magnitude = function () {
        return Math.sqrt(this.squaredMagnitude());
    };

    /**
     * Compute squred version of vector's magnitude
     * @function squaredMagnitude
     * @returns Squared version of vector's magnitude
     */
    Vector.prototype.squaredMagnitude = function () {
        return this.x * this.x + this.y * this.y;
    };

    /**
     * Turns a non-zero vector into a vector of unit length.
     * @function normalize
     * @returns nothing
     */
    Vector.prototype.normalize = function () {
        var l = this.magnitude();
        if (l > 0) {
            this.x /= l;
            this.y /= l;
        }
    };

    return Vector;
});
