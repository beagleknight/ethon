var window = window || undefined,
    requirejs = requirejs || undefined,
    define = define || undefined;

requirejs.config({
    baseUrl: "../lib"
});

define(function (require) {
    "use strict";

    var GUI              = require("ethon/gui"),
        proxy            = require("ethon/proxy"),
        renderAssistant  = require("ethon/render_assistant"),
        eventEmitter     = require("ethon/event_emitter"),
        actionDispatcher = require("ethon/action_dispatcher"),
        result = window.document.getElementById("result"),
        gui,
        score_a = 0,
        score_b = 0,
        label_score_a,
        label_score_b;

    renderAssistant.setCanvas(result, 800, 600);

    gui = new GUI();

    label_score_a = new GUI.Label("score_a", 100, 100, "Score A: 0");
    label_score_a.on("score_a_changed", proxy(label_score_a, function (score) {
        this.message = this.message.replace(/(\d*)$/, score);
    }));

    label_score_b = new GUI.Label("score_b", 600, 100, "Score B: 0");
    label_score_b.on("score_b_changed", proxy(label_score_b, function (score) {
        this.message = this.message.replace(/(\d*)$/, score);
    }));

    gui.addElement(label_score_a);
    gui.addElement(label_score_b);

    actionDispatcher.registerKeyboardAction("KEY_A", function () {
        score_a += 1;
        eventEmitter.trigger("score_a_changed", score_a);
    });

    actionDispatcher.registerKeyboardAction("KEY_B", function () {
        score_b += 1;
        eventEmitter.trigger("score_b_changed", score_b);
    });

    window.setInterval(function () {
        renderAssistant.clear();
        gui.render();
    }, 100);
});
