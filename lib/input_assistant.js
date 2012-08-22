var ethon = ethon || {},
    window = window || {};

(function (window, exports) {
    "use strict";

    var keys = [],
        lut = {
            "KEY_A": 65,
            "KEY_B": 66,
            "KEY_SPACEBAR": 32,
            "KEY_LEFT_ARROW": 37,
            "KEY_RIGHT_ARROW": 39,
            "KEY_UP_ARROW": 38
        };

    function onkeydown(event) {
        keys[event.keyCode] = true;
    }

    function onkeyup(event) {
        keys[event.keyCode] = false;
    }

    window.document.body.addEventListener("keydown", onkeydown);
    window.document.body.addEventListener("keyup", onkeyup);

    function isKeyPressed(keyCode) {
        keyCode = lut[keyCode];
        return keys[keyCode];
    }

    exports.inputAssistant = {
        isKeyPressed: isKeyPressed
    };
}(window, ethon));
