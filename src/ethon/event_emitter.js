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

    var eventGalaxy = require("ethon/event_galaxy"),
        EventEmitter;

    EventEmitter = function () {
        this.listeners = {};
    };

    /**
     * Register a new callback for the given event.
     *
     * @method on
     * @param {String} event Identifier of event to listen
     * @param {Function} callback Function to be executed when
     * event is triggered.
     */
    EventEmitter.prototype.on = function (event, callback) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);
        eventGalaxy.register(event, this);
    };

    /**
     * Trigger an event passing an arbitrary number of arguments.
     *
     * @method trigger
     * @param {String} event Identifier of event to trigger
     */
    EventEmitter.prototype.emit = function (event) {
        var i, l,
            args = Array.prototype.slice.call(arguments, 1),
            callbacks = this.listeners[event];

        // Check for existing callbacks for this event
        if (callbacks !== undefined) {
            for (i = 0, l = callbacks.length; i < l; i += 1) {
                callbacks[i].apply(null, args);
            }
        }
    };

    // Alias function
    EventEmitter.prototype.trigger = EventEmitter.prototype.emit;
    /**
     * Trigger an event passing an arbitrary number of arguments.
     * Call all listeners for all objects registered to this event.
     *
     * @method broadcast
     * @param {String} event Identifier of event to trigger
     */
    EventEmitter.prototype.broadcast = function (event) {
        var args = Array.prototype.slice.call(arguments, 1);
        eventGalaxy.emit(event, args);
    };

    return EventEmitter;
});
