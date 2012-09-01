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
        speed = 200,
        radius = 50,
        lastCollision = new Date(),
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

        this.on("collision_ball_player_paddle", proxy(this, this.changeDirection));
        this.on("collision_ball_ia_paddle", proxy(this, this.changeDirection));
    };

    inherit(Ball, Soul);

    Ball.prototype.render = function () {
        var position = this.getPosition();
        //renderAssistant.drawCircle(position.x, position.y, radius, "#ffffff");
        renderAssistant.drawQuad(position.x, position.y, 10, 10, "#ffffff");
    };

    Ball.prototype.update = function (dt) {
        var canvasRect = renderAssistant.getCanvasRect(),
            position = this.getPosition(),
            velocity = this.getVelocity();

        // Call the soul update
        Soul.prototype.update.call(this, dt);

        // Check collision with top/bottom walls
        if (position.y < 0 || position.y + 10 > canvasRect.height) {
            this.setVelocity(velocity.x, -velocity.y);
        }

        // Check collision with left/right walls
        if (position.x < 0) {
            this.trigger("ia_scored");
            this.respawn();
        } else if (position.x + 10 > canvasRect.width) {
            this.trigger("player_scored");
            this.respawn();
        }
    };

    Ball.prototype.respawn = function () {
        this.setPosition(this.startPosition.x, this.startPosition.y);
        this.setVelocity(speed, 0);
    };

    Ball.prototype.changeDirection = function (ball, paddle) {
        var now = new Date(),
            dt = new Date(now.getTime() - lastCollision.getTime()).getMilliseconds() / 1000,
            velocity = this.getVelocity(),
            paddleVelocity = paddle.getVelocity();

        // Check for new collisions every 0.25s
        // Move 25% faster every collision
        if (dt > 0.25) {
            lastCollision = now;
            this.setVelocity(-velocity.x, -velocity.y + -paddleVelocity.y * 0.5);
        }
    };

    exports.Ball = Ball;
}(ethon, pong));
