var requirejs = requirejs || undefined,
    define = define || undefined;

requirejs.config({
    paths: {
        ethon: "../../../lib/ethon"
    }
});

define(function (require) {
    "use strict";

    var Sprite          = require("ethon/sprite"),
        proxy           = require("ethon/proxy"),
        QuadBody        = require("ethon/quad_body"),
        inherit         = require("ethon/inherit"),
        renderAssistant = require("ethon/render_assistant"),
        speed = 100,
        tileSize = 20,
        Pacman;

    /**
     * constructor
     *
     */
    Pacman = function (i, j) {
        Sprite.call(this, "pacman", i * tileSize, j * tileSize,
            tileSize, tileSize, "pacman", "images/pacman_sprite.png");
        this.setBody(new QuadBody(1, 1, tileSize - 2, tileSize - 2));

        this.addFrame("idle", 0, 0.5);
        this.addFrame("idle", 1, 0.5);

        this.addFrame("move_left", 2, 0.25);
        this.addFrame("move_left", 3, 0.25);

        this.addFrame("move_right", 4, 0.25);
        this.addFrame("move_right", 5, 0.25);

        this.addFrame("move_up", 6, 0.25);
        this.addFrame("move_up", 7, 0.25);

        this.addFrame("move_down", 8, 0.25);
        this.addFrame("move_down", 9, 0.25);

        this.setCurrentAnimation("idle");

        this.on("collision_pacman_coconuts", function (pacman, coconut) {
            coconut.destroy();
        });
    };

    inherit(Pacman, Sprite);

    Pacman.prototype.moveUp = function () {
        this.setVelocity(0, -speed);
        this.setCurrentAnimation("move_up");
    };

    Pacman.prototype.moveDown = function () {
        this.setVelocity(0, speed);
        this.setCurrentAnimation("move_down");
    };

    Pacman.prototype.moveRight = function () {
        this.setVelocity(speed, 0);
        this.setCurrentAnimation("move_right");
    };

    Pacman.prototype.moveLeft = function () {
        this.setVelocity(-speed, 0);
        this.setCurrentAnimation("move_left");
    };

    Pacman.prototype.stop = function () {
        this.setVelocity(0, 0);
        this.setCurrentAnimation("idle");
    };

    return Pacman;
});
