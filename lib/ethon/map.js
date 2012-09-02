var define = define || undefined;

define(function (require, exports, module) {
    "use strict";

    var renderAssistant = require("ethon/render_assistant"),
        extend          = require("ethon/extend"),
        eventEmitter    = require("ethon/event_emitter"),
        Map = function () {
            this.layers = [];
        };

    // Extend Map with the EventEmitter for register
    // and trigger custom events.
    extend(eventEmitter, Map.prototype);

    /**
     * addLayer
     *
     * Add a drawing layer to the map.
     */
    Map.prototype.addLayer = function (callback) {
        this.layers.push(callback);
    };

    /**
     * render
     *
     * It renders all map layers in the specific
     * array order.
     */
    Map.prototype.render = function () {
        var i, l;

        for (i = 0, l = this.layers.length; i < l; i += 1) {
            this.layers[i](renderAssistant);
        }
    };

    return Map;
});
