(function () {
    "use strict";

    var inherit           = require("./inherit"),
        EventEmitter      = require("./event_emitter"),
        proxy             = require("./proxy"),
        resourceAssistant = require("./resource_assistant"),
        Soul              = require("./soul"),
        QuadBody          = require("./quad_body"),
        physicsAssistant  = require("./physics_assistant"),
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
        this.$curtain = $('#curtain');
        this.views = {};
        this.activeView = null;
    };
    inherit(GUI, EventEmitter);

    GUI.prototype.setOptions = function (options) {
        options = options || { mobile: false };
        this.mobile = options.mobile;
    };

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

    GUI.prototype.hideView = function (viewId) {
        this.views[viewId].css('visibility', "hidden");
    };

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
        if ((!elementDesc.mobile || this.mobile) && (!elementDesc.hidden || elementDesc.name === 'time_label')) {
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

                    if (element.elementDesc.use_clicked_state) {
                        element.setClickedState();
                    }
                }));

                if (elementDesc.mobile) {
                    element.$el.on("touchend mouseup", proxy(element, function () {
                        element.isPressed = false;
                        element.broadcast(element.action + "_release");
                        element.setNormalState();
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
                } else {
                    element.$el.on("touchend mouseup", proxy(element, function () {
                        element.isPressed = false;
                        element.setNormalState();
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

    GUI.prototype.exitView = function (cb) {
        this.$curtain.fadeIn({
            complete: cb
        });
    };

    GUI.prototype.setActiveView = function (viewId, cb) {
        if (this.activeView !== null) {
            this.hideView(this.activeView);
        }
        this.activeView = viewId;
        this.showView(this.activeView);
        // Enter current scene
        this.broadcast("enter_scene_" + viewId);
        this.$curtain.fadeOut({
            complete: cb
        });
    };

    GUI.Element = function (elementDesc) {
        var container           = $('#gui'),
            rows                = 33,
            rowHeight           = parseInt(container.css("height"), 10) / rows,
            rowHeightPercentage = rowHeight / parseInt(container.css("height"), 10) * 100,
            cols                = 45,
            colWidth            = parseInt(container.css("width"), 10) / cols,
            colWidthPercentage  = colWidth / parseInt(container.css("width"), 10) * 100,
            prop,
            value;

        EventEmitter.call(this);

        this.elementDesc = elementDesc;

        if (this.elementDesc.image) {
            this.image = resourceAssistant.getImage(this.elementDesc.image);
        }

        this.name = this.elementDesc.name;
        this.action = this.elementDesc.action;
        this.posX = parseInt(this.elementDesc.pos_x, 10);
        this.posY = parseInt(this.elementDesc.pos_y, 10);
        this.width = parseInt(this.elementDesc.width, 10);
        this.height = parseInt(this.elementDesc.height, 10);
        this.$el = $(this.el);
        this.$el.addClass("gui-component");

        this.$el.css("left"   , (this.elementDesc.pos_x * colWidthPercentage) + "%");
        this.$el.css("top"    , (this.elementDesc.pos_y * rowHeightPercentage) + "%");

        this.$el.css("background-position", "center center");
        this.$el.css("background-repeat", "no-repeat");
        this.$el.css("background-color", "transparent");
        this.$el.css("background-size", "cover");

        if (this.elementDesc.image !== "" && this.elementDesc.image !== undefined && this.elementDesc.image !== null) {
            this.$el.css("background-image", "url(" + this.image.src + ")");
        } else {
            this.$el.css("background-color", this.elementDesc.style['background-color']);
        }

        this.$el.css("width"  , (this.elementDesc.width * colWidthPercentage) + "%");
        this.$el.css("height" , (this.elementDesc.height * rowHeightPercentage) + "%");

        for (prop in this.elementDesc.style) {
            if (this.elementDesc.style.hasOwnProperty(prop)) {
                value = this.elementDesc.style[prop];
                if (prop === 'font-size') {
                    value += 'em';
                }

                this.$el.css(prop, value);
            }
        }

        if (this.elementDesc.text !== undefined && this.elementDesc.text !== null) {

            var contentEl = document.createElement('p'),
                $contentEl = $(contentEl);

            $contentEl.addClass("content");
            $contentEl.html(this.elementDesc.text);

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
        this.$el.css('display', 'table');
    };

    GUI.Label = function (labelDesc) {
        this.el = document.createElement('div');
        GUI.Element.call(this, labelDesc);

        this.on(labelDesc.action, proxy(this, function (text) {
            this.$el.find('.content').html(text);
        }));
    };
    inherit(GUI.Label, GUI.Element);

    GUI.Button = function (buttonDesc) {
        this.el = document.createElement('div');
        GUI.Element.call(this, buttonDesc);
        this.$el.css('cursor', "pointer");
        this.$el.css('-webkit-tap-highlight-color', 'rgba(0, 0, 0, 0)');

        if (this.elementDesc.clicked_state && this.elementDesc.clicked_state.image) {
            this.clickedStateImage = resourceAssistant.getImage(this.elementDesc.clicked_state.image);
        }
    };
    inherit(GUI.Button, GUI.Element);

    GUI.Button.prototype.setNormalState = function () {
        if (this.elementDesc.image !== "" && this.elementDesc.image !== undefined && this.elementDesc.image !== null) {
            this.$el.css("background-image", "url(" + this.image.src + ")");
        } else {
            this.$el.css("background-color", this.elementDesc.style['background-color']);
        }
    };

    GUI.Button.prototype.setClickedState = function () {
        if (this.elementDesc.clicked_state.image !== "" && this.elementDesc.clicked_state.image !== undefined && this.elementDesc.clicked_state.image !== null) {
            this.$el.css("background-image", "url(" + this.clickedStateImage.src + ")");
        } else {
            this.$el.css("background-color", this.elementDesc.clicked_state.style['background-color']);
        }
    };

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

    module.exports = GUI;
}());
