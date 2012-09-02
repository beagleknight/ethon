var define = define || undefined;

define(function (require) {
    "use strict";

    var extend          = require("ethon/extend"),
        inherit         = require("ethon/inherit"),
        eventEmitter    = require("ethon/event_emitter"),
        Soul            = require("ethon/soul"),
        renderAssistant = require("ethon/render_assistant"),
        GUI;

    /**
     * constructor function
     *
     * Initialize elements array.
     */
    GUI = function () {
        this.elements = [];
    };

    /**
     * addElement
     *
     * Add GUI element for being rendered.
     */
    GUI.prototype.addElement = function (element) {
        this.elements.push(element);
    };

    /**
     * render
     *
     * Render GUI elements
     */
    GUI.prototype.render = function () {
        var i, l;

        for (i = 0, l = this.elements.length; i < l; i += 1) {
            this.elements[i].render();
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

    return GUI;
});
