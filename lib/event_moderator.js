var ethon = ethon || {},
    window = window || {};

(function (window, exports) {
    "use strict";

    var observers = {};

    /**
     * observe
     *
     * Observe given event passing a callback function
     */
    function observe(event, callback) {
        observers[event] = observers[event] || [];
        observers[event].push(callback);
    }

    /**
     * notify
     *
     * notify observers registered to the given an event,
     * passing arbitrary arguments to the callback.
     */
    function notify(event) {
        var i, l,
            args = Array.prototype.slice.call(arguments, 1),
            callbacks = observers[event];

        // Check for existing callbacks for this event
        if (callbacks !== undefined) {
            for (i = 0, l = callbacks.length; i < l; i += 1) {
                callbacks[i].apply(exports, args);
            }
        }
    }

    exports.eventModerator = {
        observe: observe,
        notify: notify
    };

}(window, ethon));
