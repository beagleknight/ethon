var window = window || undefined,
    requirejs = requirejs || undefined,
    define = define || undefined;

requirejs.config({
    baseUrl: "../lib"
});

define(function (require) {
    "use strict";

    var eventModerator = require("event_moderator"),
        result = window.document.getElementById("result"),
        hello = window.document.getElementById("hello"),
        world = window.document.getElementById("world");

    function hello_test(timestamp) {
        result.innerHTML += "Hello on " + timestamp + "<br />";
    }

    function world_test_1(timestamp) {
        result.innerHTML += "Hello World on " + timestamp + "<br />";
    }

    function world_test_2(timestamp) {
        result.innerHTML += "Bye World on " + timestamp + "<br />";
    }

    eventModerator.observe("hello", hello_test);
    eventModerator.observe("world", world_test_1);
    eventModerator.observe("world", world_test_2);

    hello.addEventListener("click", function () {
        eventModerator.notify("hello", new Date());
        result.innerHTML += "<br />";
    });

    world.addEventListener("click", function () {
        eventModerator.notify("world", new Date());
        result.innerHTML += "<br />";
    });
});
