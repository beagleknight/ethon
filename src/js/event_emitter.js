(function (require) {
    "use strict";

    var eventGalaxy = require("./event_galaxy"),
        EventEmitter;

    EventEmitter = function () {
        this.listeners = {};
    };

    EventEmitter.prototype.on = function (event, callback) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);
        eventGalaxy.register(event, this);
    };

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
    EventEmitter.prototype.broadcast = function (event) {
        var args = Array.prototype.slice.call(arguments, 1);
        eventGalaxy.emit(event, args);
    };

    module.exports = EventEmitter;
}());
