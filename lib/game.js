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
        map = new exports.Map(),
        souls = [],
        gui = new exports.GUI(),
        elapsedTime = new Date(),
        numFrames = 0,
        lastUpdate = new Date(),
        fps = 60,
        showFPS,
        Game = function (canvas, width, height, options) {
            options = options || { showFPS: false };
            renderAssistant.setCanvas(canvas, width, height);

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
        souls.push(soul);
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
        
        for (i = 0, l = souls.length; i < l; i += 1) {
            souls[i].update(dt);
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
        
        renderAssistant.clear();

        for (i = 0, l = souls.length; i < l; i += 1) {
            souls[i].render();
        }

        if (showFPS) {
            renderAssistant.drawText(10, 10, "FPS: " + fps);
        }

        updateFPS();
        requestAnimationFrame(render);
    };

    /**
     * start
     *
     * Starts the game:
     * - Start the render cycle
     */
    Game.prototype.start = function () {
        window.setInterval(proxy(this, this.update), 1000 / 30);
        requestAnimationFrame(this.render);
    };

    exports.Game = Game;
}(window, ethon));
