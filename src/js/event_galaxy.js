(function () {
    "use strict";

    var eventEmitters = {};

    function register(event, eventEmitter) {
        eventEmitters[event] = eventEmitters[event] || [];
        if (eventEmitters[event].indexOf(eventEmitter) === -1) {
            eventEmitters[event].push(eventEmitter);
        }
    }

    function emit(event, args) {
        var i, l,
            localEventEmitters = eventEmitters[event];


        args.unshift(event);
        if (localEventEmitters !== undefined) {
            for (i = 0, l = localEventEmitters.length; i < l; i += 1) {
                localEventEmitters[i].emit.apply(localEventEmitters[i], args);
            }
        }
    }

    module.exports = {
        register: register,
        emit: emit
    };
}());
