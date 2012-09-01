var window = window || undefined,
    requirejs = requirejs || undefined,
    define = define || undefined;

requirejs.config({
    baseUrl: "../lib"
});

define(function (require) {
    "use strict";

    var renderAssistant = require("render_assistant"),
        result = window.document.getElementById("result"),
        image = new window.Image();

    image.src = "images/mario.png";

    image.addEventListener("load", function () {
        renderAssistant.setCanvas(result, 800, 600);
        renderAssistant.clear();
        renderAssistant.drawQuad(10, 10, 100, 100);
        renderAssistant.drawCircle(200, 200, 50);
        renderAssistant.drawText(10, 400, "Hello World!");
        renderAssistant.drawImage(400, 400, image);
    });
});
