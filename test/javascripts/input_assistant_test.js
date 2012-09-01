var window = window || undefined,
    requirejs = requirejs || undefined,
    define = define || undefined;

requirejs.config({
    baseUrl: "../lib"
});

define(function (require) {
    "use strict";

    var inputAssistant = require("input_assistant"),
        result = window.document.getElementById("result"),
        key_a_test,
        key_b_test,
        key_left_arrow_test,
        key_right_arrow_test,
        mouse_position,
        mouse_left_button_test,
        mouse_right_button_test;

    window.setInterval(function () {
        key_a_test = inputAssistant.isKeyPressed("KEY_A") ? "YES" : "NO";
        key_b_test = inputAssistant.isKeyPressed("KEY_B") ? "YES" : "NO";
        key_left_arrow_test = inputAssistant.isKeyPressed("KEY_LEFT_ARROW") ? "YES" : "NO";
        key_right_arrow_test = inputAssistant.isKeyPressed("KEY_RIGHT_ARROW") ? "YES" : "NO";
        mouse_position = inputAssistant.getMousePosition();
        mouse_left_button_test = inputAssistant.isMouseButtonPressed("MOUSE_LEFT") ? "YES" : "NO";
        mouse_right_button_test = inputAssistant.isMouseButtonPressed("MOUSE_RIGHT") ? "YES" : "NO";

        result.innerHTML = "Key a pressed..." + key_a_test + "<br />";
        result.innerHTML += "Key b pressed..." + key_b_test + "<br />";
        result.innerHTML += "Key left arrow pressed..." + key_left_arrow_test + "<br />";
        result.innerHTML += "Key right arrow pressed..." + key_right_arrow_test + "<br />";
        result.innerHTML += "<br />";
        result.innerHTML += "Mouse position (" + mouse_position.x + "," + mouse_position.y + ") <br />";
        result.innerHTML += "Mouse left button pressed.." + mouse_left_button_test + "<br />";
        result.innerHTML += "Mouse right button pressed.." + mouse_right_button_test + "<br />";
    }, 100);
});
