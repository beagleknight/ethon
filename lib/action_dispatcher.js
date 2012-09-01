var define = define || undefined;

define(function (require) {
    "use strict";

    var inputAssistant   = require("input_assistant"),
        eventEmitter     = require("event_emitter"),
        physicsAssistant = require("physics_assistant"),
        renderAssistant  = require("render_assistant");

    /**
     * registerKeyboardAction
     *
     * Register a keyboard action given a key and a callback pressed function.
     * Optional: accept a callback released function
     */
    function registerKeyboardAction(key, callbackPressed, callbackReleased) {
        eventEmitter.on("keydown", function (keyPressed) {
            if (inputAssistant.lut[key] === keyPressed) {
                callbackPressed();
            }
        });
        if (callbackReleased !== undefined) {
            eventEmitter.on("keyup", function (keyPressed) {
                if (inputAssistant.lut[key] === keyPressed) {
                    callbackReleased();
                }
            });
        }
    }

    /**
     * normalizeMouse
     *
     * Helper function for translate mouse coordinates
     * relative to the canvas position.
     */
    function normalizeMouse(mouse) {
        var normalizedMouse = { x: -1, y: -1},
            canvasRect;

        canvasRect = renderAssistant.getCanvasRect();
        normalizedMouse.x = mouse.x - canvasRect.left;
        normalizedMouse.y = mouse.y - canvasRect.top;
        return normalizedMouse;
    }

    /**
     * isMouseInsideQuad
     *
     * Helper function for checking mouse position inside a
     * quad.
     */
    function isMouseInsideQuad(quad, mouse) {
        var mouseQuad, normalizedMouse = normalizeMouse(mouse);

        mouseQuad = { x: normalizedMouse.x, y: normalizedMouse.y, w: 1, h: 1 };
        return physicsAssistant.quadsCollision(quad, mouseQuad);
    }

    /**
     * registerMouseMotionAction
     *
     * Register a mouse motion action given a quad-like region.
     */
    function registerMouseMotionAction(quad, callback) {
        eventEmitter.on("mousemotion", function (mouse) {
            if (isMouseInsideQuad(quad, mouse)) {
                callback(normalizeMouse(mouse));
            }
        });
    }

    /**
     * registerMouseClickAction
     *
     * Register a mouse click action given a button and a
     * quad-like region.
     */
    function registerMouseClickAction(button, quad, callback) {
        eventEmitter.on("mousedown", function (mouse) {
            if (mouse.buttons[inputAssistant.lut[button]]) {
                if (isMouseInsideQuad(quad, mouse)) {
                    callback(normalizeMouse(mouse));
                }
            }
        });
    }

    return {
        registerKeyboardAction: registerKeyboardAction,
        registerMouseMotionAction: registerMouseMotionAction,
        registerMouseClickAction: registerMouseClickAction
    };
});
