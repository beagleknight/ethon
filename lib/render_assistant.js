var ethon = ethon || {},
    window = window || {};

(function (window, exports) {
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
    function drawQuad(x, y, w, h) {
        ctx.fillRect(x, y, w, h);
    }

    /**
     * drawCircle
     *
     * Draw a circle with center at the position 
     * and radius given.
     */
    function drawCircle(x, y, r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.stroke();
    }

    /**
     * drawText
     *
     * Draw text to the specific position.
     */
    function drawText(x, y, text) {
        ctx.fillText(text, x, y);
    }

    /**
     * drawImage
     *
     * Draws image to the specific position.
     */
    function drawImage(x, y, image) {
        ctx.drawImage(image, x, y);
    }

    exports.renderAssistant = {
        setCanvas: setCanvas,
        clear: clear,
        drawQuad: drawQuad,
        drawCircle: drawCircle,
        drawText: drawText,
        drawImage: drawImage,
        getCanvasRect: getCanvasRect
    };

}(window, ethon));
