var ethon = ethon || {},
    window = window || {};

(function (window, exports) {
    "use strict";

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback, element) {
                    window.setTimeout(callback, 1000/60);
                };
            }());
    }

    /**
     * requestAnimationFrame
     *
     * Provides a cross-browser requestAnimationFrame function
     */
    exports.requestAnimationFrame = function (callback) {
        window.requestAnimationFrame(callback);
    };

}(window, ethon));
