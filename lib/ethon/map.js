/*global define*/

/**
 * Provides a Class for drawing game's background using
 * different layers.
 *
 * @class Map
 * @requires render_assistant
 * @requires extend
 * @requires event_emitter
 */
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
     * Add a drawing layer to the map.
     *
     * @method addLayer
     * @param {Function} callback Function executed when drawing
     * the layer.
     */
    Map.prototype.addLayer = function (callback) {
        this.layers.push(callback);
    };

    /**
     * It renders all map layers in the specific
     * array order.
     *
     * @method render
     */
    Map.prototype.render = function () {
        var i, l;

        for (i = 0, l = this.layers.length; i < l; i += 1) {
            this.layers[i](renderAssistant);
        }
    };

    return Map;
});
