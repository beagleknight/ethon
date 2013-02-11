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
        this.hideView(viewId);
        this.container.appendChild(this.views[viewId]);
    };

    /**
     * TODO:
     */
    GUI.prototype.hideView = function (viewId) {
        this.views[viewId].style.visibility = "hidden";
    };

    /**
     * TODO:
     */
    GUI.prototype.showView = function (viewId) {
        this.views[viewId].style.visibility = "visible";
    };


    /**
     * Add GUI element for being rendered.
     *
     * @method addElement
     */
    GUI.prototype.addElement = function (category, viewId, elementDesc) {
        var element;

        switch (category) {
        case "buttons":
            element = new GUI.Button(elementDesc);
            break;
        case "labels":
            element = new GUI.Label(elementDesc);
            break;
        case "backgrounds":
            element = new GUI.Background(elementDesc);
            break;
        case "iframes":
            element = new GUI.iFrame(elementDesc);
            break;
        case "links":
            element = new GUI.Link(elementDesc);
            break;
        case "progress":
            element = new GUI.Progress(elementDesc);
            break;
        }

        this.views[viewId].appendChild(element.el);
    };

    /**
     * TODO:
     */
    GUI.prototype.setActiveView = function (viewId) {
        if (this.activeView !== null) {
            this.hideView(this.activeView);
        }
        this.activeView = viewId;
        this.showView(this.activeView);
    };

    /**
     * TODO:
     */
    GUI.Element = function (elementDesc) {
        var image = elementDesc.image,
            cssRules,
            i,
            l,
            prop,
            value;

        this.el.style.position = "absolute";
        this.el.style.left = elementDesc.x + "px";
        this.el.style.top = elementDesc.y + "px";
        this.el.style.border = "0";
        this.el.style.padding = "0";
        this.el.style.zIndex = 2;

        if (elementDesc.style !== undefined && elementDesc.style !== null) {
            cssRules = elementDesc.style.split(";");
            for (i = 0, l = cssRules.length; i < l; i += 1) {
                prop = cssRules[i].split(":")[0];
                value = cssRules[i].split(":")[1];

                if (prop !== "") {
                    this.el.style[prop] = value;
                }
            }
        }

        if (elementDesc.image !== undefined && elementDesc.image !== null) {
            this.el.style.background = "url(" + image.src + ") no-repeat";
            this.el.style.width = image.width + "px";
            this.el.style.height = image.height + "px";
        } else {
            this.el.style.width = elementDesc.width + "px";
            this.el.style.height = elementDesc.height + "px";
        }

        if (elementDesc.text !== undefined && elementDesc.text !== null) {
            this.el.innerHTML = elementDesc.text;
        }
    };

    /**
     * TODO:
     */
    GUI.Label = function (labelDesc) {
        this.el = document.createElement('span');
        GUI.Element.call(this, labelDesc);

        this.on(labelDesc.action, proxy(this, function (text) {
            this.el.innerHTML = text;
        }));
    };
    inherit(GUI.Label, GUI.Element);
    extend(eventEmitter, GUI.Label.prototype);

    /**
     * TODO:
     */
    GUI.Button = function (buttonDesc) {
        this.el = document.createElement('button');
        this.el.style.cursor = "pointer";
        GUI.Element.call(this, buttonDesc);

        this.el.addEventListener("click", proxy(this, function () {
            this.trigger(buttonDesc.action);
        }));
    };
    inherit(GUI.Button, GUI.Element);
    extend(eventEmitter, GUI.Button.prototype);

    /**
     * TODO:
     */
    GUI.Background = function (backgroundDesc) {
        this.el = document.createElement('div');
        GUI.Element.call(this, backgroundDesc);
        this.el.style.zIndex = 0;
    };
    inherit(GUI.Background, GUI.Element);

    /**
     * TODO:
     */
    GUI.iFrame = function (iFrameDesc) {
        this.el = document.createElement('iframe');
        this.el.scrolling = "no";
        GUI.Element.call(this, iFrameDesc);

        this.on("enter_scene_" + iFrameDesc.scene, proxy(this, function () {
            this.el.src = iFrameDesc.text;
        }));

        this.on("exit_scene_" + iFrameDesc.scene, proxy(this, function () {
            this.el.src = "";
        }));
    };
    inherit(GUI.iFrame, GUI.Element);
    extend(eventEmitter, GUI.iFrame.prototype);

    /**
     * TODO:
     */
    GUI.Link = function (linkDesc) {
        this.el = document.createElement('a');
        this.el.target = "_blank";
        GUI.Element.call(this, linkDesc);
        this.el.href = linkDesc.url || linkDesc.file;
    };
    inherit(GUI.Link, GUI.Element);

    /**
     * TODO:
     */
    GUI.Progress = function (progressDesc) {
        this.progress = document.createElement('div');
        this.el = document.createElement('div');
        this.el.appendChild(this.progress);
        GUI.Element.call(this, progressDesc);

        this.progress.style.width = "0%";
        this.progress.style.height = this.el.style.height;
        this.progress.style.background = this.el.style.color;

        this.on(progressDesc.action, proxy(this, function (value) {
            this.progress.style.width = value + "%";
        }));
    };
    inherit(GUI.Progress, GUI.Element);
    extend(eventEmitter, GUI.Progress.prototype);

    return GUI;
});
