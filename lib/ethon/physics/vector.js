/*global define*/

define(function (require) {
    "use strict";

    var Vector;

    Vector = function (x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };

    Vector.prototype.invert = function () {
        this.x = -this.x;
        this.y = -this.y;
    };

    Vector.prototype.magnitude = function () {
        return Math.sqrt(this.squaredMagnitude());
    };

    Vector.prototype.squaredMagnitude = function () {
        return this.x * this.x + this.y * this.y;
    };

    return Vector;
});
