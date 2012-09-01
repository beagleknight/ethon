// TODO: requires input assistant module
// TODO: requires event emitter module
// TODO: requires physics assistant module
// TODO: requires render assistant module
var ethon = ethon || {},
    window = window || {};

(function (window, exports) {
    "use strict";

    var inputAssistant = exports.inputAssistant,
        eventEmitter = exports.eventEmitter,
        physicsAssistant = exports.physicsAssistant,
        renderAssistant = exports.renderAssistant;

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

    exports.actionDispatcher = {
        registerKeyboardAction: registerKeyboardAction,
        registerMouseMotionAction: registerMouseMotionAction,
        registerMouseClickAction: registerMouseClickAction
    };

}(window, ethon));