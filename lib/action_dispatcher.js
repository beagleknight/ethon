// TODO: requires input assistant module
// TODO: requires event emitter module
var ethon = ethon || {},
    window = window || {};

(function (window, exports) {
    "use strict";

    var inputAssistant = exports.inputAssistant,
        eventEmitter = exports.eventEmitter;

    /**
     * registerKeyboardAction
     *
     * Register a keyboard action given a key and a callback function.
     */
    function registerKeyboardAction(key, callback) {
        eventEmitter.on("keydown", function (keyPressed) {
            if (inputAssistant.lut[key] === keyPressed) {
                callback();
            }
        });
    }

    exports.actionDispatcher = {
        registerKeyboardAction: registerKeyboardAction
    };

}(window, ethon));
