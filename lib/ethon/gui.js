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
    GUI.prototype.addElement = function (name, elementDesc) {
        var viewId = elementDesc.scene,
            element;

        switch (elementDesc.category) {
        case "button":
            element = new GUI.Button(name, elementDesc);
            break;
        case "label":
            element = new GUI.Label(name, elementDesc);
            break;
        case "background":
            element = new GUI.Background(name, elementDesc);
            break;
        case "iframe":
            element = new GUI.iFrame(name, elementDesc);
            break;
        case "link":
            element = new GUI.Link(name, elementDesc);
            break;
        }

        this.views[viewId].appendChild(element.el);
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

        this.el = document.createElement('span');

        this.el.style.position = "absolute";
        this.el.style.left = labelDesc.x + "px";
        this.el.style.top = labelDesc.y + "px";
        this.el.style["z-index"] = 2;

        for (i = 0, l = cssRules.length; i < l; i += 1) {
            prop = cssRules[i].split(":")[0];
            value = cssRules[i].split(":")[1];

            if (prop !== "") {
                this.el.style[prop] = value;
            }
        }

        if (labelDesc.text !== undefined) {
            this.el.innerHTML = labelDesc.text;
        }
        if (labelDesc.image !== undefined && labelDesc.image !== null) {
            this.el.style.background = "url(" + image.src + ") no-repeat";
            this.el.style.width = image.width + "px";
            this.el.style.height = image.height + "px";
        } else {
            this.el.style.width = labelDesc.width + "px";
            this.el.style.height = labelDesc.height + "px";
        }

        this.on(labelDesc.action, proxy(this, function (text) {
            this.el.innerHTML = text;
        }));
    };
    extend(eventEmitter, GUI.Label.prototype);

    /**
     * TODO:
     */
    GUI.Button = function (name, buttonDesc) {
        var image = resourceAssistant.getImage(name),
            openUrl = buttonDesc.action.match(/open\('(.*)'\)/);

        this.el = document.createElement('button');

        this.el.style.position = "absolute";
        this.el.style.left = buttonDesc.x + "px";
        this.el.style.top = buttonDesc.y + "px";
        this.el.style.border = "0";
        this.el.style.padding = "0";
        this.el.style.cursor = "pointer";
        this.el.style["z-index"] = 2;

        if (buttonDesc.text !== undefined) {
            this.el.innerHTML = buttonDesc.text;
        }
        if (buttonDesc.image !== undefined && buttonDesc.image !== null) {
            this.el.style.background = "url(" + image.src + ") no-repeat";
            this.el.style.width = image.width + "px";
            this.el.style.height = image.height + "px";
        } else {
            this.el.style.width = buttonDesc.width + "px";
            this.el.style.height = buttonDesc.height + "px";
        }

        this.el.addEventListener("click", proxy(this, function () {
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

        this.el = document.createElement('div');

        this.el.style.position = "absolute";
        this.el.style.left = backgroundDesc.x + "px";
        this.el.style.top = backgroundDesc.y + "px";
        this.el.style["z-index"] = 0;

        if (backgroundDesc.image !== undefined && backgroundDesc.image !== null) {
            this.el.style.background = "url(" + image.src + ") no-repeat";
            this.el.style.width = image.width + "px";
            this.el.style.height = image.height + "px";
        } else {
            this.el.style.width = backgroundDesc.width + "px";
            this.el.style.height = backgroundDesc.height + "px";
        }
    };

    /**
     * TODO:
     */
    GUI.iFrame = function (name, iFrameDesc) {
        var image = resourceAssistant.getImage(name);

        this.el = document.createElement('iframe');

        this.el.style.position = "absolute";
        this.el.style.border = "0";
        this.el.style.left = iFrameDesc.x + "px";
        this.el.style.top = iFrameDesc.y + "px";
        this.el.style["z-index"] = 2;
        this.el.style.width = iFrameDesc.width + "px";
        this.el.style.height = iFrameDesc.height + "px";
        
        this.el.scrolling = "no";

        this.on("enter_scene_" + iFrameDesc.scene, proxy(this, function () {
            this.el.src = iFrameDesc.text;
        }));

        this.on("exit_scene_" + iFrameDesc.scene, proxy(this, function () {
            this.el.src = "";
        }));
    };
    extend(eventEmitter, GUI.iFrame.prototype);

    /**
     * TODO:
     */
    GUI.Link = function (name, linkDesc) {
        var image = resourceAssistant.getImage(name),
            cssRules = linkDesc.style.split(";"),
            i,
            l,
            prop,
            value;

        this.el = document.createElement('a');

        this.el.style.position = "absolute";
        this.el.style.border = "0";
        this.el.style.left = linkDesc.x + "px";
        this.el.style.top = linkDesc.y + "px";
        this.el.style["z-index"] = 2;
        this.el.style.display = "block";
        this.el.style.width = linkDesc.width + "px";
        this.el.style.height = linkDesc.height + "px";

        for (i = 0, l = cssRules.length; i < l; i += 1) {
            prop = cssRules[i].split(":")[0];
            value = cssRules[i].split(":")[1];

            if (prop !== "") {
                this.el.style[prop] = value;
            }
        }

        if (linkDesc.image !== undefined && linkDesc.image !== null) {
            this.el.style.background = "url(" + image.src + ") no-repeat";
            this.el.style.width = image.width + "px";
            this.el.style.height = image.height + "px";
        } else {
            this.el.style.width = linkDesc.width + "px";
            this.el.style.height = linkDesc.height + "px";
        }
        
        this.el.innerHTML = linkDesc.text;
        this.el.target = "_blank";

        if (/^https?:/.test(linkDesc.action)) {
            this.el.href = linkDesc.action;
        } else if (/^file:/.test(linkDesc.action)) {
            this.el.href = linkDesc.file;
        }
    };

    return GUI;
});
