var define = define || undefined;

/**
 * Provides methods for using HTML5 API Canvas
 *
 * @class render_assistant
 */
define(function (require) {
    "use strict";

    var canvas, ctx;

    /**
     * Given a canvas save for a later usage and
     * get the context for 2d drawing.
     *
     * @method setCanvas
     * @param {Object} givenCanvas Canvas for working on
     * @param {Number} w Width of the Canvas
     * @param {Number} h height of the Canvas
     */
    function setCanvas(givenCanvas, w, h) {
        canvas = givenCanvas;
        canvas.width = w;
        canvas.height = h;
        ctx = canvas.getContext("2d");
    }

    /**
     * Returns the working canvas bounding client rect.
     *
     * @method getCanvasRect
     */
    function getCanvasRect() {
        var canvasRect = canvas.getBoundingClientRect();
        // Normalize canvas rect using real dimensions
        canvasRect.left += canvasRect.width - canvas.width;
        canvasRect.top += canvasRect.height - canvas.height;
        return canvasRect;
    }

    /**
     * Clear canvas deleting its content.
     *
     * @method clear
     */
    function clear() {
        var width = canvas.width;
        canvas.width = width;
    }

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
    function drawQuad(x, y, w, h, fillStyle) {
        ctx.save();
        if (fillStyle !== undefined) {
            ctx.fillStyle = fillStyle;
        }
        ctx.fillRect(x, y, w, h);
        ctx.restore();
    }

    /**
     * Draw a circle with center at the position and radius given.
     *
     * @method drawCircle
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     * @param {Number} r Circle's radius
     * @param {String} fillStyle Identifier of the style to fill polygon
     */
    function drawCircle(x, y, r, fillStyle) {
        ctx.save();
        if (fillStyle !== undefined) {
            ctx.fillStyle = fillStyle;
        }
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }

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
    function drawText(x, y, text, options) {
        ctx.save();
        if (options && options.font !== undefined) {
            ctx.font = options.font;
        }
        if (options && options.fillStyle !== undefined) {
            ctx.fillStyle = options.fillStyle;
        }
        ctx.fillText(text, x, y);
        ctx.restore();
    }

    /**
     * Draws image to the specific position.
     *
     * @method drawImage
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     * @param {Object} image Image to be drawing
     */
    function drawImage(x, y, image) {
        ctx.drawImage(image, x, y);
    }

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
    function drawSubImage(x, y, image, frameId, frameWidth, frameHeight) {
        var sx,
            sy;

        sy = 0;
        sx = frameId * frameWidth;

        ctx.drawImage(image, sx, sy, frameWidth, frameHeight, x, y, frameWidth, frameHeight);
    }

    return {
        setCanvas: setCanvas,
        clear: clear,
        drawQuad: drawQuad,
        drawCircle: drawCircle,
        drawText: drawText,
        drawImage: drawImage,
        drawSubImage: drawSubImage,
        getCanvasRect: getCanvasRect
    };
});
