var define = define || undefined;

/**
 * Acts as a container for all GUI elements
 *
 * @class GUI
 * @requires extend
 * @requires inherit
 * @requires eventEmitter
 * @requires Soul
 * @requires renderAssistant
 * @requires actionDispatcher
 * @requires proxy
 */
define(function (require) {
    "use strict";

    var extend           = require("ethon/extend"),
        inherit          = require("ethon/inherit"),
        eventEmitter     = require("ethon/event_emitter"),
        Soul             = require("ethon/soul"),
        renderAssistant  = require("ethon/render_assistant"),
        actionDispatcher = require("ethon/action_dispatcher"),
        proxy            = require("ethon/proxy"),
        GUI;

    /**
     * Constructor
     *
     * @method GUI
     */
    GUI = function () {
        this.elements = [];
        this.visible = false;
    };

    /**
     * Add GUI element for being rendered.
     *
     * @method addElement
     */
    GUI.prototype.addElement = function (element) {
        element.parent = this;
        this.elements.push(element);
    };

    /**
     * Render GUI elements
     *
     * @method render
     */
    GUI.prototype.render = function () {
        var i, l;

        for (i = 0, l = this.elements.length; i < l; i += 1) {
            this.elements[i].render();
        }
    };

    /**
     * Set GUI as visible for handling events
     *
     * @method setVisible
     */
    GUI.prototype.setVisible = function (visible) {
        this.visible = visible;
    };

    /**
     * Check if GUI is visible
     * 
     * @method isVisible
     */
    GUI.prototype.isVisible = function () {
        return this.visible;
    };

    /**
     * Constructor function for GUI text labels.
     * It expects a x and y coordinates and text to display.
     * Inherits from soul for take advantage of Event Emitter
     * and position.
     *
     * @method GUI.Label
     */
    GUI.Label = function (name, x, y, message, options) {
        Soul.call(this, name, x, y);
        this.message = message;
        this.options = options;
    };

    inherit(GUI.Label, Soul);
    extend(eventEmitter, GUI.Label.prototype);

    GUI.Label.prototype.render = function () {
        var position = this.getPosition();
        renderAssistant.drawText(position.x, position.y, this.message, this.options);
    };

    /**
     * Constructor function for GUI Button.
     *
     * @method GUI.Button
     * @param {String} name Button's identifier
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     * @param {Number} w Button's width
     * @param {Number} h Button's height
     * @param {String} text Button's text to display
     * @param {Function} renderCallback Function for render button's background
     */
    GUI.Button = function (name, x, y, w, h, text, image) {
        Soul.call(this, name, x, y);
        var position = this.getPosition();

        this.w = w;
        this.h = h;
        this.text = text;
        this.image = image;

        actionDispatcher.registerMouseClickAction("MOUSE_LEFT",
            { x: position.x, y: position.y, w: this.w, h: this.h }, proxy(this, this.click));
    };

    inherit(GUI.Button, Soul);
    extend(eventEmitter, GUI.Button.prototype);

    GUI.Button.prototype.render = function () {
        var position = this.getPosition();
        if (this.image !== undefined) {
            renderAssistant.drawImage(position.x, position.y, this.image);
        } else {
            renderAssistant.drawQuad(position.x, position.y, this.w, this.h, "#000000");
        }
        if (this.text !== "") {
            renderAssistant.drawText(position.x, position.y + 30, this.text, { fillStyle: "#ffffff", font: "16px Arial" });
        }
    };

    GUI.Button.prototype.click = function () {
        if (this.parent.isVisible()) {
            this.trigger(this.name + "_clicked");
        }
    };

    return GUI;
});
