(function () {
    "use strict";

    var proxy            = require("./proxy"),
        ActionDispatcher;

    ActionDispatcher = function (inputAssistant) {
        this.inputAssistant = inputAssistant;
    };

    ActionDispatcher.prototype.registerKeyboardAction = function (key, callbackPressed, callbackReleased) {
        this.inputAssistant.on("keydown", proxy(this, function (keyPressed) {
            if (key === keyPressed) {
                callbackPressed();
            }
        }));

        if (callbackReleased !== undefined) {
            this.inputAssistant.on("keyup", proxy(this, function (keyReleased) {
                if (key === keyReleased) {
                    callbackReleased();
                }
            }));
        }
    };

    ActionDispatcher.prototype.registerMouseMotionAction = function (callback) {
        this.inputAssistant.on("mousemotion", proxy(this, function (mouse) {
            callback(this.inputAssistant.normalizeMouse(mouse));
        }));
    };

    ActionDispatcher.prototype.registerMouseClickAction = function (button, callback) {
        this.inputAssistant.on("mousedown", proxy(this, function (mouse, buttonPressed) {
            if (button === buttonPressed) {
                callback(this.inputAssistant.normalizeMouse(mouse));
            }
        }));
    };

    ActionDispatcher.prototype.registerMouseReleaseAction = function (button, callback) {
        this.inputAssistant.on("mouseup", proxy(this, function (mouse, buttonReleased) {
            if (button === buttonReleased) {
                callback(this.inputAssistant.normalizeMouse(mouse));
            }
        }));
    };

    module.exports = ActionDispatcher;
}());
