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
        this.addView("all");
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

        if (viewId !== "all") {
            this.views[viewId].style.visibility = "hidden";
        }

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
     * TODO:
     */
    GUI.Label = function (name, labelDesc) {
        var image = resourceAssistant.getImage(name),
            cssRules = labelDesc.style.split(";"),
            i,
            l,
            prop,
            value;

        this.elem = document.createElement('span');

        this.elem.style.position = "absolute";
        this.elem.style.left = labelDesc.x + "px";
        this.elem.style.top = labelDesc.y + "px";
        this.elem.style["z-index"] = 2;

        for (i = 0, l = cssRules.length; i < l; i += 1) {
            prop = cssRules[i].split(":")[0];
            value = cssRules[i].split(":")[1];

            if (prop !== "") {
                this.elem.style[prop] = value;
            }
        }

        if (labelDesc.text !== undefined) {
            this.elem.innerHTML = labelDesc.text;
        }
        if (labelDesc.image !== undefined && labelDesc.image !== null) {
            this.elem.style.background = "url(" + image.src + ") no-repeat";
            this.elem.style.width = image.width + "px";
            this.elem.style.height = image.height + "px";
        } else {
            this.elem.style.width = labelDesc.width + "px";
            this.elem.style.height = labelDesc.height + "px";
        }

        this.on(labelDesc.action, proxy(this, function (text) {
            this.elem.innerHTML = text;
        }));
    };
    extend(eventEmitter, GUI.Label.prototype);

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
        this.elem.style["z-index"] = 2;

        if (buttonDesc.text !== undefined) {
            this.elem.innerHTML = buttonDesc.text;
        }
        if (buttonDesc.image !== undefined && buttonDesc.image !== null) {
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

    /**
     * TODO:
     */
    GUI.Background = function (name, backgroundDesc) {
        var image = resourceAssistant.getImage(name);

        this.elem = document.createElement('div');

        this.elem.style.position = "absolute";
        this.elem.style.left = backgroundDesc.x + "px";
        this.elem.style.top = backgroundDesc.y + "px";
        this.elem.style["z-index"] = 0;

        if (backgroundDesc.image !== undefined && backgroundDesc.image !== null) {
            this.elem.style.background = "url(" + image.src + ") no-repeat";
            this.elem.style.width = image.width + "px";
            this.elem.style.height = image.height + "px";
        } else {
            this.elem.style.width = backgroundDesc.width + "px";
            this.elem.style.height = backgroundDesc.height + "px";
        }
    };

    /**
     * TODO:
     */
    GUI.iFrame = function (name, iFrameDesc) {
        var image = resourceAssistant.getImage(name);

        this.elem = document.createElement('iframe');

        this.elem.style.position = "absolute";
        this.elem.style.border = "0";
        this.elem.style.left = iFrameDesc.x + "px";
        this.elem.style.top = iFrameDesc.y + "px";
        this.elem.style["z-index"] = 2;
        this.elem.style.width = iFrameDesc.width + "px";
        this.elem.style.height = iFrameDesc.height + "px";
        
        this.elem.scrolling = "no";

        this.on("enter_scene_" + iFrameDesc.scene, proxy(this, function () {
            this.elem.src = iFrameDesc.text;
        }));

        this.on("exit_scene_" + iFrameDesc.scene, proxy(this, function () {
            this.elem.src = "";
        }));
    };
    extend(eventEmitter, GUI.iFrame.prototype);

    return GUI;
});
