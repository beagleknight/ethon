var define = define || {};

define(function (require) {
    "use strict";

    var eventModerator = require("ethon/event_moderator");

    /**
     * on
     *
     * Register a new callback for the given event.
     */
    function on(event, callback) {
        eventModerator.observe(event, callback);
    }

    /**
     * trigger
     *
     * Trigger an event passing arguments.
     */
    function trigger(event) {
        var args = Array.prototype.slice.call(arguments, 1);
        args.unshift(event);
        eventModerator.notify.apply(null, args);
    }

    return {
        on: on,
        trigger: trigger
    };
});
