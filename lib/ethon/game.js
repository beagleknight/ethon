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
        extend                = require("ethon/extend"),
        eventEmitter          = require("ethon/event_emitter"),
        renderAssistant       = require("ethon/render_assistant"),
        inputAssistant        = require("ethon/input_assistant"),
        resourceAssistant     = require("ethon/resource_assistant"),
        GUI                   = require("ethon/gui"),
        Scene                 = require("ethon/scene"),
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
        options = options || { showFPS: false };

        renderAssistant.setCanvas(canvas, width, height);
        inputAssistant.setCanvas(canvas);
        this.gui = new GUI(guiElement);

        this.scenes = {};
        this.addScene("loading", new Scene(this));
        this.activeScene = null;

        this.assetsToLoad = 0;
        this.assetsLoaded = 0;

        showFPS = options.showFPS;

    };

    // Extend Game with the EventEmitter for register and trigger custom events.
    extend(eventEmitter, Game.prototype);

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

        if (this.activeScene === null) {
            this.setActiveScene(name);
        }
    };

    /**
     * TODO:
     * @method addGUIElement
     */
    Game.prototype.addGUIElement = function (name, elementDesc) {
        this.gui.addElement(name, elementDesc);
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
        this.scenes[this.activeScene].render(renderAssistant);

        if (showFPS) {
            renderAssistant.drawText(10, 10, "FPS: " + fps);
        }
    };

    /**
     * Starts the game:
     * - Start the update cycle
     * - Start the render cycle
     *
     * @method start
     */
    Game.prototype.start = function () {
        var firstScene = this.activeScene,
            loadingInterval,
            loadingCallback = proxy(this, function () {
                if (this.assetsToLoad === this.assetsLoaded) {
                    clearInterval(loadingInterval);

                    var sceneId;
                    for (sceneId in this.scenes) {
                        if (this.scenes.hasOwnProperty(sceneId)) {
                            this.scenes[sceneId].init();
                        }
                    }

                    this.gui.showView('all');
                    this.setActiveScene(firstScene);

                    requestAnimationFrame(proxy(this, this.loop));
                }
            });

        this.setActiveScene("loading");
        loadingInterval = setInterval(loadingCallback, 500);
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
            this.trigger("exit_scene_" + this.activeScene);
        }
        // Set active scene
        this.activeScene = sceneId;
        this.gui.setActiveView(sceneId);
        // Enter current scene
        this.trigger("enter_scene_" + sceneId);
        this.scenes[this.activeScene].enter();
    };

    /**
     * TODO:
     *
     */
    Game.prototype.loadImage = function (id, content, loadedCallback) {
        this.assetsToLoad += 1;
        resourceAssistant.loadImage(id, content, proxy(this, function () {
            this.assetsLoaded += 1;
            if (loadedCallback !== undefined) {
                loadedCallback();
            }
        }));
    };

    /**
     * TODO:
     *
     */
    Game.prototype.loadText = function (id, content) {
        resourceAssistant.loadText(id, content);
    };

    return Game;
});
