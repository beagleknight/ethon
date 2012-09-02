var define = define || undefined;

define(function (require) {
    "use strict";

    var canvas, ctx;

    /**
     * setCanvas
     *
     * Given a canvas save for a later usage and
     * get the context for 2d drawing.
     */
    function setCanvas(givenCanvas, w, h) {
        canvas = givenCanvas;
        canvas.width = w;
        canvas.height = h;
        ctx = canvas.getContext("2d");
    }

    /**
     * getCanvasRect
     *
     * Returns the working canvas bounding client rect.
     */
    function getCanvasRect() {
        var canvasRect = canvas.getBoundingClientRect();
        // Normalize canvas rect using real dimensions
        canvasRect.left += canvasRect.width - canvas.width;
        canvasRect.top += canvasRect.height - canvas.height;
        return canvasRect;
    }

    /**
     * clear
     *
     * Clear canvas deleting its content.
     */
    function clear() {
        var width = canvas.width;
        canvas.width = width;
    }

    /**
     * drawQuad
     *
     * Draw a quad to the specific position given
     * dimensions.
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
     * drawCircle
     *
     * Draw a circle with center at the position 
     * and radius given.
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
     * drawText
     *
     * Draw text to the specific position.
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
     * drawImage
     *
     * Draws image to the specific position.
     */
    function drawImage(x, y, image) {
        ctx.drawImage(image, x, y);
    }

    /**
     * drawSubImage
     *
     * Draws image to the specific position.
     */
    function drawSubImage(x, y, image, frameId, frameWidth, frameHeight) {
        var sx,
            sy;

        // TODO: support only sprites with one row for a while
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
