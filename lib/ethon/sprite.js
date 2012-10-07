var define = define || undefined;

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
        resourceAssistant = require("ethon/resource_assistant"),
        renderAssistant   = require("ethon/render_assistant"),
        Sprite;

    /**
     * Constructor
     *
     * @method Sprite
     * @param {String} name Sprite's name
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     * @param {Number} w Sprite's width
     * @param {Number} h Sprite's height
     * @param {String} textureName Sprite's texture name
     * @param {String} texturePath Texture's path
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
     * Update Sprite following his animation
     *
     * @method update
     * @param {Number} dt Number of milliseconds since last update
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
