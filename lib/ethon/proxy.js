var define = define || undefined;

/**
 * Provides a simple function for build new functions
 * based on a given function and the object who will be this
 * object.
 *
 * @class proxy
 */
define(function (require) {
    "use strict";

    return function (object, method) {
        return function () {
            method.apply(object, arguments);
        };
    };
});
