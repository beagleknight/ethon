var ethon = ethon || {},
    pong = pong || {},
    window = window || {};

(function (ethon, exports) {
    "use strict";

    var Soul = ethon.Soul,
        CircleBody = ethon.CircleBody,
        inherit = ethon.inherit,
        renderAssistant = ethon.renderAssistant,
        speed = 100,
        radius = 5,
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
        this.setBody(new CircleBody(x, y, radius));
        this.respawn();
    };

    inherit(Ball, Soul);

    Ball.prototype.render = function () {
        var position = this.getPosition();
        renderAssistant.drawCircle(position.x, position.y, radius, "#ffffff");
    };

    Ball.prototype.respawn = function () {
        this.setPosition(this.startPosition.x, this.startPosition.y);
        this.setVelocity(speed, 0);
    };

    Ball.prototype.on("collision_ball_player_paddle", function () {
        this.position.x = -this.position.x;
    });

    Ball.prototype.on("collision_ball_ia_paddle", function () {
        this.position.x = -this.position.x;
    });

    exports.Ball = Ball;
}(ethon, pong));
