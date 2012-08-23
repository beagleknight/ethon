var ethon = ethon || {};
var window = window || {};

(function (ethon, exports) {
    "use strict";

    var Soul = ethon.Soul,
        renderAssistant = ethon.renderAssistant,
        Dog = function (x, y) {
            Soul.call(this, "dog", x, y);
        };

    Dog.prototype = Soul.prototype;

    Dog.prototype.render = function () {
        var position = this.getPosition();
        renderAssistant.drawQuad(position.x, position.y, 10, 10);
    };

    Dog.prototype.move_right = function () {
        this.setVelocity(10, 0);
    };

    Dog.prototype.move_left = function () {
        this.setVelocity(-10, 0);
    };

    Dog.prototype.move_up = function () {
        this.setVelocity(0, -10);
    };

    Dog.prototype.move_down = function () {
        this.setVelocity(0, 10);
    };

    Dog.prototype.stop = function () {
        this.setVelocity(0, 10);
    };

    exports.Dog = Dog;
}(ethon, window));
