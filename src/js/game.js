(function () {
    "use strict";

    var requestAnimationFrame = require("./request_animation_frame"),
        proxy                 = require("./proxy"),
        inherit               = require("./inherit"),
        EventEmitter          = require("./event_emitter"),
        RenderAssistant       = require("./render_assistant"),
        InputAssistant        = require("./input_assistant"),
        ActionDispatcher      = require("./action_dispatcher"),
        resourceAssistant     = require("./resource_assistant"),
        pluginsAssistant      = require("./plugins_assistant"),
        GUI                   = require("./gui"),
        elapsedTime           = new Date(),
        lastUpdate            = new Date(),
        numFrames             = 0,
        fps                   = 60,
        showFPS,
        Game;

    function isHidden() {
        var prop = getHiddenProp();
        if (!prop) {
            return false;
        }

        return document[prop];
    }

    function getHiddenProp(){
        var prefixes = ['webkit','moz','ms','o'];

        // if 'hidden' is natively supported just return it
        if ('hidden' in document) {
            return 'hidden';
        }

        // otherwise loop over all the known prefixes until we find one
        for (var i = 0; i < prefixes.length; i++){
            if ((prefixes[i] + 'Hidden') in document)  {
                return prefixes[i] + 'Hidden';
            }
        }

        // otherwise it's not supported
        return null;
    }

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
        this.paused = false;

        showFPS = options.showFPS;

        canvasRect = this.renderAssistant.getCanvasRect();
        this.actionDispatcher.registerMouseClickAction("MOUSE_LEFT", proxy(this, this.onMouseDown));
        this.actionDispatcher.registerMouseMotionAction(proxy(this, this.onMouseMove));
        this.actionDispatcher.registerMouseReleaseAction("MOUSE_LEFT", proxy(this, this.onMouseUp));

        $(window).on("blur", proxy(this, this.pause));
        $(window).on("focus", proxy(this, this.resume));
        
        var visProp = getHiddenProp();
        if (visProp) {
            var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
            document.addEventListener(evtname, proxy(this, function () {
                var txtFld = document.getElementById('gui');

                if (txtFld) {
                    if (isHidden()) {
                        this.pause();
                    }
                }
            }));
        }
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
        if (!this.paused) {
            this.update();
        }
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

    Game.prototype.pause = function () {
        if (this.gui.activeView === 'main') {
            $('#paused').show();
            this.paused = true;
        }
    };

    Game.prototype.resume = function () {
        $('#paused').hide();
        this.paused = false;
    };

    module.exports = Game;
}());
