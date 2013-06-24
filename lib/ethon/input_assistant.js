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

    var EventEmitter = require("ethon/event_emitter"),
        eventEmitter = new EventEmitter(),
        keys = [],
        emitters = {},
        lut = {
            "KEY_SPACEBAR": 32,
            "KEY_LEFT_ARROW": 37,
            "KEY_UP_ARROW": 38,
            "KEY_RIGHT_ARROW": 39,
            "KEY_DOWN_ARROW": 40,
            "KEY_A": 65,
            "KEY_B": 66,
            "KEY_M": 77,
            "KEY_S": 83,
            "MOUSE_LEFT": 0,
            "MOUSE_RIGHT": 2
        },
        mouse = {
            x: -1,
            y: -1,
            buttons: []
        },
        body = window.document.body,
        canvas;

    function reservedKey(keyCode) {
        var key;
        for (key in lut) {
            if (lut.hasOwnProperty(key) && lut[key] === keyCode) {
                return true;
            }
        }
        return false;
    }
    // Helper functions for manage events
    // Read document events and prevent default behavior
    function dismissEvent(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    function onkeydown(event) {
        keys[event.keyCode] = true;
        eventEmitter.broadcast("keydown", event.keyCode);
        clearInterval(emitters[event.keyCode]);
        emitters[event.keyCode] = setInterval(function () {
            eventEmitter.broadcast("keydown", event.keyCode);
        }, 1000 / 60);

        //if (reservedKey(event.keyCode)) {
        //    dismissEvent(event);
        //}
    }

    function onkeyup(event) {
        keys[event.keyCode] = false;
        eventEmitter.broadcast("keyup", event.keyCode);
        clearInterval(emitters[event.keyCode]);
    }

    function onmousemove(event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        eventEmitter.broadcast("mousemotion", mouse);
    }

    function onmousedown(event) {
        mouse.buttons[event.button] = true;
        eventEmitter.broadcast("mousedown", mouse);
        dismissEvent(event);
    }

    function onmouseup(event) {
        mouse.buttons[event.button] = false;
        eventEmitter.broadcast("mouseup", mouse);
    }

    // Register events callbacks
    body.addEventListener("keydown", onkeydown);
    body.addEventListener("keyup", onkeyup);

    /**
     * TODO:
     */
    function setCanvas(givenCanvas) {
        canvas = givenCanvas;
        canvas.addEventListener("mousemove", onmousemove);
        canvas.addEventListener("mousedown", onmousedown);
        canvas.addEventListener("mouseup", onmouseup);
        canvas.addEventListener("contextmenu", dismissEvent);
    }

    /**
     * Check if a key is pressed.
     *
     * @method isKeyPressed
     * @param {String} keyCode Identifier of the key. See lut object.
     * @return true when key is pressed. 
     */
    function isKeyPressed(keyCode) {
        keyCode = lut[keyCode];
        return keys[keyCode];
    }

    /**
     * Returns true when mouse button is pressed
     *
     * @method isMouseButtonPressed
     * @param {String} mouseButton Mouse button identifier
     */
    function isMouseButtonPressed(mouseButton) {
        mouseButton = lut[mouseButton];
        return mouse.buttons[mouseButton];
    }

    /**
     * Returns mouse coordinates relative to client window
     *
     * @method getMousePosition
     */
    function getMousePosition() {
        return {
            x: mouse.x,
            y: mouse.y
        };
    }


    return {
        setCanvas: setCanvas,
        isKeyPressed: isKeyPressed,
        isMouseButtonPressed: isMouseButtonPressed,
        getMousePosition: getMousePosition,
        lut: lut
    };
});
