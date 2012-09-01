var ethon = ethon || {},
    require = require || {},
    window = window || {};

(function (window, exports) {
    "use strict";

    require(["./extend", "./inherit", "./soul", "./render_assistant"],
        function (extend, soul, renderAssistant) {

        var elements = [],
            extend = exports.extend,
            inherit = exports.inherit,
            eventEmitter = exports.eventEmitter,
            Soul = exports.Soul,
            renderAssistant = exports.renderAssistant,
            GUI = function () {
            };

        /**
         * addElement
         *
         * Add GUI element for being rendered.
         */
        GUI.prototype.addElement = function (element) {
            elements.push(element);
        };

        /**
         * render
         *
         * Render GUI elements
         */
        GUI.prototype.render = function () {
            var i, l;

            for (i = 0, l = elements.length; i < l; i += 1) {
                elements[i].render();
            }
        };

        /**
         * GUI.Label
         *
         * Constructor functions for GUI text labels.
         * It expects a x and y coordinates and text to display.
         * Inherits from soul for take advantage of Event Emitter
         * and position.
         */
        GUI.Label = function (name, x, y, message, fillStyle) {
            Soul.call(this, name, x, y);
            this.message = message;
            this.fillStyle = fillStyle;
        };

        inherit(GUI.Label, Soul);
        // TODO: inherit doesnt copy mixed methods?
        extend(eventEmitter, GUI.Label.prototype);

        GUI.Label.prototype.render = function () {
            var position = this.getPosition();
            renderAssistant.drawText(position.x, position.y, this.message, this.fillStyle);
        };

        exports.GUI = GUI;
    });
}(window, ethon));
