/*global define*/

/**
 * Provides a Class for handling 2d sprites.
 *
 * @class Sprite
 * @requires soul
 * @requires inherit
 * @requires proxy
 * @requires resource_assistant
 * @requires render_assistant
 */
define(function (require) {
    "use strict";

    var Soul              = require("ethon/soul"),
        inherit           = require("ethon/inherit"),
        proxy             = require("ethon/proxy"),
        Sprite;

    /**
     * Constructor
     *
     * @method Sprite
     * @param {String} name Sprite's name
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     * @param {String} texture Sprite's texture
     */
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

    /**
     * Set the current animation for sprite
     *
     * @method setCurrentAnimation
     * @param {String} animationId Animation identifier
     */
    Sprite.prototype.setCurrentAnimation = function (animationId) {
        this.currentAnimation = animationId;
    };

    /**
     * Add frame id and duration to the sprite animation. 
     * The time is given in seconds.
     *
     * @method addFrame
     * @param {String} animationId Animation identifier
     * @param {Number} frameId Frame identifier of sprite to be added
     * @param {Number} time Time in seconds for this animation frame
     */
    Sprite.prototype.addFrame = function (animationId, frameId, time) {
        this.animations[animationId] = this.animations[animationId] || [];
        this.animations[animationId].push({ frame: frameId, time: time });
    };

    /**
     * Render the sprite texture based on the current frame
     *
     * @method render
     */
    Sprite.prototype.render = function (renderAssistant) {
        var ctx = renderAssistant.getContext(),
            position = this.getPosition(),
            currentFrame;

        ctx.save();
        ctx.translate(this.position.x, this.position.y);

        ctx.translate(this.width / 2, this.height / 2);
        ctx.rotate(this.rotation * (Math.PI / 180));
        ctx.translate(-this.width / 2, -this.height / 2);

        if (this.currentAnimation !== null && this.animations[this.currentAnimation].length > 0) {
            currentFrame = this.animations[this.currentAnimation][this.currentAnimationIndex];
            renderAssistant.drawSubImage(0, 0, this.texture, currentFrame.frame, this.width, this.height);
        } else {
            renderAssistant.drawImage(0, 0, this.texture);
        }

        ctx.restore();
    };

    /**
     * Update Sprite following his animation
     *
     * @method update
     * @param {Number} dt Number of milliseconds since last update
     */
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

    return Sprite;
});
