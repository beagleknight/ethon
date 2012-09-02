var window = window || undefined,
    requirejs = requirejs || undefined,
    define = define || undefined;

requirejs.config({
    baseUrl: "../lib"
});

define(function (require) {
    "use strict";

    var actionDispatcher = require("ethon/action_dispatcher"),
        renderAssistant  = require("ethon/render_assistant"),
        result = window.document.getElementById("result"),
        canvasQuad;

    renderAssistant.setCanvas(result, 800, 600);
    canvasQuad = { x: 0, y: 0, w: result.width, h: result.height };

    actionDispatcher.registerKeyboardAction("KEY_B", function () {
        var x = Math.random() * 800,
            y = Math.random() * 600;
        renderAssistant.drawText(x, y, "Bark!");
    });

    actionDispatcher.registerKeyboardAction("KEY_M", function () {
        var x = Math.random() * 800,
            y = Math.random() * 600;
        renderAssistant.drawText(x, y, "Meow!");
    });


    actionDispatcher.registerMouseMotionAction(canvasQuad, function (mouse) {
        var x = mouse.x,
            y = mouse.y;
        renderAssistant.drawQuad(x, y, 10, 10);
    });

    actionDispatcher.registerMouseClickAction("MOUSE_LEFT", canvasQuad, function (mouse) {
        var x = mouse.x,
            y = mouse.y;
        renderAssistant.drawCircle(x, y, 20);
    });
});
