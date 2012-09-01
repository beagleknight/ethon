var window = window || undefined,
    requirejs = requirejs || undefined,
    define = define || undefined;

requirejs.config({
    baseUrl: "../lib",
    paths: {
        support: "../test/support"
    }
});

define(function (require) {
    "use strict";

    var proxy            = require("proxy"),
        renderAssistant  = require("render_assistant"),
        actionDispatcher = require("action_dispatcher"),
        Dog              = require("support/dog"),
        result = window.document.getElementById("result"),
        dog;

    renderAssistant.setCanvas(result, 800, 600);
    dog = new Dog(100, 100);

    actionDispatcher.registerKeyboardAction("KEY_LEFT_ARROW", proxy(dog, dog.move_left));
    actionDispatcher.registerKeyboardAction("KEY_RIGHT_ARROW", proxy(dog, dog.move_right));
    actionDispatcher.registerKeyboardAction("KEY_UP_ARROW", proxy(dog, dog.move_up));
    actionDispatcher.registerKeyboardAction("KEY_DOWN_ARROW", proxy(dog, dog.move_down));
    actionDispatcher.registerKeyboardAction("KEY_S", proxy(dog, dog.stop));

    window.setInterval(function () {
        dog.update(1);

        renderAssistant.clear();
        dog.render();
    }, 100);
});
