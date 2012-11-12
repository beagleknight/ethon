/*jslint browser: true, regexp: true*/
/*global define*/

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
 * @requires resourceAssistant
 */
define(function (require) {
    "use strict";

    var extend            = require("ethon/extend"),
        inherit           = require("ethon/inherit"),
        eventEmitter      = require("ethon/event_emitter"),
        Soul              = require("ethon/soul"),
        renderAssistant   = require("ethon/render_assistant"),
        actionDispatcher  = require("ethon/action_dispatcher"),
        proxy             = require("ethon/proxy"),
        resourceAssistant = require("ethon/resource_assistant"),
        GUI;

    /**
     * Constructor
     *
     * @method GUI
     */
    GUI = function (container) {
        this.container = container;
        this.views = {};
        this.activeView = null;
    };

    /**
     * TODO:
     */
    GUI.prototype.addView = function (viewId) {
        this.views[viewId] = document.createElement('div');
        this.views[viewId].id = viewId;
        this.views[viewId].style.width = this.container.clientWidth + "px";
        this.views[viewId].style.height = this.container.clientHeight + "px";
        this.views[viewId].style.position = "absolute";
        this.views[viewId].style.visibility = "hidden";
        this.container.appendChild(this.views[viewId]);
    };

    /**
     * Add GUI element for being rendered.
     *
     * @method addElement
     */
    GUI.prototype.addElement = function (viewId, element) {
        this.views[viewId].appendChild(element);
    };

    /**
     * TODO:
     */
    GUI.prototype.setActiveView = function (viewId) {
        if (this.activeView !== null) {
            this.views[this.activeView].style.visibility = "hidden";
        }
        this.activeView = viewId;
        this.views[this.activeView].style.visibility = "visible";
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
     * TODO:
     */
    GUI.Button = function (name, buttonDesc) {
        var image = resourceAssistant.getImage(name),
            openUrl = buttonDesc.action.match(/open\('(.*)'\)/);

        this.elem = document.createElement('button');

        this.elem.style.position = "absolute";
        this.elem.style.left = buttonDesc.x + "px";
        this.elem.style.top = buttonDesc.y + "px";
        this.elem.style.border = "0";
        this.elem.style.padding = "0";
        this.elem.style.cursor = "pointer";

        if (buttonDesc.text !== undefined) {
            this.elem.innerHTML = buttonDesc.text;
        }
        if (buttonDesc.image !== undefined) {
            this.elem.style.background = "url(" + image.src + ") no-repeat";
            this.elem.style.width = image.width + "px";
            this.elem.style.height = image.height + "px";
        } else {
            this.elem.style.width = buttonDesc.width + "px";
            this.elem.style.height = buttonDesc.height + "px";
        }

        this.elem.addEventListener("click", proxy(this, function () {
            if (openUrl !== null) {
                window.open(openUrl[1]);
            } else {
                this.trigger(buttonDesc.action);
            }
        }));
    };
    extend(eventEmitter, GUI.Button.prototype);

    return GUI;
});
