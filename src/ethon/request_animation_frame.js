/*jslint browser: true*/
/*global define*/

/**
 * Provides a polyfill function for requestAnimationFrame
 * 
 * @class request_animation_frame
 */
define(function () {
    "use strict";

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        }());
    }

    return function (callback) {
        window.requestAnimationFrame(callback);
    };
});
