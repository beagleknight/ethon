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
        Soul              = require("ethon/soul"),
        QuadBody          = require("ethon/quad_body"),
        physicsAssistant  = require("ethon/physics_assistant"),
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
        this.$container = $(container);
        this.views = {};
        this.activeView = null;
        //this.addView("loading");
        //this.addElement("progress", "loading", {
        //    "name": "loading",
        //    "pos_x": 297,
        //    "pos_y": 430,
        //    "width": 200,
        //    "height": 15,
        //    "action": "loading_progress",
        //    "style": {
        //        "color": "#000",
        //        "background-color": "#fff",
        //        "border": "1px solid #000"
        //    }
        //});
        //this.setActiveView("loading");
    };

    GUI.prototype.setOptions = function (options) {
        options = options || { mobile: false };
        this.mobile = options.mobile;
    };

    /**
     * TODO:
     */
    GUI.prototype.addView = function (viewId) {
        var view = document.createElement('div'),
            $view = $(view);

        //$view.css('width', this.$container.clientWidth + "px");
        //$view.css('height', this.$container.clientHeight + "px");
        //$view.css('position', "absolute");
        $view.addClass('scene');
        $view.attr('id', viewId);

        this.views[viewId] = $view;
        this.hideView(viewId);
        this.$container.append(view);
    };

    /**
     * TODO:
     */
    GUI.prototype.hideView = function (viewId) {
        this.views[viewId].css('visibility', "hidden");
    };

    /**
     * TODO:
     */
    GUI.prototype.showView = function (viewId) {
        this.views[viewId].css('visibility', "visible");
    };

    GUI.prototype.showState = function (state) {
        var i, l, element;

        for (i = 0, l = this.views[this.activeView].rawElements.length; i < l; i += 1) {
            element = this.views[this.activeView].rawElements[i];
            if (element.state === state) {
                element.show();
            } else {
                element.hide();
            }
        }
    };


    /**
     * Add GUI element for being rendered.
     *
     * @method addElement
     */
    GUI.prototype.addElement = function (category, viewId, elementDesc) {
        if (!elementDesc.mobile || this.mobile) {
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
            element.state = elementDesc.state;
            this.views[viewId].rawElements = this.views[viewId].rawElements || [];
            this.views[viewId].rawElements.push(element);
            this.views[viewId].append(element.$el);

            if (element.action && category === "button") {
                element.$el.on("touchstart mousedown", proxy(element, function () {
                    element.isPressed = true;
                    element.broadcast(element.action);
                }));

                if (elementDesc.mobile) {
                    element.$el.on("touchend mouseup", proxy(element, function () {
                        element.isPressed = false;
                        element.broadcast(element.action + "_release");
                    }));

                    $(document).on("touchmove", proxy(element, function (event) {
                        if (element.isPressed) {
                            var lastTouch = event.originalEvent.touches[0],
                                coords = {
                                    x: lastTouch.clientX,
                                    y: lastTouch.clientY
                                },
                                mouseSoul,
                                elementSoul;

                            mouseSoul = new Soul("mouse", coords.x, coords.y);
                            mouseSoul.setBody(new QuadBody(0, 0, 1, 1));

                            elementSoul = new Soul("element", element.posX, element.posY);
                            elementSoul.setBody(new QuadBody(0, 0, element.width, element.height));

                            if (!physicsAssistant.soulsCollision(mouseSoul, elementSoul)) {
                                element.isPressed = false;
                                element.broadcast(element.action + "_release");
                            }
                        }

                        event.preventDefault();
                    }));
                }
            }

            return element;
        }
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
        var image,
            prop,
            value;

        EventEmitter.call(this);

        if (elementDesc.image) {
            image = resourceAssistant.getImage(elementDesc.image);
        }

        this.name = elementDesc.name;
        this.action = elementDesc.action;
        this.posX = parseInt(elementDesc.pos_x, 10);
        this.posY = parseInt(elementDesc.pos_y, 10);
        this.width = parseInt(elementDesc.width, 10);
        this.height = parseInt(elementDesc.height, 10);
        this.$el = $(this.el);
        this.$el.addClass("gui-component");

        //var textContent = $element.find('p');

        //textContent.css("font-size", $scope.component.style['font-size'] + "px");
        //textContent.css("font-family", $scope.component.style['font-family']);
        //textContent.css("color", $scope.component.style['color']);
        
        var container           = $('#container'),
            rows                = 28,
            rowHeight           = parseInt(container.css("height"), 10) / rows,
            rowHeightPercentage = rowHeight / parseInt(container.css("height"), 10) * 100,
            cols                = 32,
            colWidth            = parseInt(container.css("width"), 10) / cols,
            colWidthPercentage  = colWidth / parseInt(container.css("width"), 10) * 100;

        this.$el.css("left"   , (elementDesc.pos_x * colWidthPercentage) + "%");
        this.$el.css("top"    , (elementDesc.pos_y * rowHeightPercentage) + "%");

        if (elementDesc.image !== "" && elementDesc.image !== undefined && elementDesc.image !== null) {
            this.$el.css("background", "url(" + image.src + ") center center no-repeat");
        } else {
            this.$el.css("background", "");
            this.$el.css("background", elementDesc.style['background-color']);
        }

        this.$el.css("width"  , (elementDesc.width * colWidthPercentage) + "%");
        this.$el.css("height" , (elementDesc.height * rowHeightPercentage) + "%");


        for (prop in elementDesc.style) {
            if (elementDesc.style.hasOwnProperty(prop)) {
                value = elementDesc.style[prop];
                if (prop === 'font-size') {
                    value += 'em';
                }

                this.$el.css(prop, value);
            }
        }

        if (elementDesc.text !== undefined && elementDesc.text !== null) {

            var contentEl = document.createElement('p'),
                $contentEl = $(contentEl);

            $contentEl.addClass("content");
            $contentEl.html(elementDesc.text);

            this.$el.append($contentEl);
        }
    };

    inherit(GUI.Element, EventEmitter);

    GUI.Element.prototype.destroy = function () {
        this.$el.remove();
    };

    GUI.Element.prototype.hide = function () {
        this.$el.css('display', 'none');
    };

    GUI.Element.prototype.show = function () {
        this.$el.css('display', 'block');
    };

    /**
     * TODO:
     */
    GUI.Label = function (labelDesc) {
        this.el = document.createElement('div');
        GUI.Element.call(this, labelDesc);

        this.on(labelDesc.action, proxy(this, function (text) {
            this.$el.find('.content').html(text);
        }));
    };
    inherit(GUI.Label, GUI.Element);

    /**
     * TODO:
     */
    GUI.Button = function (buttonDesc) {
        this.el = document.createElement('div');
        GUI.Element.call(this, buttonDesc);
        this.$el.css('cursor', "pointer");
        this.$el.css('-webkit-tap-highlight-color', 'rgba(0, 0, 0, 0)');
    };
    inherit(GUI.Button, GUI.Element);

    /**
     * TODO:
     */
    GUI.Background = function (backgroundDesc) {
        this.el = document.createElement('div');
        GUI.Element.call(this, backgroundDesc);
        this.$el.css('z-index', 0);
    };
    inherit(GUI.Background, GUI.Element);

    /**
     * TODO:
     */
    GUI.iFrame = function (iFrameDesc) {
        this.el = document.createElement('iframe');
        this.el.scrolling = "no";
        GUI.Element.call(this, iFrameDesc);
        this.$el.css('z-index', 1);

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
        this.el.href = linkDesc.url || resourceAssistant.getFile(linkDesc.file);
    };
    inherit(GUI.Link, GUI.Element);

    /**
     * TODO:
     */
    GUI.Progress = function (progressDesc) {
        this.progress = document.createElement('div');
        this.$progress = $(this.progress);
        this.el = document.createElement('div');
        GUI.Element.call(this, progressDesc);
        this.$el.append(this.$progress);

        this.$progress.css('width', "0%");
        this.$progress.css('height', this.$el.css('height'));
        this.$progress.css('background', this.$el.css('color'));

        this.on(progressDesc.action, proxy(this, function (value) {
            this.$progress.css('width', value + "%");
        }));
    };
    inherit(GUI.Progress, GUI.Element);

    return GUI;
});
