/*global define*/

/**
 * Provides methods to register callback functions when actions
 * like key pressed happens.
 *
 * @class action_dispatcher
 * @requires input_assistant, event_emitter, physics_assistant
 * @requires render_assistant
 */
define(function (require) {
    "use strict";

    var inputAssistant   = require("ethon/input_assistant"),
        eventEmitter     = require("ethon/event_emitter"),
        physicsAssistant = require("ethon/physics_assistant"),
        renderAssistant  = require("ethon/render_assistant");

    /**
     * Register a callback function to be invoked when the given
     * key is pressed.
     *
     * @method registerKeyboardAction
     * @param {String} key Key identifier
     * @param {Function} callbackPressed Function to be invoked when action happens
     * @param {Function} callbackReleased (Optional) Function to be invoked when key is released
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

    // Helper function for translate mouse coordinates relative to the canvas position.
    function normalizeMouse(mouse) {
        var normalizedMouse = { x: -1, y: -1},
            canvasRect;

        canvasRect = renderAssistant.getCanvasRect();
        normalizedMouse.x = mouse.x - canvasRect.left;
        normalizedMouse.y = mouse.y - canvasRect.top;
        return normalizedMouse;
    }

     // Helper function for checking mouse position inside a quad.
    function isMouseInsideQuad(quad, mouse) {
        var mouseQuad, normalizedMouse = normalizeMouse(mouse);

        if (quad.position) {
            quad.x = quad.position.x;
            quad.y = quad.position.y;
        }

        mouseQuad = { x: normalizedMouse.x, y: normalizedMouse.y, w: 1, h: 1 };
        return physicsAssistant.quadsCollision(quad, mouseQuad);
    }

    /**
     * Register a callback function to be invoked when mouse
     * moves over a quad.
     *
     * @method registerMouseMotionAction
     * @param {Object} quad Quad-like object with position and dimensions
     * @param {Function} callback Function to be invoked when action happens
     */
    function registerMouseMotionAction(quad, callback) {
        eventEmitter.on("mousemotion", function (mouse) {
            if (isMouseInsideQuad(quad, mouse)) {
                callback(normalizeMouse(mouse));
            }
        });
    }

    /**
     * Register a callback function to be invoked when mouse
     * clicks inside a quad.
     *
     * @method registerMouseClickAction
     * @param {String} button Button identifier
     * @param {Object} quad Quad-like object with position and dimensions
     * @param {Function} callback Function to be invoked when action happens
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

    /**
     * Register a callback function to be invoked when mouse
     * button is released inside a quad.
     *
     * @method registerMouseReleaseAction
     * @param {String} button Button identifier
     * @param {Object} quad Quad-like object with position and dimensions
     * @param {Function} callback Function to be invoked when action happens
     */
    function registerMouseReleaseAction(button, quad, callback) {
        eventEmitter.on("mouseup", function (mouse) {
            if (!mouse.buttons[inputAssistant.lut[button]]) {
                if (isMouseInsideQuad(quad, mouse)) {
                    callback(normalizeMouse(mouse));
                }
            }
        });
    }

    return {
        registerKeyboardAction: registerKeyboardAction,
        registerMouseMotionAction: registerMouseMotionAction,
        registerMouseClickAction: registerMouseClickAction,
        registerMouseReleaseAction: registerMouseReleaseAction
    };
});
