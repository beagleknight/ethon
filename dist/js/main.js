!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ethon=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function () {
    "use strict";

    var proxy            = _dereq_("./proxy"),
        ActionDispatcher;

    ActionDispatcher = function (inputAssistant) {
        this.inputAssistant = inputAssistant;
    };

    ActionDispatcher.prototype.registerKeyboardAction = function (key, callbackPressed, callbackReleased) {
        this.inputAssistant.on("keydown", proxy(this, function (keyPressed) {
            if (key === keyPressed) {
                callbackPressed();
            }
        }));

        if (callbackReleased !== undefined) {
            this.inputAssistant.on("keyup", proxy(this, function (keyReleased) {
                if (key === keyReleased) {
                    callbackReleased();
                }
            }));
        }
    };

    ActionDispatcher.prototype.registerMouseMotionAction = function (callback) {
        this.inputAssistant.on("mousemotion", proxy(this, function (mouse) {
            callback(this.inputAssistant.normalizeMouse(mouse));
        }));
    };

    ActionDispatcher.prototype.registerMouseClickAction = function (button, callback) {
        this.inputAssistant.on("mousedown", proxy(this, function (mouse, buttonPressed) {
            if (button === buttonPressed) {
                callback(this.inputAssistant.normalizeMouse(mouse));
            }
        }));
    };

    ActionDispatcher.prototype.registerMouseReleaseAction = function (button, callback) {
        this.inputAssistant.on("mouseup", proxy(this, function (mouse, buttonReleased) {
            if (button === buttonReleased) {
                callback(this.inputAssistant.normalizeMouse(mouse));
            }
        }));
    };

    module.exports = ActionDispatcher;
}());

},{"./proxy":15}],2:[function(_dereq_,module,exports){
(function () {
    "use strict";

    var CircleBody = function (x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    };

    module.exports = CircleBody;
}());

},{}],3:[function(_dereq_,module,exports){
(function () {
    "use strict";

    var eventGalaxy = _dereq_("./event_galaxy"),
        EventEmitter;

    EventEmitter = function () {
        this.listeners = {};
    };

    EventEmitter.prototype.on = function (event, callback) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);
        eventGalaxy.register(event, this);
    };

    EventEmitter.prototype.emit = function (event) {
        var i, l,
            args = Array.prototype.slice.call(arguments, 1),
            callbacks = this.listeners[event];

        // Check for existing callbacks for this event
        if (callbacks !== undefined) {
            for (i = 0, l = callbacks.length; i < l; i += 1) {
                callbacks[i].apply(null, args);
            }
        }
    };

    // Alias function
    EventEmitter.prototype.trigger = EventEmitter.prototype.emit;
    EventEmitter.prototype.broadcast = function (event) {
        var args = Array.prototype.slice.call(arguments, 1);
        eventGalaxy.emit(event, args);
    };

    module.exports = EventEmitter;
}());

},{"./event_galaxy":4}],4:[function(_dereq_,module,exports){
(function () {
    "use strict";

    var eventEmitters = {};

    function register(event, eventEmitter) {
        eventEmitters[event] = eventEmitters[event] || [];
        if (eventEmitters[event].indexOf(eventEmitter) === -1) {
            eventEmitters[event].push(eventEmitter);
        }
    }

    function emit(event, args) {
        var i, l,
            localEventEmitters = eventEmitters[event];


        args.unshift(event);
        if (localEventEmitters !== undefined) {
            for (i = 0, l = localEventEmitters.length; i < l; i += 1) {
                localEventEmitters[i].emit.apply(localEventEmitters[i], args);
            }
        }
    }

    module.exports = {
        register: register,
        emit: emit
    };
}());

},{}],5:[function(_dereq_,module,exports){
(function () {
    "use strict";

    module.exports = function (object, methods) {
        var o = object || {},
            method;

        for (method in methods) {
            if (methods.hasOwnProperty(method)) {
                o[method] = methods[method];
            }
        }
        return o;
    };
}());

},{}],6:[function(_dereq_,module,exports){
(function () {
    module.exports = {
        proxy: _dereq_('./proxy'),
        inherit: _dereq_('./inherit'),
        extend: _dereq_('./extend'),
        resourceAssistant: _dereq_('./resource_assistant'),
        pluginsAssistant: _dereq_('./plugins_assistant'),
        physicsAssistant: _dereq_('./physics_assistant'),
        soundAssistant: _dereq_('./sound_assistant'),
        Game: _dereq_('./game'),
        ParticleSystem: _dereq_('./particle_system'),
        Soul: _dereq_('./soul'),
        Sprite: _dereq_('./sprite'),
        QuadBody: _dereq_('./quad_body'),
        EventEmitter: _dereq_('./event_emitter')
    };
}());

},{"./event_emitter":3,"./extend":5,"./game":7,"./inherit":9,"./particle_system":12,"./physics_assistant":13,"./plugins_assistant":14,"./proxy":15,"./quad_body":16,"./resource_assistant":19,"./soul":21,"./sound_assistant":22,"./sprite":23}],7:[function(_dereq_,module,exports){
(function () {
    "use strict";

    var requestAnimationFrame = _dereq_("./request_animation_frame"),
        proxy                 = _dereq_("./proxy"),
        inherit               = _dereq_("./inherit"),
        EventEmitter          = _dereq_("./event_emitter"),
        RenderAssistant       = _dereq_("./render_assistant"),
        InputAssistant        = _dereq_("./input_assistant"),
        ActionDispatcher      = _dereq_("./action_dispatcher"),
        resourceAssistant     = _dereq_("./resource_assistant"),
        pluginsAssistant      = _dereq_("./plugins_assistant"),
        GUI                   = _dereq_("./gui"),
        elapsedTime           = new Date(),
        lastUpdate            = new Date(),
        numFrames             = 0,
        fps                   = 60,
        showFPS,
        Game;

    Game = function (canvas, guiElement, options) {
        var canvasRect;

        EventEmitter.call(this);
        options = options || { showFPS: false };

        this.renderAssistant = new RenderAssistant(guiElement, canvas);
        this.inputAssistant = new InputAssistant(canvas);
        this.actionDispatcher = new ActionDispatcher(this.inputAssistant);
        this.guiElement = guiElement;

        this.gui = new GUI(this.guiElement);
        this.scenes = {};
        this.activeScene = null;
        this.gameLoaded = false;

        showFPS = options.showFPS;

        canvasRect = this.renderAssistant.getCanvasRect();
        this.actionDispatcher.registerMouseClickAction("MOUSE_LEFT", proxy(this, this.onMouseDown));
        this.actionDispatcher.registerMouseMotionAction(proxy(this, this.onMouseMove));
        this.actionDispatcher.registerMouseReleaseAction("MOUSE_LEFT", proxy(this, this.onMouseUp));
    };

    // inherit EventEmitter for register and trigger custom events.
    inherit(Game, EventEmitter);

    // Helper function for update FPS calculation
    function updateFPS() {
        var now = new Date(),
            dt = new Date(now.getTime() - lastUpdate.getTime()).getMilliseconds() / 1000;

        numFrames += 1;

        // Update fps counter every 0.5 seconds
        if (dt > 0.5) {
            fps = Math.floor(numFrames / dt);
            lastUpdate = now;
            numFrames = 0;
        }
    }

    Game.prototype.addScene = function (name, scene) {
        this.scenes[name] = scene;
        this.gui.addView(name);

        if (this.activeScene === null && name !== "loading") {
            this.setActiveScene(name);
        }
    };

    Game.prototype.loop = function () {
        this.update();
        this.render();
        updateFPS();
        requestAnimationFrame(proxy(this, this.loop));
    };

    Game.prototype.update = function () {
        var now           = new Date(),
            dt            = new Date(now.getTime() - elapsedTime.getTime()).getMilliseconds() / 1000;

        this.scenes[this.activeScene].update(dt);
        this.scenes[this.activeScene].afterUpdate(dt);
        elapsedTime = now;
    };

    Game.prototype.render = function () {
        this.scenes[this.activeScene].render(this.renderAssistant);
        this.scenes[this.activeScene].afterRender(this.renderAssistant);

        if (showFPS) {
            this.renderAssistant.drawText(10, 10, "FPS: " + fps);
        }
    };

    /**
     * Starts the game:
     * - Start the update cycle
     * - Start the render cycle
     *
     * @method start
     */
    Game.prototype.start = function (settings, options) {
        this.gameLoaded = false;
        this.options = options;

        this.renderAssistant.setOptions(this.options);
        this.gui.setOptions(this.options);

        resourceAssistant.loadSettings(this, settings, proxy(this, function () {
            //this.gui.getElement("loading", "loading").hide();
            resourceAssistant.loadGUI(this, proxy(this, function () {
                this.broadcast("game_loaded");
                var sceneId;
                for (sceneId in this.scenes) {
                    if (this.scenes.hasOwnProperty(sceneId)) {
                        this.scenes[sceneId].init();
                    }
                }
                requestAnimationFrame(proxy(this, this.loop));
            }));
        }));

        pluginsAssistant.loadPlugins(this.options.plugins);
    };

    /**
     * Set active scene for render and update cycle
     *
     * @method setActiveScene
     * @param {String} scene Scene's identifier
     */
    Game.prototype.setActiveScene = function (sceneId) {
        this.gui.exitView(proxy(this, function () {
            // Exit current scene
            if (this.activeScene !== null) {
                this.scenes[this.activeScene].exit();
                this.broadcast("exit_scene_" + this.activeScene);
            }
            // Set active scene
            this.activeScene = sceneId;
            this.gui.setActiveView(sceneId, proxy(this, function () {
                this.broadcast("scene_" + this.activeScene + "_loaded");
            }));
            this.scenes[this.activeScene].enter();
        }));
    };

    Game.prototype.getScene = function (sceneId) {
        return this.scenes[sceneId];
    };

    Game.prototype.onMouseDown = function (mouse) {
        if (this.scenes[this.activeScene]) {
            this.scenes[this.activeScene].onMouseDown(mouse);
        }
    };

    Game.prototype.onMouseMove = function (mouse) {
        if (this.scenes[this.activeScene]) {
            this.scenes[this.activeScene].onMouseMove(mouse);
        }
    };

    Game.prototype.onMouseUp = function (mouse) {
        if (this.scenes[this.activeScene]) {
            this.scenes[this.activeScene].onMouseUp(mouse);
        }
    };

    module.exports = Game;
}());

},{"./action_dispatcher":1,"./event_emitter":3,"./gui":8,"./inherit":9,"./input_assistant":10,"./plugins_assistant":14,"./proxy":15,"./render_assistant":17,"./request_animation_frame":18,"./resource_assistant":19}],8:[function(_dereq_,module,exports){
(function () {
    "use strict";

    var inherit           = _dereq_("./inherit"),
        EventEmitter      = _dereq_("./event_emitter"),
        proxy             = _dereq_("./proxy"),
        resourceAssistant = _dereq_("./resource_assistant"),
        Soul              = _dereq_("./soul"),
        QuadBody          = _dereq_("./quad_body"),
        physicsAssistant  = _dereq_("./physics_assistant"),
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
        if ((!elementDesc.mobile || this.mobile) && !elementDesc.hidden) {
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

},{"./event_emitter":3,"./inherit":9,"./physics_assistant":13,"./proxy":15,"./quad_body":16,"./resource_assistant":19,"./soul":21}],9:[function(_dereq_,module,exports){
(function () {
    "use strict";

    function F() {}

    module.exports = function (fn, superFn) {
        F.prototype = superFn.prototype;
        fn.prototype = new F();
        fn.prototype.constructor = fn;
    };
}());

},{}],10:[function(_dereq_,module,exports){
(function () {
    "use strict";

    var EventEmitter     = _dereq_("./event_emitter"),
        physicsAssistant = _dereq_("./physics_assistant"),
        inherit          = _dereq_("./inherit"),
        proxy            = _dereq_("./proxy"),
        lut = {
            32: "KEY_SPACEBAR",
            37: "KEY_LEFT_ARROW",
            38: "KEY_UP_ARROW",
            39: "KEY_RIGHT_ARROW",
            40: "KEY_DOWN_ARROW",
            65: "KEY_A",
            66: "KEY_B",
            77: "KEY_M",
            83: "KEY_S",
            0:  "MOUSE_LEFT",
            2:  "MOUSE_RIGHT"
        },
        reservedLut = {
            32: "KEY_SPACEBAR",
            37: "KEY_LEFT_ARROW",
            38: "KEY_UP_ARROW",
            39: "KEY_RIGHT_ARROW",
            40: "KEY_DOWN_ARROW"
        },
        InputAssistant;

    // Helper functions for manage events
    // Read document events and prevent default behavior
    function dismissEvent(event) {
        if ((event.target && event.target.tagName !== "INPUT") && event.preventDefault) {
            event.preventDefault();
            //event.stopPropagation();
        }
    }

    function onmousemove(inputAssistant, event) {
        inputAssistant.mouse.x = event.clientX;
        inputAssistant.mouse.y = event.clientY;
        inputAssistant.emit("mousemotion", inputAssistant.mouse);
    }

    function onmousedown(inputAssistant, event) {
        inputAssistant.mouse.x = event.clientX;
        inputAssistant.mouse.y = event.clientY;
        if (event.button === undefined) {
            event.button = 0; // FORCE MOUSE_LEFT if touch event
        }
        inputAssistant.mouse.buttons[event.button] = true;
        inputAssistant.emit("mousedown", inputAssistant.mouse, lut[event.button]);
        dismissEvent(event);
    }

    function onmouseup(inputAssistant, event) {
        inputAssistant.mouse.x = event.clientX;
        inputAssistant.mouse.y = event.clientY;
        if (event.button === undefined) {
            event.button = 0; // FORCE MOUSE_LEFT if touch event
        }
        inputAssistant.mouse.buttons[event.button] = false;
        inputAssistant.emit("mouseup", inputAssistant.mouse, lut[event.button]);
    }

    function reservedKey(keyCode) {
        var key;
        for (key in reservedLut) {
            if (reservedLut.hasOwnProperty(key) && parseInt(key, 10) === keyCode) {
                return true;
            }
        }
        return false;
    }

    function onkeydown(inputAssistant, event) {
        inputAssistant.keys[event.keyCode] = true;
        inputAssistant.emit("keydown", lut[event.keyCode]);
        clearInterval(inputAssistant.emitters[event.keyCode]);
        inputAssistant.emitters[event.keyCode] = setInterval(function () {
            inputAssistant.emit("keydown", lut[event.keyCode]);
        }, 1000 / 60);

        if (reservedKey(event.keyCode)) {
            dismissEvent(event);
        }
    }

    function onkeyup(inputAssistant, event) {
        inputAssistant.keys[event.keyCode] = false;
        inputAssistant.emit("keyup", lut[event.keyCode]);
        clearInterval(inputAssistant.emitters[event.keyCode]);
    }

    InputAssistant = function (canvas) {
        EventEmitter.call(this);
        this.canvas = canvas;

        if ('ontouchstart' in document.documentElement) {
            var lastTouch = null;

            $(canvas).on("touchstart", proxy(this, function (event) {
                onmousedown(this, event.originalEvent.touches[0]);
                dismissEvent(event);
            }));

            $(canvas).on("touchmove", proxy(this, function (event) {
                lastTouch = event.originalEvent.touches[0];
                onmousemove(this, lastTouch);
                dismissEvent(event);
            }));

            $(canvas).on("touchend", proxy(this, function (event) {
                if (lastTouch) {
                    onmouseup(this, lastTouch);
                    dismissEvent(event);
                    lastTouch = null;
                }
            }));
        } else {
            $(canvas).on("mousedown", proxy(this, function (event) {
                onmousedown(this, event);
            }));

            $(canvas).on("mousemove", proxy(this, function (event) {
                onmousemove(this, event);
            }));

            $(canvas).on("mouseup", proxy(this, function (event) {
                onmouseup(this, event);
            }));
        }

        $(canvas).on("contextmenu", proxy(this, function (event) {
            dismissEvent(event);
        }));

        // Register events callbacks
        $('body').on("keydown", proxy(this, function (event) {
            onkeydown(this, event);
        }));

        $('body').on("keyup", proxy(this, function (event) {
            onkeyup(this, event);
        }));

        this.keys = [];
        this.emitters = {};
        this.mouse = {
            x: -1,
            y: -1,
            buttons: []
        };
    };
    inherit(InputAssistant, EventEmitter);

    /**
     * Check if a key is pressed.
     *
     * @method isKeyPresseD
     * @param {String} keyCode Identifier of the key. See lut object.
     * @return true when key is pressed. 
     */
    InputAssistant.prototype.isKeyPressed = function (keyCode) {
        keyCode = lut[keyCode];
        return this.keys[keyCode];
    };

    /**
     * Returns true when mouse button is pressed
     *
     * @method isMouseButtonPressed
     * @param {String} mouseButton Mouse button identifier
     */
    InputAssistant.prototype.isMouseButtonPressed = function (mouseButton) {
        mouseButton = lut[mouseButton];
        return this.mouse.buttons[mouseButton];
    };

    /**
     * Returns mouse coordinates relative to client window
     *
     * @method getMousePosition
     */
    InputAssistant.prototype.getMousePosition = function () {
        return this.mouse;
    };

    // Helper function for translate mouse coordinates relative to the canvas position.
    InputAssistant.prototype.normalizeMouse = function (mouse) {
        var normalizedMouse = { x: -1, y: -1},
            canvasRect = this.canvas.getBoundingClientRect();

        normalizedMouse.x = mouse.x - canvasRect.left;
        normalizedMouse.y = mouse.y - canvasRect.top;

        return normalizedMouse;
    };

    InputAssistant.prototype.isMouseInsideQuad = function (quad, mouse) {
        var mouseQuad, normalizedMouse = this.normalizeMouse(mouse);

        if (quad.position) {
            quad.x = quad.position.x;
            quad.y = quad.position.y;
        }

        mouseQuad = { x: normalizedMouse.x, y: normalizedMouse.y, w: 1, h: 1 };
        return physicsAssistant.quadsCollision(quad, mouseQuad);
    };

    module.exports = InputAssistant;
}());

},{"./event_emitter":3,"./inherit":9,"./physics_assistant":13,"./proxy":15}],11:[function(_dereq_,module,exports){
(function () {
    "use strict";

    var Soul      = _dereq_("./soul"),
        inherit   = _dereq_("./inherit"),
        Particle;

    Particle = function (options) {
        var position = options.position || { x: 0, y: 0 };

        Soul.call(this, "Particle", position.x, position.y);

        this.color   = options.color;
        this.texture = options.texture;
    };

    inherit(Particle, Soul);

    Particle.prototype.render = function (renderAssistant) {
        var ctx = renderAssistant.getContext();

        ctx.save();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.translate(this.position.x, this.position.y);
        if (this.texture) {
            ctx.scale(this.size, this.size);
            ctx.drawImage(this.texture, 0, 0);
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
            ctx.fill();
        }
        ctx.restore();
    };

    Particle.prototype.update = function (dt) {
        var i, l;

        for (i = 0, l = this.forces.length; i < l; i += 1) {
            this.position.x += this.forces[i].x * dt;
            this.position.y += this.forces[i].y * dt;
        }

        this.life -= dt;
        if (this.life < 0) {
            this.life = 0;
        }
    };

    Particle.prototype.setLife = function (life) {
        this.maxLife = life;
        this.life = life;
    };

    Particle.prototype.setSize = function (size) {
        if (this.texture) {
            this.size = 0.5 + (size / 10);
        } else {
            this.size = size;
        }
    };

    module.exports = Particle;
}());

},{"./inherit":9,"./soul":21}],12:[function(_dereq_,module,exports){
(function () {
    "use strict";
    
    var inherit  = _dereq_("./inherit"),
        Soul     = _dereq_("./soul"),
        Particle = _dereq_("./particle"),
        QuadBody = _dereq_("./quad_body"),
        ParticleSystem;

    function valueOrDefault(value, _default) {
        if (value === null || value === undefined) {
            return _default;
        }
        return value;
    }

    function random (min, max) {
        return min + (~~(Math.random() * (max - min + 1)));
    }

    ParticleSystem = function (options) {
        var position        = valueOrDefault(options.position, { x: 0, y: 0 }),
            nParticles      = valueOrDefault(options.nParticles, 10),
            particleColor   = valueOrDefault(options.particleColor, "#ffffff"),
            particleTexture = valueOrDefault(options.particleTexture, null),
            i,
            particle;

        Soul.call(this, "ParticleSystem", position.x, position.y);

        this.particles            = [];
        this.particleRespawn      = valueOrDefault(options.particleRespawn, false);
        this.minParticleSize      = valueOrDefault(options.minParticleSize, 1);
        this.maxParticleSize      = valueOrDefault(options.maxParticleSize, 5);
        this.minParticleLifeTime  = valueOrDefault(options.minParticleLifeTime, 1);
        this.maxParticleLifeTime  = valueOrDefault(options.maxParticleLifeTime, 4);
        this.minParticleVelocityX = valueOrDefault(options.minParticleVelocityX, -50);
        this.maxParticleVelocityX = valueOrDefault(options.maxParticleVelocityX, 50);
        this.minParticleVelocityY = valueOrDefault(options.minParticleVelocityY, -50);
        this.maxParticleVelocityY = valueOrDefault(options.maxParticleVelocityY, 50);
        this.particleForces       = valueOrDefault(options.particleForces, []);

        this.setBody(new QuadBody(0, 0, 0, 0, "particles"));

        for (i = 0; i < nParticles; i += 1) {
            particle = new Particle({
                color: particleColor,
                texture: particleTexture
            });
            this.setParticleState(particle);
            this.particles.push(particle);
        }
    };
    inherit(ParticleSystem, Soul);

    ParticleSystem.prototype.render = function (renderAssistant) {
        var i, l;

        for (i = 0, l = this.particles.length; i < l; i += 1) {
            this.particles[i].render(renderAssistant);
        }
    };

    ParticleSystem.prototype.update = function (dt) {
        var i, l, deadParticles = [];

        for (i = 0, l = this.particles.length; i < l; i += 1) {
            this.particles[i].update(dt);

            if (this.particles[i].life <= 0) {
                if (this.particleRespawn) {
                    this.setParticleState(this.particles[i]);
                } else {
                    deadParticles.push(i);
                }
            }
        }

        for (i = 0, l = deadParticles.length; i < l; i += 1) {
            this.particles.splice(deadParticles[i], 1);
        }

        if (this.particles.length === 0) {
            this.remove = true;
        }
    };

    ParticleSystem.prototype.setParticleState = function (particle) {
        particle.position = { x: this.position.x, y: this.position.y };
        particle.setSize(random(this.minParticleSize, this.maxParticleSize));
        particle.setLife(random(this.minParticleLifeTime, this.maxParticleLifeTime));
        particle.forces =  [
            { 
                x: random(this.minParticleVelocityX, this.maxParticleVelocityX), 
                y: random(this.minParticleVelocityY, this.maxParticleVelocityY)
            }
        ].concat(this.particleForces);
    };

    module.exports = ParticleSystem;
}());

},{"./inherit":9,"./particle":11,"./quad_body":16,"./soul":21}],13:[function(_dereq_,module,exports){
(function () {
    "use strict";

    var CircleBody = _dereq_("./circle_body"),
        QuadBody   = _dereq_("./quad_body");

    /**
     * Checks for a collision between two quads
     *
     * @method quadsCollision
     * @param {Object} quad_1 Quad-like object 
     * @param {Object} quad_2 Quad-like object 
     */
    function quadsCollision(quad_1, quad_2) {
        var x1_1, y1_1, x1_2, y1_2,
            x2_1, y2_1, x2_2, y2_2;

        // alias width and height
        if (!quad_1.w) {
            quad_1.w = quad_1.width;
            quad_1.h = quad_1.height;
        }
        if (!quad_2.w) {
            quad_2.w = quad_2.width;
            quad_2.h = quad_2.height;
        }

        x1_1 = quad_1.x;
        y1_1 = quad_1.y;
        x2_1 = quad_1.x + quad_1.w;
        y2_1 = quad_1.y + quad_1.h;
        x1_2 = quad_2.x;
        y1_2 = quad_2.y;
        x2_2 = quad_2.x + quad_2.w;
        y2_2 = quad_2.y + quad_2.h;

        return (x1_1 < x2_2) && (x2_1 > x1_2) && (y1_1 < y2_2) && (y2_1 > y1_2);
    }

    /**
     * Checks for a collision between two circles, using
     * center distance compared to the radius sum.
     *
     * @method circlesCollision
     * @param {Object} circle_1 Circle-like object
     * @param {Object} circle_2 Circle-like object
     */
    function circlesCollision(circle_1, circle_2) {
        var dist;

        dist = Math.sqrt(Math.pow(circle_1.x - circle_2.x, 2) +
                Math.pow(circle_1.y - circle_2.y, 2));

        return dist < (circle_1.r + circle_2.r);
    }

    /**
     * Checks for a collision between a circle and a quad
     * Source: http://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection
     *
     * @method circleQuadCollision
     * @param {Object} circle Circle-like object
     * @param {Object} quad Quad-like object
     */
    function circleQuadCollision(circle, quad) {
        var dist, cornerDist;
        // Set quad x and y to the center
        quad.x = quad.x + quad.w / 2;
        quad.y = quad.y - quad.h / 2;

        // Compute distances
        dist = {
            x: Math.abs(circle.x - quad.x),
            y: Math.abs(circle.y - quad.y)
        };
        cornerDist = Math.pow(dist.x - quad.w / 2, 2) + Math.pow(dist.y - quad.h / 2, 2);

        // Restore quad x and y to the top left corner
        quad.x = quad.x - quad.w / 2;
        quad.y = quad.y + quad.h / 2;

        if ((dist.x > (quad.w / 2 + circle.r)) || (dist.y > (quad.h / 2 + circle.r))) {
            return false;
        }
        if ((dist.x <= (quad.w / 2)) || (dist.y <= (quad.h / 2))) {
            return true;
        }

        return (cornerDist <= (Math.pow(circle.r, 2)));
    }

    /**
     * Checks for a collision between two souls based on their body
     *
     * @method soulsCollision
     * @param {Object} soul1
     * @param {Object} soul2
     */
    function soulsCollision(soul1, soul2) {
        if (soul1 === undefined || soul2 === undefined) {
            return false;
        }
        var body1 = soul1.getBody(),
            body2 = soul2.getBody(),
            result = false;

        // If any body is null return false because the collision
        // is impossible.
        if (body1 === null || body2 === null) {
            return false;
        }

        // Set temporary position for bodies
        body1.x += soul1.getPosition().x;
        body1.y += soul1.getPosition().y;
        body2.x += soul2.getPosition().x;
        body2.y += soul2.getPosition().y;

        // alias width and height
        if (!body1.w) {
            body1.w = body1.width;
            body1.h = body1.height;
        }
        if (!body2.w) {
            body2.w = body2.width;
            body2.h = body2.height;
        }

        if (body1 instanceof CircleBody) {
            if (body2 instanceof CircleBody) {
                result = circlesCollision(body1, body2);
            } else if (body2 instanceof QuadBody) {
                result = circleQuadCollision(body1, body2);
            } else {
                throw "TypeError";
            }
        } else if (body1 instanceof QuadBody) {
            if (body2 instanceof CircleBody) {
                result = circleQuadCollision(body2, body1);
            } else if (body2 instanceof QuadBody) {
                result = quadsCollision(body1, body2);
            } else {
                throw "TypeError";
            }
        }

        // Restore body position
        body1.x -= soul1.getPosition().x;
        body1.y -= soul1.getPosition().y;
        body2.x -= soul2.getPosition().x;
        body2.y -= soul2.getPosition().y;

        return result;
    }

    module.exports = {
        quadsCollision: quadsCollision,
        circlesCollision: circlesCollision,
        circleQuadCollision: circleQuadCollision,
        soulsCollision: soulsCollision
    };
}());

},{"./circle_body":2,"./quad_body":16}],14:[function(_dereq_,module,exports){
(function () {
    "use strict";

    var pluginsConfig = {};

    function loadPlugins (plugins) {
        var pluginId;

        for (pluginId in plugins) {
            if (plugins.hasOwnProperty(pluginId)) {
                pluginsConfig[pluginId] = JSON.parse(plugins[pluginId]);
            }
        }
    }

    function getConfig (pluginId) {
        return pluginsConfig[pluginId];
    }

    module.exports = {
        loadPlugins: loadPlugins,
        getConfig: getConfig
    };
}());

},{}],15:[function(_dereq_,module,exports){
(function () {
    "use strict";

    module.exports = function (object, method) {
        return function () {
            method.apply(object, arguments);
        };
    };
}());

},{}],16:[function(_dereq_,module,exports){
(function () {
    "use strict";

    var QuadBody = function (x, y, w, h, collisionGroup) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.collisionGroup = collisionGroup;
    };

    module.exports = QuadBody;
}());

},{}],17:[function(_dereq_,module,exports){
(function () {
    "use strict";

    var inherit          = _dereq_("./inherit"),
        proxy            = _dereq_("./proxy"),
        EventEmitter     = _dereq_("./event_emitter"),
        RenderAssistant;

    RenderAssistant = function (container, canvas) {
        EventEmitter.call(this);
        this.container = container;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        $(window).on('resize', proxy(this, this.onResize));
        this.onResize();
    };
    inherit(RenderAssistant, EventEmitter);

    RenderAssistant.prototype.onResize = function () {
        this.canvas.width = parseInt(this.container.css("width"), 10);
        this.canvas.height = parseInt(this.container.css("height"), 10);
        this.broadcast("canvas:resized", this.canvas);
    };

    /**
     * Returns the working canvas bounding client rect.
     *
     * @method getCanvasRect
     */
    RenderAssistant.prototype.getCanvasRect = function () {
        var canvasRect = this.canvas.getBoundingClientRect(),
            rect       = {
                left   : canvasRect.left,
                top    : canvasRect.top,
                width  : canvasRect.width,
                height : canvasRect.height
            };

        // Normalize canvas rect using real dimensions
        rect.left += rect.width - rect.width;
        rect.top  += rect.height - rect.height;

        return rect;
    };

    /**
     * Returns the working canvas context
     *
     * @method getContext
     */
    RenderAssistant.prototype.getContext = function () {
        return this.ctx;
    };

    /**
     * Clear canvas deleting its content.
     *
     * @method clear
     */
    RenderAssistant.prototype.clear = function () {
        var width = this.canvas.width;
        this.canvas.width = width;
    };

    /**
     * Draw a line from origin to dest.
     *
     * @method drawLine
     * @param {Number} ox Origin on the x-axis
     * @param {Number} oy Origin on the y-axis
     * @param {Number} dx Destination on the x-axis
     * @param {Number} dy Destination on the y-axis
     * @param {String} strokeStyle Identifier of the style to stroke polygon
     */
    RenderAssistant.prototype.drawLine = function (ox, oy, dx, dy, strokeStyle) {
        this.ctx.save();
        if (strokeStyle !== undefined) {
            this.ctx.strokeStyle = strokeStyle;
        }
        this.ctx.beginPath();
        this.ctx.moveTo(ox, oy);
        this.ctx.lineTo(dx, dy);
        this.ctx.stroke();
        this.ctx.restore();
    };

    /**
     * Draw a quad to the specific position given dimensions.
     *
     * @method drawQuad
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     * @param {Number} w Quad's width
     * @param {Number} h Quad's height
     * @param {String} fillStyle Identifier of the style to fill polygon
     */
    RenderAssistant.prototype.drawQuad = function (x, y, w, h, fillStyle, strokeStyle) {
        this.ctx.save();
        if (fillStyle !== undefined) {
            this.ctx.fillStyle = fillStyle;
            this.ctx.fillRect(x, y, w, h);
        }
        if (strokeStyle !== undefined) {
            this.ctx.strokeStyle = strokeStyle;
            this.ctx.strokeRect(x, y, w, h);
        }
        this.ctx.restore();
    };

    /**
     * Draw a circle with center at the position and radius given.
     *
     * @method drawCircle
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     * @param {Number} r Circle's radius
     * @param {String} fillStyle Identifier of the style to fill polygon
     */
    RenderAssistant.prototype.drawCircle = function (x, y, r, fillStyle) {
        this.ctx.save();
        if (fillStyle !== undefined) {
            this.ctx.fillStyle = fillStyle;
        }
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.restore();
    };

    /**
     * Draw text to the specific position.
     *
     * @method drawText
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     * @param {String} text Text to be displayed
     * @param {Object} options Object representing fill style and
     * font attributes.
     */
    RenderAssistant.prototype.drawText = function (x, y, text, options) {
        this.ctx.save();
        if (options && options.font !== undefined) {
            this.ctx.font = options.font;
        }
        if (options && options.fillStyle !== undefined) {
            this.ctx.fillStyle = options.fillStyle;
        }
        this.ctx.fillText(text, x, y);
        this.ctx.restore();
    };

    /**
     * Draws image to the specific position.
     *
     * @method drawImage
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     * @param {Object} image Image to be drawing
     */
    RenderAssistant.prototype.drawImage = function (x, y, image, width, height) {
        width = width === undefined ? image.width : width;
        height = height === undefined ? image.height : height;
        this.ctx.drawImage(image, x, y, width, height);
    };

    /**
     * Draws image contained on another image to the specific position.
     *
     * @method drawSubImage
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     * @param {Object} image Image to be drawing
     * @param {Number} frameId Index of the frame to be drawn
     * @param {Number} frameWidth Width of a frame in pixels
     * @param {Number} frameHeight Height of a frame in pixels
     */
    RenderAssistant.prototype.drawSubImage = function (x, y, image, frameId, frameWidth, frameHeight, width, height) {
        var sx,
            sy,
            rows,
            cols;

        cols = (image.width / frameWidth);
        rows = (image.height / frameHeight);

        sx = (frameId % cols) * frameWidth;
        sy = Math.floor(frameId / cols) * frameHeight;

        this.ctx.drawImage(image, sx, sy, frameWidth, frameHeight, x, y, width, height);
    };

    RenderAssistant.prototype.setOptions = function (options) {
        options = options || { mobile: false };
        this.mobile = options.mobile;
    };

    module.exports = RenderAssistant;
}());

},{"./event_emitter":3,"./inherit":9,"./proxy":15}],18:[function(_dereq_,module,exports){
(function () {
    "use strict";

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        }());
    }

    module.exports = function (callback) {
        window.requestAnimationFrame(callback);
    };
}());

},{}],19:[function(_dereq_,module,exports){
(function () {
    "use strict";

    var settings     = {},
        imagesToLoad = 0,
        imagesLoaded = 0,
        soundsToLoad = 0,
        soundsLoaded = 0,
        images       = {},
        sounds       = {},
        files        = {},
        Scene        = _dereq_("./scene");

    /**
     * Load an image and store it for a further usage.
     * A callback is called when the image is ready.
     *
     * @method loadImage
     * @param {String} path Image's path 
     * @param {Function} callback Function to be called when the 
     * imageresource is loaded.
     */
    function loadImage(path, callback) {
        var image = new window.Image();

        image.src = path;
        $(image).on("load", function () {
            callback(image);
        });
    }

    /**
     * Load an sound and store it for a further usage.
     * A callback is called when the sound is ready.
     *
     * @method loadSound
     * @param {String} path Sound's path 
     * @param {Function} callback Function to be called when the 
     * sound resource is loaded.
     */
    function loadSound(path, callback) {
        var sound = new window.Audio();

        sound.src = path;
        sound.type = "audio/mpeg";
        sound.load();
        $(sound).on("loadedmetadata", function () {
            callback(sound);
        });
    }

    /**
     * TODO
     */
    function loadAssets(object) {
        var prop,
            imageLoadedCallback = function (object, prop) {
                return function (image) {
                    imagesLoaded += 1;
                    images[prop] = image;
                };
            },
            soundLoadedCallback = function (object, prop) {
                return function (sound) {
                    soundsLoaded += 1;
                    sounds[prop] = sound;
                };
            };

        for (prop in object) {
            if (object.hasOwnProperty(prop)) {
                switch(object[prop].type) {
                    case "image":
                        imagesToLoad += 1;
                        loadImage(object[prop].url, imageLoadedCallback(object, prop));
                        break;
                    case "sound":
                        soundsToLoad += 1;
                        loadSound(object[prop].url, soundLoadedCallback(object, prop));
                        break;
                    default:
                        files[prop] = object[prop].url;
                        break;
                }
            }
        }
    }

    /**
     * TODO
     */
    function loadSettings(game, value, callback) {
        //console.log("Start load settings...");
        var loadingAssetsInterval,
            loadingAssetsCallback = function () {
                //console.log("Loading assets: " + imagesLoaded + "/" + imagesToLoad + " images and " + soundsLoaded + "/" + soundsToLoad + " sounds...");
                game.broadcast("loading_progress", ((imagesLoaded + soundsLoaded) / (imagesToLoad + soundsToLoad)) * 100);
                if (imagesToLoad === imagesLoaded && soundsToLoad === soundsLoaded) {
                    clearInterval(loadingAssetsInterval);
                    callback();
                }
            };

        if (typeof value === 'string') {
            settings = JSON.parse(value);
        } else {
            settings = value;
        }

        loadAssets(settings.assets);
        loadingAssetsInterval = setInterval(loadingAssetsCallback, 500);
    }

    function loadComponents(game, viewId, components) {
        var component, i, l;

        for (i = 0, l = components.length; i < l; i += 1) {
            component = components[i];
            game.gui.addElement(component.type, viewId, component);
        }
    }

    function loadTransitions(game, viewId, transitions) {
        var transition;

        function makeTransition(game, viewId, transition) {
            return function () {
                setTimeout(function () {
                    if (game.activeScene === viewId) {
                        game.setActiveScene(transition.scene);
                    }
                }, transition.delay || 0);
            };
        }

        for (transition in transitions) {
            if (transitions.hasOwnProperty(transition)) {
                game.on(transition, makeTransition(game, viewId, transitions[transition]));
            }
        }
    }

    /**
     * TODO
     */
    function loadGUI(game, callback) {
        var i, l, view;

        for (i = 0, l = settings.gui.length; i < l; i += 1) {
            view = settings.gui[i];

            game.addScene(view.name, new Scene(game));
            loadComponents(game, view.name, view.components);
            loadTransitions(game, view.name, view.transitions);
        }

        callback();
    }

    /**
     * TODO
     */
    function getData(name) {
        return settings.data[name];
    }

    function getImage(name) {
        return images[name];
    }

    function getSound(name) {
        return sounds[name];
    }

    function getFile(name) {
        return files[name];
    }

    module.exports = {
        loadSettings: loadSettings,
        loadGUI: loadGUI,
        getData: getData,
        getImage: getImage,
        getSound: getSound,
        getFile: getFile
    };
}());

},{"./scene":20}],20:[function(_dereq_,module,exports){
(function () {
    "use strict";

    var physicsAssistant = _dereq_("./physics_assistant"),
        inherit          = _dereq_("./inherit"),
        EventEmitter     = _dereq_("./event_emitter"),
        Soul             = _dereq_("./soul"),
        QuadBody         = _dereq_("./quad_body"),
        Scene;

    /**
     * Constructor
     */
    Scene = function (game) {
        EventEmitter.call(this);
        this.game = game;
        this.souls = [];
    };

    // inherit EventEmitter for register and trigger custom events.
    inherit(Scene, EventEmitter);

    /**
     * TODO:
     *
     * @method init
     */
    Scene.prototype.init = function () {
        
    };

    /**
     * TODO:
     *
     * @method enter
     */
    Scene.prototype.enter = function () {
        
    };

    /**
     * TODO:
     *
     * @method exit
     */
    Scene.prototype.exit = function () {
        
    };

    /**
     * Add Soul for being processed by the game.
     *
     * @method addSoul
     * @param {Object} soul Soul to be added on the game loop.
     */
    Scene.prototype.addSoul = function (soul) {
        this.souls.push(soul);
    };

    /**
     * Update souls and check collisions between them.
     *
     * @method update
     */
    Scene.prototype.update = function (dt) {
        var i, l, j, ll, soul1, soul2;

        // Update all souls
        for (i = 0, l = this.souls.length; i < l; i += 1) {
            if (this.souls[i].remove) {
                this.souls.splice(i, 1);
                i -= 1;
                break;
            }
            this.souls[i].updateOrder = i;
            this.souls[i].update(dt);
        }

        // Check souls collisions
        for (i = 0, l = this.souls.length; i < l; i += 1) {
            if (this.souls[i] && this.souls[i].checkCollision) {
                for (j = 0, ll = this.souls.length; j < ll; j += 1) {
                    soul1 = this.souls[i];
                    soul2 = this.souls[j];

                    // Check for souls collision
                    // 
                    // If souls collide custom events are triggered based on souls name.
                    if (soul1 !== soul2) {
                        if (physicsAssistant.soulsCollision(soul1, soul2)) {
                            // Trigger event for name - name
                            this.trigger("collision_" + soul1.getName() + "_" + soul2.getName(), soul1, soul2);

                            // Trigger event for name - group
                            if (soul2.getBody().collisionGroup !== undefined) {
                                this.trigger("collision_" + soul1.getName() + "_" + soul2.getBody().collisionGroup, soul1, soul2);

                                // Trigger event for group - group
                                if (soul1.getBody().collisionGroup !== undefined) {
                                    this.trigger("collision_" + soul1.getBody().collisionGroup + "_" + soul2.getBody().collisionGroup, soul1, soul2);
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    /**
     * TODO:
     *
     * @method afterUpdate
     */
    Scene.prototype.afterUpdate = function () {
        
    };

    /**
     * TODO: 
     * Render map, souls and GUI in strict order. Use requestAnimationFrame for better
     * performance.
     *
     * @method render
     */
    Scene.prototype.render = function render(renderAssistant) {
        var i, l;

        // Clear the canvas
        renderAssistant.clear();

        // Render the map
        //map.render();

        // Render all souls
        for (i = 0, l = this.souls.length; i < l; i += 1) {
            this.souls[i].renderOrder = i;
            this.souls[i].render(renderAssistant);
        }

        // Render GUI
        //gui.render();
    };

    /**
     * TODO:
     *
     * @method afterUpdate
     */
    Scene.prototype.afterRender = function () {
        
    };

    /**
     * TODO:
     *
     */
    Scene.prototype.removeSoulsByGroup = function (group) {
        var i, l;

        for (i = 0, l = this.souls.length; i < l; i += 1) {
            if (this.souls[i] && this.souls[i].getBody() && this.souls[i].getBody().collisionGroup === group) {
                this.souls.splice(i, 1);
                i -= 1;
            }
        }
    };

    /**
     * TODO:
     *
     */
    Scene.prototype.removeSoulsByName = function (name) {
        var i, l;

        for (i = 0, l = this.souls.length; i < l; i += 1) {
            if (this.souls[i] && this.souls[i].name === name) {
                this.souls.splice(i, 1);
                i -= 1;
                break;
            }
        }
    };


    Scene.prototype.checkCollisionSoulMouse = function (mouse, onCollision, onNoCollision) {
        var i, l, mouseSoul;

        mouseSoul = new Soul("mouse", mouse.x, mouse.y);
        mouseSoul.setBody(new QuadBody(0, 0, 1, 1));

        for (i = 0, l = this.souls.length; i < l; i += 1) {
            if (physicsAssistant.soulsCollision(mouseSoul, this.souls[i])) {
                onCollision(this.souls[i]);
            } else {
                if (onNoCollision) {
                    onNoCollision(this.souls[i]);
                }
            }
        }
    };

    /**
     * TODO:
     *
     */
    Scene.prototype.onMouseDown = function (mouse) {
        this.checkCollisionSoulMouse(mouse, function (soul) {
            soul.emit("click", mouse);
            soul.emit("mousedown", mouse);
        });
        this.emit("mousedown", mouse);
    };

    Scene.prototype.onMouseMove = function (mouse) {
        this.checkCollisionSoulMouse(mouse, function (soul) {
            soul.emit("mousemove", mouse);
            if (!soul.mousein) {
                soul.emit("mousein", mouse);
                soul.mousein = true;
            }
        }, function (soul) {
            if (soul.mousein) {
                soul.emit("mouseout", mouse);
                soul.mousein = false;
            }
        });
        this.emit("mousemove", mouse);
    };

    Scene.prototype.onMouseUp = function (mouse) {
        this.checkCollisionSoulMouse(mouse, function (soul) {
            soul.emit("mouseup", mouse);
        });
        this.emit("mouseup", mouse);
    };

    module.exports = Scene;
}());

},{"./event_emitter":3,"./inherit":9,"./physics_assistant":13,"./quad_body":16,"./soul":21}],21:[function(_dereq_,module,exports){
(function () {
    "use strict";

    var inherit      = _dereq_("./inherit"),
        EventEmitter = _dereq_("./event_emitter"),
        Soul;


    /**
     * Initialize name and position.
     *
     * @method Soul
     * @param {String} name Soul's identifier in game
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     */
    Soul = function (name, x, y) {
        EventEmitter.call(this);
        this.name = name;
        this.position = { x: x, y: y };
        this.velocity = { x: 0, y: 0 };
        this.body = null;
        this.collisionMap = null;
        this.checkCollision = true;
        this.remove = false;
    };

    // inherit EventEmitter for register and trigger custom events.
    inherit(Soul, EventEmitter);

    /**
     * Sets the soul position.
     *
     * @method setPosition
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     */
    Soul.prototype.setPosition = function (x, y) {
        this.position.x = x;
        this.position.y = y;
    };

    /**
     * Return the position vector
     * 
     * @method getPosition
     * @return The position of the soul
     */
    Soul.prototype.getPosition = function () {
        return this.position;
    };

    /**
     * Set the soul velocity given x and y
     *
     * @method setVelocity
     * @param {Number} x Velocity on the x-axis
     * @param {Number} y Velocity on the y-axis
     */
    Soul.prototype.setVelocity = function (x, y) {
        this.velocity.x = x;
        this.velocity.y = y;
    };

    /**
     * Return the velocity vector
     *
     * @method getVelocity
     * @return The velocity of the soul
     */
    Soul.prototype.getVelocity = function () {
        return this.velocity;
    };

    /**
     * Add vector to velocity vector
     *
     * @method addVelocity
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     */
    Soul.prototype.addVelocity = function (x, y) {
        this.velocity.y += x;
        this.velocity.y += y;
    };

    /**
     * Set the soul body for checking collisions.
     * 
     * @method setBody
     * @param {Object} body
     */
    Soul.prototype.setBody = function (body) {
        this.body = body;
    };

    /**
     * Return the soul body
     *
     * @method getBody
     * @return The soul body
     */
    Soul.prototype.getBody = function () {
        return this.body;
    };

    /**
     * Return the soul name
     *
     * @method getName
     * @return The soul name
     */
    Soul.prototype.getName = function () {
        return this.name;
    };

    /**
     * Set map to check collision against it.
     *
     * @method setCollisionMap
     * @param {CollisionMap} map
     */
    Soul.prototype.setCollisionMap = function (map) {
        this.collisionMap = map;
    };

    /**
     * Update the soul position based on current velocity.
     * Check collision against collision map and restore
     * position if collides.
     *
     * @method update
     * @param {Number} dt Milliseconds passed since last update
     */
    Soul.prototype.update = function (dt) {
        var x, y, collision;

        x = this.position.x + this.velocity.x * dt;
        y = this.position.y + this.velocity.y * dt;

        // Check collision against map if needed
        if (this.checkCollision && this.body !== null && this.collisionMap !== null) {
            collision = this.collisionMap.checkCollision(this);
            // Restore position if collision
            if (collision.x) {
                x = Math.round(this.position.x);
                if (this.velocity.x > 0) {
                    x -= x % 20;
                }
            }
            if (collision.y) {
                y = Math.round(this.position.y);
                y -= y % 20;
            }
        }

        this.position.x = x;
        this.position.y = y;
    };

    /**
     * Mark soul to be destroyed on the next loop.
     *
     * @method destroy
     */
    Soul.prototype.destroy = function () {
        this.remove = true;
    };

    module.exports = Soul;
}());

},{"./event_emitter":3,"./inherit":9}],22:[function(_dereq_,module,exports){
(function () {
    "use strict";

    var resourceAssistant = _dereq_("./resource_assistant"),
        enabled           = false,
        muted             = false,
        backgroundMusic   = null;

    function setBackgroundMusic(music) {
        if (music) {
            backgroundMusic = resourceAssistant.getSound(music);
            backgroundMusic.volume = 0.5;
            backgroundMusic.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
        }
    }

    function playBackgroundMusic() {
        if (backgroundMusic) {
            backgroundMusic.firstTime = true;
            if (!muted && enabled) {
                backgroundMusic.play();
            }
        }
    }

    function stopBackgroundMusic() {
        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }
    }

    function toggleBackgroundMusic() {
        if (backgroundMusic && backgroundMusic.firstTime) {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
            } else {
                backgroundMusic.pause();
            }
        }
    }

    function playSoundEffect(soundEffect) {
        if (soundEffect && !muted && enabled) {
            resourceAssistant.getSound(soundEffect).play();
        }
    }

    function setEnabled (e) {
        enabled = e;
        if (enabled) {
            $('.audio-controls').show();
            $('.audio-controls').on('click', function () {
                toggleMute();
            });
        }
    }

    function toggleMute () {
        muted = !muted;
        $('.audio-controls .mute').toggle();
        $('.audio-controls .button').toggle();
        toggleBackgroundMusic();
    }

    function setMuted (_muted) {
        muted = _muted;
        if (muted) {
            $('.audio-controls .mute').show();
            $('.audio-controls .button').hide();
        }
    }

    module.exports = {
        setBackgroundMusic: setBackgroundMusic,
        playBackgroundMusic: playBackgroundMusic,
        stopBackgroundMusic: stopBackgroundMusic,
        toggleBackgroundMusic: toggleBackgroundMusic,
        playSoundEffect: playSoundEffect,
        setEnabled: setEnabled, 
        toggleMute: toggleMute,
        setMuted: setMuted
    };
}());

},{"./resource_assistant":19}],23:[function(_dereq_,module,exports){
(function () {
    "use strict";

    var Soul    = _dereq_("./soul"),
        inherit = _dereq_("./inherit"),
        Sprite;

    Sprite = function (name, x, y, texture) {
        Soul.call(this, name, x, y);
        this.texture = texture;
        this.width = this.texture.width;
        this.height = this.texture.height;
        this.rotation = 0;
        this.animations = {};
        this.currentAnimation = null;
        this.currentAnimationIndex = 0;
        this.lastAnimationUpdate = new Date();
    };

    // Sprite inherit from Soul
    inherit(Sprite, Soul);

    Sprite.prototype.setCurrentAnimation = function (animationId) {
        this.currentAnimation = animationId;
    };

    Sprite.prototype.addFrame = function (animationId, frameId, time) {
        this.animations[animationId] = this.animations[animationId] || [];
        this.animations[animationId].push({ frame: frameId, time: time });
    };

    Sprite.prototype.render = function (renderAssistant) {
        var ctx = renderAssistant.getContext(),
            currentFrame;

        ctx.save();
        ctx.translate(this.position.x, this.position.y);

        ctx.translate(this.width / 2, this.height / 2);
        ctx.rotate(this.rotation * (Math.PI / 180));
        ctx.scale(this.scale, this.scale);
        ctx.translate(-this.width / 2, -this.height / 2);

        if (this.currentAnimation !== null && this.animations[this.currentAnimation].length > 0) {
            currentFrame = this.animations[this.currentAnimation][this.currentAnimationIndex];
            renderAssistant.drawSubImage(0, 0, this.texture, currentFrame.frame, this.width, this.height);
        } else {
            renderAssistant.drawImage(0, 0, this.texture, this.width, this.height);
        }

        ctx.restore();
    };

    Sprite.prototype.update = function (dt) {
        var now = new Date(),
            currentFrame,
            animationDt;

        // Call base object update
        Soul.prototype.update.call(this, dt);

        if (this.currentAnimation !== null && this.animations[this.currentAnimation].length > 0) {
            currentFrame = this.animations[this.currentAnimation][this.currentAnimationIndex];
            animationDt = new Date(now.getTime() - this.lastAnimationUpdate.getTime()).getMilliseconds() / 1000;

            if (animationDt > currentFrame.time) {
                this.currentAnimationIndex = (this.currentAnimationIndex + 1) % this.animations[this.currentAnimation].length;
                this.lastAnimationUpdate = now;
            }
        }
    };

    module.exports = Sprite;
}());

},{"./inherit":9,"./soul":21}]},{},[6])
(6)
});