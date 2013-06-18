/*global define*/

/**
 * Provides an object to store all event listeners.
 *
 * @class event_galaxy
 * @requires event_galaxy
 */
define(function (require) {
    "use strict";

    var eventEmitters = {};

    function register(event, eventEmitter) {
        eventEmitters[event] = eventEmitters[event] || [];
        eventEmitters[event].push(eventEmitter);
    }

    function emit(event, args) {
        var i, l,
            localEventEmitters = eventEmitters[event];

        if (localEventEmitters !== undefined) {
            for (i = 0, l = localEventEmitters.length; i < l; i += 1) {
                localEventEmitters[i].emit(event, args);
            }
        }
    }

    return {
        register: register,
        emit: emit
    };

});
