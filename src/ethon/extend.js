/*global define*/

/**
 * Provides a method to extend objects. It copies properties
 * from a object to another object.
 *
 * Examples:
 * 
 * extend(Animal.prototype, Dog.prototype);
 * extend(eventEmitter, Dog.prototype);
 *
 * @class extend
 */
define(function () {
    "use strict";

    return function (object, methods) {
        var o = object || {},
            method;

        for (method in methods) {
            if (methods.hasOwnProperty(method)) {
                o[method] = methods[method];
            }
        }
        return o;
    };
});
