// TODO: require proxy
// TODO: require requestAnimationFrame
// TODO: require render assistant
// TODO: require Map
// TODO: require GUI
var ethon = ethon || {},
    window = window || {};

(function (window, exports) {
    "use strict";

    var requestAnimationFrame = exports.requestAnimationFrame,
        proxy = exports.proxy,
        renderAssistant = exports.renderAssistant,
        elapsedTime = new Date(),
        numFrames = 0,
        lastUpdate = new Date(),
        fps = 60,
        showFPS,
        Game = function (canvas, width, height, options) {
            options = options || { showFPS: false };
            renderAssistant.setCanvas(canvas, width, height);

            this.map = new exports.Map();
            this.souls = [];
            this.gui = new exports.GUI();

            showFPS = options.showFPS;
        };


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
        var i, l,
            now = new Date(),
            dt = new Date(now.getTime() - elapsedTime.getTime()).getMilliseconds() / 1000;
        
        for (i = 0, l = this.souls.length; i < l; i += 1) {
            this.souls[i].update(dt);
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

    exports.Game = Game;
}(window, ethon));
