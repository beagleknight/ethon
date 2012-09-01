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

    var Game             = require("game"),
        Map              = require("map"),
        GUI              = require("gui"),
        proxy            = require("proxy"),
        actionDispatcher = require("action_dispatcher"),
        Dog              = require("support/dog"),
        result = window.document.getElementById("result"),
        dog_1 = new Dog(100, 100),
        dog_2 = new Dog(300, 300),
        map = new Map(),
        gui = new GUI(),
        game = new Game(result, 800, 600, { showFPS: true });

    gui.addElement(new GUI.Label("test_label", 500, 500, "Test Label", "#ffffff"));

    map.addLayer(function (renderAssistant) {
        renderAssistant.drawQuad(0, 0, 800, 600, "#aaaaaa");
    });

    actionDispatcher.registerKeyboardAction("KEY_LEFT_ARROW", proxy(dog_1, dog_1.move_left));
    actionDispatcher.registerKeyboardAction("KEY_RIGHT_ARROW", proxy(dog_1, dog_1.move_right));
    actionDispatcher.registerKeyboardAction("KEY_UP_ARROW", proxy(dog_1, dog_1.move_up));
    actionDispatcher.registerKeyboardAction("KEY_DOWN_ARROW", proxy(dog_1, dog_1.move_down));
    actionDispatcher.registerKeyboardAction("KEY_S", proxy(dog_1, dog_1.stop));

    game.setMap(map);
    game.addSoul(dog_1);
    game.addSoul(dog_2);
    game.setGUI(gui);
    game.start();
});
