var define = define || undefined;

define(function (require) {
    "use strict";

    var Soul            = require("soul"),
        inherit         = require("inherit"),
        renderAssistant = require("render_assistant"),
        Dog;

    /**
     * constructor
     *
     * Use Soul constructor to initialize name and
     * position
     */
    Dog = function (x, y) {
        Soul.call(this, "dog", x, y);
    };

    inherit(Dog, Soul);

    Dog.prototype.render = function () {
        var position = this.getPosition();
        renderAssistant.drawQuad(position.x, position.y, 10, 10, "#00ff00");
    };

    Dog.prototype.move_right = function () {
        this.setVelocity(50, 0);
    };

    Dog.prototype.move_left = function () {
        this.setVelocity(-50, 0);
    };

    Dog.prototype.move_up = function () {
        this.setVelocity(0, -50);
    };

    Dog.prototype.move_down = function () {
        this.setVelocity(0, 50);
    };

    Dog.prototype.stop = function () {
        this.setVelocity(0, 0);
    };

    return Dog;
});
