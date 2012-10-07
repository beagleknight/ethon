var define = define || undefined;

/**
 * Manage events on the whole engine. It registers and notify
 * observers.
 *
 * @class event_moderator
 */
define(function (require) {
    "use strict";

    var observers = {};

    /**
     * Observe given event passing a callback function
     *
     * @method observe
     * @param {String} event Identifier of the event to observe
     * @param {Function} callback Function to be executed when
     * event is triggered.
     */
    function observe(event, callback) {
        observers[event] = observers[event] || [];
        observers[event].push(callback);
    }

    /**
     * Notify observers registered to the given an event,
     * passing arbitrary arguments to the callback.
     *
     * @method notify
     * @param {String} event Identifier of the event to notify
     */
    function notify(event) {
        var i, l,
            args = Array.prototype.slice.call(arguments, 1),
            callbacks = observers[event];

        // Check for existing callbacks for this event
        if (callbacks !== undefined) {
            for (i = 0, l = callbacks.length; i < l; i += 1) {
                callbacks[i].apply(null, args);
            }
        }
    }

    return {
        observe: observe,
        notify: notify
    };
});
