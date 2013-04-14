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

    /**
     * Multiply vector by the given scalar
     * @function multScalar
     * @param {Number} value Scalar value
     * @returns A new vector result of the operation
     */
    Vector.prototype.multScalar = function (value) {
        var result = new Vector(this.x, this.y);
        result.x *= value;
        result.y *= value;
        return result;
    };

    /**
     * Add given vector
     * @function add
     * @param {Number} vector A vector
     * @returns A new vector result of the operation
     */
    Vector.prototype.add = function (vector) {
        var result = new Vector(this.x, this.y);
        result.x += vector.x;
        result.y += vector.y;
        return result;
    };

    /**
     * Sub given vector
     * @function add
     * @param {Vector} vector A vector
     * @returns A new vector result of the operation
     */
    Vector.prototype.sub = function (vector) {
        var result = new Vector(this.x, this.y);
        result.x -= vector.x;
        result.y -= vector.y;
        return result;
    };

    /**
     * Add scaled version of given vector
     * @function addScaledVector
     * @param {Vector} vector A vector
     * @param {Number} value Scalar value
     * @returns A new vector result of the operation
     */
    Vector.prototype.addScaledVector = function (vector, value) {
        var result = new Vector(this.x, this.y);
        result = result.add(vector.multScalar(value));
        return result;
    };

    /**
     * Compute the product of each component
     * between the two vectors
     * @function componentProduct
     * @param {Vector} vector A vector
     * @returns A new vector result of the operation
     */
    Vector.prototype.componentProduct = function (vector) {
        var result = new Vector(this.x, this.y);
        result.x *= vector.x;
        result.y *= vector.y;
        return result;
    };

    /*
     * Compute the scalar product of the two vectors
     * @function scalarProduct
     * @param {Vector} vector A vector
     * @returns A scalar value result of the operation
     */
    Vector.prototype.scalarProduct = function (vector) {
        return this.x * vector.x + this.y * vector.y;
    };

    return Vector;
});
