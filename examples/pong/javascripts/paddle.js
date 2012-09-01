var ethon = ethon || {},
    pong = pong || {},
    window = window || {};

(function (ethon, exports) {
    "use strict";

    var Soul = ethon.Soul,
        QuadBody = ethon.QuadBody,
        inherit = ethon.inherit,
        renderAssistant = ethon.renderAssistant,
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
        this.setBody(new QuadBody(x, y, 10, 100));
    };

    inherit(Paddle, Soul);

    Paddle.prototype.render = function () {
        var position = this.getPosition();
        renderAssistant.drawQuad(position.x, position.y, 10, 100, "#ffffff");
    };

    Paddle.prototype.move_up = function () {
        this.setVelocity(0, -speed);
    };

    Paddle.prototype.move_down = function () {
        this.setVelocity(0, speed);
    };

    Paddle.prototype.move_right = function () {
        this.setVelocity(speed, 0);
    };

    Paddle.prototype.move_left = function () {
        this.setVelocity(-speed, 0);
    };

    Paddle.prototype.stop = function () {
        this.setVelocity(0, 0);
    };

    exports.Paddle = Paddle;
}(ethon, pong));
