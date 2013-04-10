/*global define*/

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
        if (event !== undefined) {
            observers[event] = observers[event] || [];
            observers[event].push(callback);
        }
    }

    /**
     * Unsubscribe callback function for a given event
     *
     * @method ignore
     * @param {String} event Identifier of the event to ignore
     * @param {Function} callback Function to be unsubscribed
     */
    function ignore(event, callback) {
        var i, l, removeIndex = -1;
        for (i = 0, l = observers[event].length; i < l; i += 1) {
            if (callback.toString() === observers[event][i].toString()) {
                removeIndex = i;
                break;
            }
        }

        if (removeIndex >= 0) {
            observers[event].splice(removeIndex, 1);
        }
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
        ignore: ignore,
        notify: notify
    };
});
