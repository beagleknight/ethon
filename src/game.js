/*jslint browser: true*/
/*global define*/

/**
 * Core class for all games developed using Ethon engine.
 *
 * @class Game
 * @requires request_animation_frame
 * @requires proxy
 * @requires extend
 * @requires event_emitter
 * @requires render_assistant
 * @requires map
 * @requires gui
 */
define(function (require) {
    "use strict";

    var requestAnimationFrame = require("ethon/request_animation_frame"),
        proxy                 = require("ethon/proxy"),
        inherit               = require("ethon/inherit"),
        EventEmitter          = require("ethon/event_emitter"),
        RenderAssistant       = require("ethon/render_assistant"),
        InputAssistant        = require("ethon/input_assistant"),
        ActionDispatcher      = require("ethon/action_dispatcher"),
        resourceAssistant     = require("ethon/resource_assistant"),
        GUI                   = require("ethon/gui"),
        elapsedTime           = new Date(),
        lastUpdate            = new Date(),
        numFrames             = 0,
        fps                   = 60,
        showFPS,
        Game;

    /**
     * Constructor
     *
     * It initialize render_assistant with given canvas.
     *
     * @method Game
     * @param {Object} canvas Canvas object where the game will be rendered.
     * @param {Object} guiElement HTML element where the gui will be rendered.
     * @param {Number} width Canvas width
     * @param {Number} height Canvas height
     * @param {Object} options An options object used for configuration.
     */
    Game = function (canvas, guiElement, width, height, options) {
        var canvasRect;

        EventEmitter.call(this);
        options = options || { showFPS: false };

        this.renderAssistant = new RenderAssistant(canvas, width, height);
        this.inputAssistant = new InputAssistant(canvas);
        this.actionDispatcher = new ActionDispatcher(this.inputAssistant);
        this.guiElement = guiElement;

        this.gui = new GUI(this.guiElement);
        this.scenes = {};
        this.activeScene = null;
        this.gameLoaded = false;

        showFPS = options.showFPS;

        canvasRect = this.renderAssistant.getCanvasRect();
        this.actionDispatcher.registerMouseClickAction("MOUSE_LEFT", {
            x: 0,
            y: 0,
            w: canvasRect.width,
            h: canvasRect.height
        }, proxy(this, this.onMouseDown));

        this.actionDispatcher.registerMouseMotionAction({
            x: 0,
            y: 0,
            w: canvasRect.width,
            h: canvasRect.height
        }, proxy(this, this.onMouseMove));

        this.actionDispatcher.registerMouseReleaseAction("MOUSE_LEFT", {
            x: 0,
            y: 0,
            w: canvasRect.width,
            h: canvasRect.height
        }, proxy(this, this.onMouseUp));
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

    /**
     * TODO:
     * @method addScene
     */
    Game.prototype.addScene = function (name, scene) {
        this.scenes[name] = scene;
        this.gui.addView(name);

        if (this.activeScene === null && name !== "loading" && name !== "all") {
            this.setActiveScene(name);
        }
    };

    /**
     * Execute a update-render cycle
     *
     * @method loop
     */
    Game.prototype.loop = function () {
        this.update();
        this.render();
        updateFPS();
        requestAnimationFrame(proxy(this, this.loop));
    };

    /**
     * TODO:
     * Update souls and check collisions between them.
     *
     * @method update
     */
    Game.prototype.update = function () {
        var now           = new Date(),
            dt            = new Date(now.getTime() - elapsedTime.getTime()).getMilliseconds() / 1000;

        this.scenes[this.activeScene].update(dt);
        this.scenes[this.activeScene].afterUpdate(dt);
        elapsedTime = now;
    };

    /**
     * TODO: 
     * Render map, souls and GUI in strict order. Use requestAnimationFrame for better
     * performance.
     *
     * @method render
     */
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
        resourceAssistant.loadSettings(this, settings, proxy(this, function () {
            this.gui.getElement("loading", "loading").hide();
            resourceAssistant.loadGUI(this, proxy(this, function () {
                this.broadcast("game_loaded");
                var sceneId;
                for (sceneId in this.scenes) {
                    if (this.scenes.hasOwnProperty(sceneId)) {
                        this.scenes[sceneId].init();
                    }
                }
                this.gui.showView('all');
                requestAnimationFrame(proxy(this, this.loop));
            }));
        }));
    };

    /**
     * Set active scene for render and update cycle
     *
     * @method setActiveScene
     * @param {String} scene Scene's identifier
     */
    Game.prototype.setActiveScene = function (sceneId) {
        // Exit current scene
        if (this.activeScene !== null) {
            this.scenes[this.activeScene].exit();
            this.broadcast("exit_scene_" + this.activeScene);
        }
        // Set active scene
        this.activeScene = sceneId;
        this.gui.setActiveView(sceneId);
        // Enter current scene
        this.broadcast("enter_scene_" + sceneId);
        this.scenes[this.activeScene].enter();
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

    return Game;
});
