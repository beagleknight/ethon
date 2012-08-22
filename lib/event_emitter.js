// TODO: require event moderator module 
var ethon = ethon || {},
    window = window || {};

(function (window, exports) {
    "use strict";

    var eventModerator = exports.eventModerator;

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
        eventModerator.notify.apply(exports, args);
    }

    exports.eventEmitter = {
        on: on,
        trigger: trigger
    };

}(window, ethon));
