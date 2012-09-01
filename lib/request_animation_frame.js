var window = window || undefined,
    define = define || undefined;

define(function (require) {
    "use strict";

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback, element) {
                    window.setTimeout(callback, 1000 / 60);
                };
        }());
    }

    /**
     * requestAnimationFrame
     *
     * Provides a cross-browser requestAnimationFrame function
     */
    return function (callback) {
        window.requestAnimationFrame(callback);
    };
});
