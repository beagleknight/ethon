/*jslint browser: true, regexp: true, nomen: true*/
/*global define*/

/**
 * Acts as a container for all GUI elements
 *
 * @class GUI
 * @requires inherit
 * @requires EventEmitter
 * @requires proxy
 */
define(function (require) {
    "use strict";

    var inherit           = require("ethon/inherit"),
        EventEmitter      = require("ethon/event_emitter"),
        proxy             = require("ethon/proxy"),
        resourceAssistant = require("ethon/resource_assistant"),
        $                 = require("jquery"),
        GUI;

    String.prototype.camelize = function () {
        var result = this.replace(/(?:^|[\-_])(\w)/g, function (_, c) {
            return c ? c.toUpperCase() : '';
        });
        return result.charAt(0).toLowerCase() + result.slice(1);
    };

    /**
     * Constructor
     *
     * @method GUI
     */
    GUI = function (container) {
        this.container = container;
        this.views = {};
        this.addView("all");
        this.addElement("progress", "all", {
            "name": "loading",
            "pos_x": "297",
            "pos_y": "430",
            "width": "200",
            "height": "15",
            "action": "loading_progress",
            "style": {
                "color": "#000",
                "background-color": "#fff",
                "border": "1px solid #000;"
            }
        });
        this.activeView = null;
        this.setActiveView("all");
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
        case "button":
            element = new GUI.Button(elementDesc);
            break;
        case "label":
            element = new GUI.Label(elementDesc);
            break;
        case "background":
            element = new GUI.Background(elementDesc);
            break;
        case "iframe":
            element = new GUI.iFrame(elementDesc);
            break;
        case "link":
            element = new GUI.Link(elementDesc);
            break;
        case "progress":
            element = new GUI.Progress(elementDesc);
            break;
        }

        element.view = this.views[viewId];
        this.views[viewId].rawElements = this.views[viewId].rawElements || [];
        this.views[viewId].rawElements.push(element);
        this.views[viewId].appendChild(element.el);

        return element;
    };

    GUI.prototype.getElement = function (viewId, elementName) {
        var i, l;

        for (i = 0, l = this.views[viewId].rawElements.length; i < l; i += 1) {
            if (elementName === this.views[viewId].rawElements[i].name) {
                return this.views[viewId].rawElements[i];
            }
        }

        return false;
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
        var image = resourceAssistant.getImage(elementDesc.image),
            prop;

        EventEmitter.call(this);

        this.name = elementDesc.name;
        this.$el = $(this.el);
        this.$el.addClass("component");
        this.el.style.position = "absolute";
        this.el.style.left = elementDesc.pos_x + "px";
        this.el.style.top = elementDesc.pos_y + "px";
        this.el.style.border = "0";
        this.el.style.padding = "0";
        this.el.style.zIndex = 2;

        if (elementDesc.image !== "" && elementDesc.image !== undefined && elementDesc.image !== null) {
            this.$el.css("background-image", "url(" + image.src + ")");
            this.$el.css("background-color", "transparent");
            this.el.style.width = image.width + "px";
            this.el.style.height = image.height + "px";
        } else {
            this.el.style.width = elementDesc.width + "px";
            this.el.style.height = elementDesc.height + "px";
        }

        for (prop in elementDesc.style) {
            if (elementDesc.style.hasOwnProperty(prop)) {
                this.$el.css(prop, elementDesc.style[prop]);
            }
        }

        if (elementDesc.text !== undefined && elementDesc.text !== null) {

            var contentEl = document.createElement('div'),
                $contentEl = $(contentEl);

            $contentEl.addClass("content");
            $contentEl.css("display", "table-cell");
            $contentEl.css("text-align", "center");
            $contentEl.css("vertical-align", "middle");
            $contentEl.css("width", this.$el.css("width"));
            $contentEl.css("height", this.$el.css("height"));
            $contentEl.html(elementDesc.text);

            this.$el.append($contentEl);
        }
    };

    inherit(GUI.Element, EventEmitter);

    GUI.Element.prototype.destroy = function () {
        this.view.removeChild(this.el);
    };

    GUI.Element.prototype.hide = function () {
        this.el.style.display = 'none';
    };

    GUI.Element.prototype.show = function () {
        this.el.style.display = 'block';
    };

    /**
     * TODO:
     */
    GUI.Label = function (labelDesc) {
        this.el = document.createElement('span');
        GUI.Element.call(this, labelDesc);

        this.el.innerHTML = labelDesc.initial_text;

        this.on(labelDesc.action, proxy(this, function (text) {
            this.el.innerHTML = text;
        }));
    };
    inherit(GUI.Label, GUI.Element);

    /**
     * TODO:
     */
    GUI.Button = function (buttonDesc) {
        this.el = document.createElement('button');
        this.el.style.cursor = "pointer";
        GUI.Element.call(this, buttonDesc);

        this.el.addEventListener("click", proxy(this, function () {
            this.broadcast(buttonDesc.action);
        }));
    };
    inherit(GUI.Button, GUI.Element);

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
        this.el.style.zIndex = 1;

        this.on(iFrameDesc.action, proxy(this, function (url) {
            this.el.src = url;
        }));
    };
    inherit(GUI.iFrame, GUI.Element);

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

    return GUI;
});
