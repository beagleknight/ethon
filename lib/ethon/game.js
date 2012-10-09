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
 * @requires physics_assistant
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
        physicsAssistant      = require("ethon/physics_assistant"),
        Map                   = require("ethon/map"),
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
     * @param {Number} width Canvas width
     * @param {Number} height Canvas height
     * @param {Object} options An options object used for configuration.
     */
    Game = function (canvas, width, height, options) {
        options = options || { showFPS: false };
        renderAssistant.setCanvas(canvas, width, height);

        this.scenes = {};
        this.activeScene = 'main';

        this.scenes[this.activeScene] = {
            map: new Map(),
            souls: [],
            gui: new GUI()
        };

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
     * Add Soul for being processed by the game.
     *
     * @method addSoul
     * @param {Object} soul Soul to be added on the game loop.
     */
    Game.prototype.addSoul = function (soul, scene) {
        scene = scene || 'main';
        this.scenes[scene] = this.scenes[scene] || { map: new Map(), gui: new GUI(), souls: []};
        this.scenes[scene].souls.push(soul);
    };

    /**
     * Set the map object for the game.
     *
     * @method setMap
     * @param {Object} map Map to be added on the game loop.
     */
    Game.prototype.setMap = function (map, scene) {
        scene = scene || 'main';
        this.scenes[scene] = this.scenes[scene] || { map: new Map(), gui: new GUI(), souls: []};
        this.scenes[scene].map = map;
    };

    /**
     * Set the GUI object for the game.
     *
     * @method setGUI
     * @param {Object} gui GUI to be added on the game loop.
     */
    Game.prototype.setGUI = function (gui, scene) {
        scene = scene || 'main';
        this.scenes[scene] = this.scenes[scene] || { map: new Map(), gui: new GUI(), souls: []};
        this.scenes[scene].gui = gui;
    };

    /**
     * Update souls and check collisions between them.
     *
     * @method update
     */
    Game.prototype.update = function () {
        var i, l, j, ll,
            souls         = this.scenes[this.activeScene].souls,
            soul1, soul2,
            now           = new Date(),
            dt            = new Date(now.getTime() - elapsedTime.getTime()).getMilliseconds() / 1000;

        // Update all souls
        for (i = 0, l = souls.length; i < l; i += 1) {
            if (souls[i].remove) {
                souls.splice(i, 1);
                i -= 1;
                break;
            }
            souls[i].update(dt);
        }

        // Check souls collisions
        for (i = 0, l = souls.length; i < l; i += 1) {
            if (souls[i].checkCollision) {
                for (j = 0, ll = souls.length; j < ll; j += 1) {
                    soul1 = souls[i];
                    soul2 = souls[j];

                    // Check for souls collision
                    // 
                    // If souls collide custom events are triggered based on souls name.
                    if (soul1 !== soul2) {
                        if (physicsAssistant.soulsCollision(soul1, soul2)) {
                            this.trigger("collision_" + soul1.getName() + "_" + soul2.getName(), soul1, soul2);

                            // Trigger event based on collision group for body
                            if (soul2.getBody().collisionGroup !== undefined) {
                                this.trigger("collision_" + soul1.getName() + "_" + soul2.getBody().collisionGroup, soul1, soul2);
                            }
                        }
                    }
                }
            }
        }

        elapsedTime = now;
    };

    /**
     * Render map, souls and GUI in strict order. Use requestAnimationFrame for better
     * performance.
     *
     * @method render
     */
    Game.prototype.render = function render() {
        var i, l,
            souls = this.scenes[this.activeScene].souls,
            map   = this.scenes[this.activeScene].map,
            gui   = this.scenes[this.activeScene].gui;

        // Clear the canvas
        renderAssistant.clear();

        // Render the map
        map.render();

        // Render all souls
        for (i = 0, l = souls.length; i < l; i += 1) {
            souls[i].render();
        }

        // Render GUI
        gui.render();

        if (showFPS) {
            renderAssistant.drawText(10, 10, "FPS: " + fps);
        }

        updateFPS();
        requestAnimationFrame(proxy(this, this.render));
    };

    /**
     * Starts the game:
     * - Start the update cycle
     * - Start the render cycle
     *
     * @method start
     */
    Game.prototype.start = function () {
        window.setInterval(proxy(this, this.update), 1000 / 30);
        requestAnimationFrame(proxy(this, this.render));
    };

    /**
     * Set active scene for render and update cycle
     *
     * @method setActiveScene
     * @param {String} scene Scene's identifier
     */
    Game.prototype.setActiveScene = function (scene) {
        this.activeScene = scene;
    };

    return Game;
});
