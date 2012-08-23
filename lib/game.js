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
        Game = function (canvas, width, height) {
            renderAssistant.setCanvas(canvas, width, height);
        };

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
