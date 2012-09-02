var window = window || undefined,
    requirejs = requirejs || undefined,
    define = define || undefined;

requirejs.config({
    baseUrl: "../lib"
});

define(function (require) {
    "use strict";

    var resourceAssistant = require("ethon/resource_assistant"),
        result_1 = window.document.getElementById("result_1"),
        result_2 = window.document.getElementById("result_2");

    resourceAssistant.loadImage("mario", "images/mario.png", function (image) {
        result_1.src = image.src;
        // For testing purposes
        result_2.src = resourceAssistant.getImage("mario").src;
    });
});
