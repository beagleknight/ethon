(function () {
    "use strict";

    var inherit          = require("./inherit"),
        EventEmitter     = require("./event_emitter"),
        RenderAssistant;

    RenderAssistant = function (container, canvas) {
        EventEmitter.call(this);
        this.container = container;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = 794;
        this.canvas.height = 600;
    };
    inherit(RenderAssistant, EventEmitter);

    RenderAssistant.prototype.onResize = function () {
        this.canvas.width = parseInt(this.container.css("width"), 10);
        this.canvas.height = parseInt(this.container.css("height"), 10);
        this.broadcast("canvas:resized", this.canvas);
    };

    /**
     * Returns the working canvas bounding client rect.
     *
     * @method getCanvasRect
     */
    RenderAssistant.prototype.getCanvasRect = function () {
        var canvasRect = this.canvas.getBoundingClientRect(),
            rect       = {
                left   : canvasRect.left,
                top    : canvasRect.top,
                width  : canvasRect.width,
                height : canvasRect.height
            };

        // Normalize canvas rect using real dimensions
        rect.left += rect.width - rect.width;
        rect.top  += rect.height - rect.height;

        return rect;
    };

    /**
     * Returns the working canvas context
     *
     * @method getContext
     */
    RenderAssistant.prototype.getContext = function () {
        return this.ctx;
    };

    /**
     * Clear canvas deleting its content.
     *
     * @method clear
     */
    RenderAssistant.prototype.clear = function () {
        var width = this.canvas.width;
        this.canvas.width = width;
    };

    /**
     * Draw a line from origin to dest.
     *
     * @method drawLine
     * @param {Number} ox Origin on the x-axis
     * @param {Number} oy Origin on the y-axis
     * @param {Number} dx Destination on the x-axis
     * @param {Number} dy Destination on the y-axis
     * @param {String} strokeStyle Identifier of the style to stroke polygon
     */
    RenderAssistant.prototype.drawLine = function (ox, oy, dx, dy, strokeStyle) {
        this.ctx.save();
        if (strokeStyle !== undefined) {
            this.ctx.strokeStyle = strokeStyle;
        }
        this.ctx.beginPath();
        this.ctx.moveTo(ox, oy);
        this.ctx.lineTo(dx, dy);
        this.ctx.stroke();
        this.ctx.restore();
    };

    /**
     * Draw a quad to the specific position given dimensions.
     *
     * @method drawQuad
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     * @param {Number} w Quad's width
     * @param {Number} h Quad's height
     * @param {String} fillStyle Identifier of the style to fill polygon
     */
    RenderAssistant.prototype.drawQuad = function (x, y, w, h, fillStyle, strokeStyle) {
        this.ctx.save();
        if (fillStyle !== undefined) {
            this.ctx.fillStyle = fillStyle;
            this.ctx.fillRect(x, y, w, h);
        }
        if (strokeStyle !== undefined) {
            this.ctx.strokeStyle = strokeStyle;
            this.ctx.strokeRect(x, y, w, h);
        }
        this.ctx.restore();
    };

    /**
     * Draw a circle with center at the position and radius given.
     *
     * @method drawCircle
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     * @param {Number} r Circle's radius
     * @param {String} fillStyle Identifier of the style to fill polygon
     */
    RenderAssistant.prototype.drawCircle = function (x, y, r, fillStyle) {
        this.ctx.save();
        if (fillStyle !== undefined) {
            this.ctx.fillStyle = fillStyle;
        }
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.restore();
    };

    /**
     * Draw text to the specific position.
     *
     * @method drawText
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     * @param {String} text Text to be displayed
     * @param {Object} options Object representing fill style and
     * font attributes.
     */
    RenderAssistant.prototype.drawText = function (x, y, text, options) {
        this.ctx.save();
        if (options && options.font !== undefined) {
            this.ctx.font = options.font;
        }
        if (options && options.fillStyle !== undefined) {
            this.ctx.fillStyle = options.fillStyle;
        }
        this.ctx.fillText(text, x, y);
        this.ctx.restore();
    };

    /**
     * Draws image to the specific position.
     *
     * @method drawImage
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     * @param {Object} image Image to be drawing
     */
    RenderAssistant.prototype.drawImage = function (x, y, image, width, height) {
        width = width === undefined ? image.width : width;
        height = height === undefined ? image.height : height;
        this.ctx.drawImage(image, x, y, width, height);
    };

    /**
     * Draws image contained on another image to the specific position.
     *
     * @method drawSubImage
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     * @param {Object} image Image to be drawing
     * @param {Number} frameId Index of the frame to be drawn
     * @param {Number} frameWidth Width of a frame in pixels
     * @param {Number} frameHeight Height of a frame in pixels
     */
    RenderAssistant.prototype.drawSubImage = function (x, y, image, frameId, frameWidth, frameHeight, width, height) {
        var sx,
            sy,
            rows,
            cols;

        cols = (image.width / frameWidth);
        rows = (image.height / frameHeight);

        sx = (frameId % cols) * frameWidth;
        sy = Math.floor(frameId / cols) * frameHeight;

        this.ctx.drawImage(image, sx, sy, frameWidth, frameHeight, x, y, width, height);
    };

    RenderAssistant.prototype.setOptions = function (options) {
        options = options || { mobile: false };
        this.mobile = options.mobile;
    };

    module.exports = RenderAssistant;
}());
