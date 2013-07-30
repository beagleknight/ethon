/*jslint browser: true*/
/*global define*/

/**
 * Provides methods for keyboard and mouse interaction.
 *
 * @class input_assistant
 * @requires event_emitter
 */
define(function (require) {
    "use strict";

    var EventEmitter     = require("ethon/event_emitter"),
        physicsAssistant = require("ethon/physics_assistant"),
        inherit          = require("ethon/inherit"),
        proxy            = require("ethon/proxy"),
        $                = require("jquery"),
        lut = {
            32: "KEY_SPACEBAR",
            37: "KEY_LEFT_ARROW",
            38: "KEY_UP_ARROW",
            39: "KEY_RIGHT_ARROW",
            40: "KEY_DOWN_ARROW",
            65: "KEY_A",
            66: "KEY_B",
            77: "KEY_M",
            83: "KEY_S",
            0:  "MOUSE_LEFT",
            2:  "MOUSE_RIGHT"
        },
        reservedLut = {
            32: "KEY_SPACEBAR",
            37: "KEY_LEFT_ARROW",
            38: "KEY_UP_ARROW",
            39: "KEY_RIGHT_ARROW",
            40: "KEY_DOWN_ARROW"
        },
        InputAssistant;

    // Helper functions for manage events
    // Read document events and prevent default behavior
    function dismissEvent(event) {
        if (event.preventDefault) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    function onmousemove(inputAssistant, event) {
        inputAssistant.mouse.x = event.clientX;
        inputAssistant.mouse.y = event.clientY;
        inputAssistant.emit("mousemotion", inputAssistant.mouse);
    }

    function onmousedown(inputAssistant, event) {
        inputAssistant.mouse.x = event.clientX;
        inputAssistant.mouse.y = event.clientY;
        if (event.button === undefined) {
            event.button = 0; // FORCE MOUSE_LEFT if touch event
        }
        inputAssistant.mouse.buttons[event.button] = true;
        inputAssistant.emit("mousedown", inputAssistant.mouse, lut[event.button]);
        dismissEvent(event);
    }

    function onmouseup(inputAssistant, event) {
        inputAssistant.mouse.x = event.clientX;
        inputAssistant.mouse.y = event.clientY;
        inputAssistant.mouse.buttons[event.button] = false;
        inputAssistant.emit("mouseup", inputAssistant.mouse, lut[event.button]);
    }

    function reservedKey(keyCode) {
        var key;
        for (key in reservedLut) {
            if (reservedLut.hasOwnProperty(key) && parseInt(key, 10) === keyCode) {
                return true;
            }
        }
        return false;
    }

    function onkeydown(inputAssistant, event) {
        inputAssistant.keys[event.keyCode] = true;
        inputAssistant.emit("keydown", lut[event.keyCode]);
        clearInterval(inputAssistant.emitters[event.keyCode]);
        inputAssistant.emitters[event.keyCode] = setInterval(function () {
            inputAssistant.emit("keydown", lut[event.keyCode]);
        }, 1000 / 60);

        if (reservedKey(event.keyCode)) {
            dismissEvent(event);
        }
    }

    function onkeyup(inputAssistant, event) {
        inputAssistant.keys[event.keyCode] = false;
        inputAssistant.emit("keyup", lut[event.keyCode]);
        clearInterval(inputAssistant.emitters[event.keyCode]);
    }

    InputAssistant = function (canvas) {
        EventEmitter.call(this);
        this.canvas = canvas;

        $(canvas).on("mousemove", proxy(this, function (event) {
            onmousemove(this, event);
        }));

        if ('ontouchstart' in document.documentElement) {
            $(canvas).on("touchstart", proxy(this, function (event) {
                event = event.originalEvent.touches[0];
                onmousedown(this, event);
            }));

        } else {
            $(canvas).on("mousedown", proxy(this, function (event) {
                onmousedown(this, event);
            }));
        }

        $(canvas).on("mouseup", proxy(this, function (event) {
            onmouseup(this, event);
        }));

        $(canvas).on("contextmenu", proxy(this, function (event) {
            dismissEvent(event);
        }));

        // Register events callbacks
        $('body').on("keydown", proxy(this, function (event) {
            onkeydown(this, event);
        }));

        $('body').on("keyup", proxy(this, function (event) {
            onkeyup(this, event);
        }));

        this.keys = [];
        this.emitters = {};
        this.mouse = {
            x: -1,
            y: -1,
            buttons: []
        };
    };
    inherit(InputAssistant, EventEmitter);

    /**
     * Check if a key is pressed.
     *
     * @method isKeyPressed
     * @param {String} keyCode Identifier of the key. See lut object.
     * @return true when key is pressed. 
     */
    InputAssistant.prototype.isKeyPressed = function (keyCode) {
        keyCode = lut[keyCode];
        return this.keys[keyCode];
    };

    /**
     * Returns true when mouse button is pressed
     *
     * @method isMouseButtonPressed
     * @param {String} mouseButton Mouse button identifier
     */
    InputAssistant.prototype.isMouseButtonPressed = function (mouseButton) {
        mouseButton = lut[mouseButton];
        return this.mouse.buttons[mouseButton];
    };

    /**
     * Returns mouse coordinates relative to client window
     *
     * @method getMousePosition
     */
    InputAssistant.prototype.getMousePosition = function () {
        return this.mouse;
    };

    // Helper function for translate mouse coordinates relative to the canvas position.
    InputAssistant.prototype.normalizeMouse = function (mouse) {
        var normalizedMouse = { x: -1, y: -1},
            canvasRect = this.canvas.getBoundingClientRect();

        normalizedMouse.x = mouse.x - canvasRect.left;
        normalizedMouse.y = mouse.y - canvasRect.top;

        return normalizedMouse;
    };

    InputAssistant.prototype.isMouseInsideQuad = function (quad, mouse) {
        var mouseQuad, normalizedMouse = this.normalizeMouse(mouse);

        if (quad.position) {
            quad.x = quad.position.x;
            quad.y = quad.position.y;
        }

        mouseQuad = { x: normalizedMouse.x, y: normalizedMouse.y, w: 1, h: 1 };
        return physicsAssistant.quadsCollision(quad, mouseQuad);
    };

    return InputAssistant;
});
