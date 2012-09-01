var window = window || undefined,
    define = define || undefined;

define(function (require) {
    "use strict";

    var requestAnimationFrame = require("request_animation_frame"),
        proxy                 = require("proxy"),
        extend                = require("extend"),
        eventEmitter          = require("event_emitter"),
        renderAssistant       = require("render_assistant"),
        physicsAssistant      = require("physics_assistant"),
        Map                   = require("map"),
        GUI                   = require("gui"),
        elapsedTime = new Date(),
        lastUpdate = new Date(),
        numFrames = 0,
        fps = 60,
        showFPS,
        Game;

    /**
     * constructor function
     *
     */
    Game = function (canvas, width, height, options) {
        options = options || { showFPS: false };
        renderAssistant.setCanvas(canvas, width, height);

        this.map = new Map();
        this.souls = [];
        this.gui = new GUI();

        showFPS = options.showFPS;
    };

    // Extend Game with the EventEmitter for register
    // and trigger custom events.
    extend(eventEmitter, Game.prototype);

    /**
     * updateFPS
     *
     * Helper function for update FPS calculation
     */
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
     * addSoul
     *
     * Add Soul for being processed by the game.
     */
    Game.prototype.addSoul = function (soul) {
        this.souls.push(soul);
    };

    /**
     * setMap
     *
     * Set the map object for the game.
     */
    Game.prototype.setMap = function (map) {
        this.map = map;
    };

    /**
     * setGUI
     *
     * Set the GUI object for the game.
     */
    Game.prototype.setGUI = function (gui) {
        this.gui = gui;
    };

    /**
     * update
     *
     * Basic update cycle: update souls
     */
    Game.prototype.update = function () {
        var i, l, j, ll,
            soul1, soul2,
            now = new Date(),
            dt = new Date(now.getTime() - elapsedTime.getTime()).getMilliseconds() / 1000;
        // Update all souls
        for (i = 0, l = this.souls.length; i < l; i += 1) {
            this.souls[i].update(dt);
        }

        // Check souls collisions
        for (i = 0, l = this.souls.length; i < l; i += 1) {
            for (j = 0, ll = this.souls.length; j < ll; j += 1) {
                soul1 = this.souls[i];
                soul2 = this.souls[j];

                // Check for souls collision
                // 
                // If souls collide custom events are triggered based on souls name.
                if (soul1 !== soul2) {
                    if (physicsAssistant.soulsCollision(soul1, soul2)) {
                        this.trigger("collision_" + soul1.getName() + "_" + soul2.getName(), soul1, soul2);
                    }
                }
            }

        }

        elapsedTime = now;
    };

    /**
     * render
     *
     * Render map, souls and GUI in strict order.
     * Use requestAnimationFrame for better
     * performance.
     */
    Game.prototype.render = function render() {
        var i, l;
        // Clear the canvas
        renderAssistant.clear();

        // Render the map
        this.map.render();

        // Render all souls
        for (i = 0, l = this.souls.length; i < l; i += 1) {
            this.souls[i].render();
        }

        // Render GUI
        this.gui.render();

        if (showFPS) {
            renderAssistant.drawText(10, 10, "FPS: " + fps);
        }

        updateFPS();
        requestAnimationFrame(proxy(this, this.render));
    };

    /**
     * start
     *
     * Starts the game:
     * - Start the update cycle
     * - Start the render cycle
     */
    Game.prototype.start = function () {
        window.setInterval(proxy(this, this.update), 1000 / 30);
        requestAnimationFrame(proxy(this, this.render));
    };

    return Game;
});
