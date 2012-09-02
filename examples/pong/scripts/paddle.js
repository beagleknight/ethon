var requirejs = requirejs || undefined,
    define = define || undefined;

requirejs.config({
    paths: {
        ethon: "../../../lib/ethon"
    }
});

define(function (require) {
    "use strict";

    var Soul            = require("ethon/soul"),
        proxy           = require("ethon/proxy"),
        QuadBody        = require("ethon/quad_body"),
        inherit         = require("ethon/inherit"),
        renderAssistant = require("ethon/render_assistant"),
        speed = 100,
        Paddle;

    /**
     * constructor
     *
     * Use Soul constructor to initialize name and
     * position
     */
    Paddle = function (name, x, y) {
        Soul.call(this, name, x, y);
        this.startPosition = { x: x, y: y };
        this.setBody(new QuadBody(x, y, 10, 100));

        this.on("player_scored", proxy(this, this.respawn));
        this.on("ia_scored", proxy(this, this.respawn));
    };

    inherit(Paddle, Soul);

    Paddle.prototype.render = function () {
        var position = this.getPosition();
        renderAssistant.drawQuad(position.x, position.y, 10, 100, "#ffffff");
    };

    Paddle.prototype.update = function (dt) {
        var canvasRect = renderAssistant.getCanvasRect(),
            position = this.getPosition();

        // Call the soul update
        Soul.prototype.update.call(this, dt);

        if (position.y < 0) {
            this.setPosition(position.x, 0);
        } else if (position.y + 100 > canvasRect.height) {
            this.setPosition(position.x, canvasRect.height - 100);
        }
    };

    Paddle.prototype.moveUp = function () {
        this.setVelocity(0, -speed);
    };

    Paddle.prototype.moveDown = function () {
        this.setVelocity(0, speed);
    };

    Paddle.prototype.stop = function () {
        this.setVelocity(0, 0);
    };

    Paddle.prototype.respawn = function () {
        this.setPosition(this.startPosition.x, this.startPosition.y);
        this.stop();
    };

    return Paddle;
});
