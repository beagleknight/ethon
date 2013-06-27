/*global define*/

/**
 * Provides methods for using HTML5 API Canvas
 *
 * @class render_assistant
 */
define(function () {
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
        canvas.style.zIndex = 1;
        ctx = canvas.getContext("2d");
    }

    /**
     * Returns the working canvas bounding client rect.
     *
     * @method getCanvasRect
     */
    function getCanvasRect() {
        var canvasRect = canvas.getBoundingClientRect(),
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
    }

    /**
     * Returns the working canvas context
     *
     * @method getContext
     */
    function getContext() {
        return ctx;
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
     * Draw a line from origin to dest.
     *
     * @method drawLine
     * @param {Number} ox Origin on the x-axis
     * @param {Number} oy Origin on the y-axis
     * @param {Number} dx Destination on the x-axis
     * @param {Number} dy Destination on the y-axis
     * @param {String} strokeStyle Identifier of the style to stroke polygon
     */
    function drawLine(ox, oy, dx, dy, strokeStyle) {
        ctx.save();
        if (strokeStyle !== undefined) {
            ctx.strokeStyle = strokeStyle;
        }
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.lineTo(dx, dy);
        ctx.stroke();
        ctx.restore();
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
    function drawQuad(x, y, w, h, fillStyle, strokeStyle) {
        ctx.save();
        if (fillStyle !== undefined) {
            ctx.fillStyle = fillStyle;
            ctx.fillRect(x, y, w, h);
        }
        if (strokeStyle !== undefined) {
            ctx.strokeStyle = strokeStyle;
            ctx.strokeRect(x, y, w, h);
        }
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
    function drawImage(x, y, image, width, height) {
        width = width === undefined ? image.width : width;
        height = height === undefined ? image.height : height;
        ctx.drawImage(image, x, y, width, height);
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
            sy,
            rows,
            cols;

        cols = (image.width / frameWidth);
        rows = (image.height / frameHeight);

        sx = (frameId % cols) * frameWidth;
        sy = Math.floor(frameId / cols) * frameHeight;

        ctx.drawImage(image, sx, sy, frameWidth, frameHeight, x, y, frameWidth, frameHeight);
    }

    return {
        setCanvas: setCanvas,
        getContext: getContext,
        clear: clear,
        drawLine: drawLine,
        drawQuad: drawQuad,
        drawCircle: drawCircle,
        drawText: drawText,
        drawImage: drawImage,
        drawSubImage: drawSubImage,
        getCanvasRect: getCanvasRect
    };
});
