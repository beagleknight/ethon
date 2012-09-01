var ethon = ethon || {},
    pong = pong || {},
    window = window || {};

(function (ethon, exports) {
    "use strict";

    var Soul = ethon.Soul,
        QuadBody = ethon.QuadBody,
        inherit = ethon.inherit,
        proxy = ethon.proxy,
        renderAssistant = ethon.renderAssistant,
        speed = 100,
        radius = 50,
        Ball;

    /**
     * constructor
     *
     * Use Soul constructor to initialize name and
     * position
     */
    Ball = function (x, y) {
        Soul.call(this, "ball", x, y);
        this.startPosition = { x: x, y: y };
        this.setBody(new QuadBody(x, y, 10, 10));
        this.respawn();

        this.on("collision_ball_player_paddle", proxy(this, function () {
            var velocity = this.getVelocity();
            this.setVelocity(-velocity.x, velocity.y);
        }));

        this.on("collision_ball_ia_paddle", proxy(this, function () {
            var velocity = this.getVelocity();
            this.setVelocity(-velocity.x, velocity.y);
        }));

    };

    inherit(Ball, Soul);

    Ball.prototype.render = function () {
        var position = this.getPosition();
        //renderAssistant.drawCircle(position.x, position.y, radius, "#ffffff");
        renderAssistant.drawQuad(position.x, position.y, 10, 10, "#ffffff");
    };

    Ball.prototype.respawn = function () {
        this.setPosition(this.startPosition.x, this.startPosition.y);
        this.setVelocity(speed, 0);
    };

    exports.Ball = Ball;
}(ethon, pong));
