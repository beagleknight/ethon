var ethon = ethon || {},
    window = window || {};

(function (window, exports) {
    "use strict";

    /**
     * requestAnimationFrame
     *
     * Provides a cross-browser requestAnimationFrame function
     */
    exports.requestAnimationFrame = function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback, element) {
                window.setTimeout(callback, 1000 / 60);
            };
    };

}(window, ethon));
