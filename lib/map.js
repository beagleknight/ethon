// TODO: requires extend helper function
// TODO: requires event emitter module
// TODO: requires render assistant module
var ethon = ethon || {},
    window = window || {};

(function (window, exports) {
    "use strict";

    var extend = exports.extend,
        eventEmitter = exports.eventEmitter,
        renderAssistant = exports.renderAssistant,
        layers = [],
        Map = function () {
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
        layers.push(callback);
    };

    /**
     * render
     *
     * It renders all map layers in the specific
     * array order.
     */
    Map.prototype.render = function () {
        var i, l;

        for (i = 0, l = layers.length; i < l; i += 1) {
            layers[i](renderAssistant);
        }
    };

    exports.Map = Map;
}(window, ethon));
