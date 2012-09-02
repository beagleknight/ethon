var window = window || undefined,
    define = define || undefined;

define(function (require) {
    "use strict";

    var eventEmitter = require("ethon/event_emitter"),
        keys = [],
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
        body = window.document.body;

    /**
     * Helper functions for manage events
     *
     * Read document events and prevent default behavior
     */
    function dismissEvent(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    function onkeydown(event) {
        keys[event.keyCode] = true;
        eventEmitter.trigger("keydown", event.keyCode);
        dismissEvent(event);
    }

    function onkeyup(event) {
        keys[event.keyCode] = false;
        eventEmitter.trigger("keyup", event.keyCode);
        dismissEvent(event);
    }

    function onmousemove(event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        eventEmitter.trigger("mousemotion", mouse);
        dismissEvent(event);
    }

    function onmousedown(event) {
        mouse.buttons[event.button] = true;
        eventEmitter.trigger("mousedown", mouse);
        dismissEvent(event);
    }

    function onmouseup(event) {
        mouse.buttons[event.button] = false;
        dismissEvent(event);
    }

    // Register events callbacks
    body.addEventListener("keydown", onkeydown);
    body.addEventListener("keyup", onkeyup);
    body.addEventListener("mousemove", onmousemove);
    body.addEventListener("mousedown", onmousedown);
    body.addEventListener("mouseup", onmouseup);
    body.addEventListener("contextmenu", dismissEvent);

    /**
     * isKeyPressed
     *
     * Returns true when key is pressed. 
     */
    function isKeyPressed(keyCode) {
        keyCode = lut[keyCode];
        return keys[keyCode];
    }

    /**
     * isMouseButtonPressed
     *
     * Returns true when mouse button is pressed
     */
    function isMouseButtonPressed(mouseButton) {
        mouseButton = lut[mouseButton];
        return mouse.buttons[mouseButton];
    }

    /**
     * getMousePosition
     *
     * Returns mouse coordinates relative to client window
     */
    function getMousePosition() {
        return {
            x: mouse.x,
            y: mouse.y
        };
    }

    return {
        isKeyPressed: isKeyPressed,
        isMouseButtonPressed: isMouseButtonPressed,
        getMousePosition: getMousePosition,
        lut: lut
    };
});
