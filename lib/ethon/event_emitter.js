/*global define*/

/**
 * Provides an object that can be extended for listen 
 * and trigger custom events.
 *
 * @class event_emitter
 * @requires event_moderator
 */
define(function (require) {
    "use strict";

    var eventModerator = require("ethon/event_moderator");

    /**
     * Register a new callback for the given event.
     *
     * @method on
     * @param {String} event Identifier of event to listen
     * @param {Function} callback Function to be executed when
     * event is triggered.
     */
    function on(event, callback) {
        eventModerator.observe(event, callback);
    }

    /**
     * TODO
     */
    function off(event, callback) {
        eventModerator.ignore(event, callback);
    }

    /**
     * Trigger an event passing an arbitrary number of arguments.
     *
     * @method trigger
     * @param {String} event Identifier of event to trigger
     */
    function trigger(event) {
        var args = Array.prototype.slice.call(arguments, 1);
        args.unshift(event);
        eventModerator.notify.apply(null, args);
    }

    return {
        on: on,
        off: off,
        trigger: trigger
    };
});
