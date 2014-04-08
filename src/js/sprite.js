(function () {
    "use strict";

    var Soul    = require("./soul"),
        inherit = require("./inherit"),
        Sprite;

    Sprite = function (name, x, y, texture) {
        Soul.call(this, name, x, y);
        this.texture = texture;
        this.width = this.texture.width;
        this.height = this.texture.height;
        this.rotation = 0;
        this.animations = {};
        this.currentAnimation = null;
        this.currentAnimationIndex = 0;
        this.lastAnimationUpdate = new Date();
    };

    // Sprite inherit from Soul
    inherit(Sprite, Soul);

    Sprite.prototype.setCurrentAnimation = function (animationId) {
        this.currentAnimation = animationId;
    };

    Sprite.prototype.addFrame = function (animationId, frameId, time) {
        this.animations[animationId] = this.animations[animationId] || [];
        this.animations[animationId].push({ frame: frameId, time: time });
    };

    Sprite.prototype.render = function (renderAssistant) {
        var ctx = renderAssistant.getContext(),
            currentFrame;

        ctx.save();
        ctx.translate(this.position.x, this.position.y);

        ctx.translate(this.width / 2, this.height / 2);
        ctx.rotate(this.rotation * (Math.PI / 180));
        ctx.scale(this.scale, this.scale);
        ctx.translate(-this.width / 2, -this.height / 2);

        if (this.currentAnimation !== null && this.animations[this.currentAnimation].length > 0) {
            currentFrame = this.animations[this.currentAnimation][this.currentAnimationIndex];
            renderAssistant.drawSubImage(0, 0, this.texture, currentFrame.frame, this.width, this.height);
        } else {
            renderAssistant.drawImage(0, 0, this.texture, this.width, this.height);
        }

        ctx.restore();
    };

    Sprite.prototype.update = function (dt) {
        var now = new Date(),
            currentFrame,
            animationDt;

        // Call base object update
        Soul.prototype.update.call(this, dt);

        if (this.currentAnimation !== null && this.animations[this.currentAnimation].length > 0) {
            currentFrame = this.animations[this.currentAnimation][this.currentAnimationIndex];
            animationDt = new Date(now.getTime() - this.lastAnimationUpdate.getTime()).getMilliseconds() / 1000;

            if (animationDt > currentFrame.time) {
                this.currentAnimationIndex = (this.currentAnimationIndex + 1) % this.animations[this.currentAnimation].length;
                this.lastAnimationUpdate = now;
            }
        }
    };

    module.exports = Sprite;
}());
