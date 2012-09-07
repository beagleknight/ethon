var define = define || undefined;

define(function (require) {
    "use strict";

    var Soul              = require("ethon/soul"),
        inherit           = require("ethon/inherit"),
        proxy             = require("ethon/proxy"),
        resourceAssistant = require("ethon/resource_assistant"),
        renderAssistant   = require("ethon/render_assistant"),
        Sprite;

    /**
     * constructor function
     *
     * Initialize sprite given a name, position,
     * and texture name and path.
     */
    Sprite = function (name, x, y, w, h, textureName, texturePath) {
        Soul.call(this, name, x, y);
        this.width = w;
        this.height = h;
        this.texture = null;
        this.animations = {};
        this.currentAnimation = null;
        this.currentAnimationIndex = 0;
        this.lastAnimationUpdate = new Date();

        resourceAssistant.loadImage(textureName, texturePath, proxy(this, function (image) {
            this.texture = image;
        }));
    };

    // Sprite inherit from Soul
    inherit(Sprite, Soul);

    /**
     * setCurrentAnimation
     *
     * Set the current animation for sprite
     */
    Sprite.prototype.setCurrentAnimation = function (animationId) {
        this.currentAnimation = animationId;
    };

    /**
     * addFrame
     *
     * Add frame id and duration to the sprite animation. 
     * The time is given in seconds.
     */
    Sprite.prototype.addFrame = function (animationId, frameId, time) {
        this.animations[animationId] = this.animations[animationId] || [];
        this.animations[animationId].push({ frame: frameId, time: time });
    };

    /**
     * render
     *
     * render the sprite texture based on the current frame
     */
    Sprite.prototype.render = function () {
        var position = this.getPosition(),
            currentFrame = this.animations[this.currentAnimation][this.currentAnimationIndex];

        // Render if resource is loaded
        if (this.texture !== null) {
            if (this.animations[this.currentAnimation].length > 0) {
                renderAssistant.drawSubImage(position.x, position.y, this.texture, currentFrame.frame, this.width, this.height);
            } else {
                renderAssistant.drawImage(position.x, position.y, this.texture);
            }
        }
    };

    /**
     * update
     *
     * update Sprite following his animation
     */
    Sprite.prototype.update = function (dt) {
        var currentFrame = this.animations[this.currentAnimation][this.currentAnimationIndex],
            now = new Date(),
            animationDt = new Date(now.getTime() - this.lastAnimationUpdate.getTime()).getMilliseconds() / 1000;

        // Call base object update
        Soul.prototype.update.call(this, dt);

        if (this.animations[this.currentAnimation].length > 0) {
            if (animationDt > currentFrame.time) {
                this.currentAnimationIndex = (this.currentAnimationIndex + 1) % this.animations[this.currentAnimation].length;
                this.lastAnimationUpdate = now;
            }
        }
    };

    return Sprite;
});
