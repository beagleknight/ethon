var window = window || undefined,
    requirejs = requirejs || undefined,
    define = define || undefined;

requirejs.config({
    baseUrl: "../lib"
});

define(function (require) {
    "use strict";

    var Map             = require("ethon/map"),
        renderAssistant = require("ethon/render_assistant"),
        result = window.document.getElementById("result"),
        image = new window.Image(),
        map;

    renderAssistant.setCanvas(result, 800, 600);

    image.src = "images/mario.png";
    image.addEventListener("load", function () {
        map = new Map();

        map.addLayer(function (renderAssistant) {
            renderAssistant.drawQuad(0, 0, 800, 600);
        });

        map.addLayer(function (renderAssistant) {
            renderAssistant.drawImage(100, 100, image);
        });

        map.render();
    });
});
