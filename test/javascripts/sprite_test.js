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

    var Sprite          = require("ethon/sprite"),
        renderAssistant = require("ethon/render_assistant"),
        result = window.document.getElementById("result"),
        sprite;

    renderAssistant.setCanvas(result, 800, 600);

    sprite = new Sprite("test", 100, 100, 20, 20, "texture", "images/mario_sprite.png");

    sprite.addFrame("idle", 0, 0.5);
    sprite.addFrame("idle", 1, 0.5);
    sprite.addFrame("idle", 2, 0.5);
    sprite.addFrame("idle", 1, 0.5);
    sprite.addFrame("idle", 0, 0.5);

    sprite.setCurrentAnimation("idle");

    window.setInterval(function () {
        sprite.update(1);

        renderAssistant.clear();
        sprite.render();
    }, 1000 / 30);
});
