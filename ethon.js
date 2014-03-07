
/*jslint browser: true*/
/*global define*/

/**
 * Provides a polyfill function for requestAnimationFrame
 * 
 * @class request_animation_frame
 */
define('ethon/request_animation_frame',[],function () {
    

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        }());
    }

    return function (callback) {
        window.requestAnimationFrame(callback);
    };
});

/*global define*/

/**
 * Provides a simple function for build new functions
 * based on a given function and the object who will be this
 * object.
 *
 * @class proxy
 */
define('ethon/proxy',[],function () {
    

    return function (object, method) {
        return function () {
            method.apply(object, arguments);
        };
    };
});

/*global define*/

/**
 * Provides a method to inherit objects.
 * Examples:
 * 
 * inherit(Dog, Animal);
 *
 * @class inherit
 */
define('ethon/inherit',[],function () {
    

    function F() {}

    return function (fn, superFn) {
        F.prototype = superFn.prototype;
        fn.prototype = new F();
        fn.prototype.constructor = fn;
    };
});

/*global define*/

/**
 * Provides an object to store all event listeners.
 *
 * @class event_galaxy
 */
define('ethon/event_galaxy',[],function () {
    

    var eventEmitters = {};

    function register(event, eventEmitter) {
        eventEmitters[event] = eventEmitters[event] || [];
        if (eventEmitters[event].indexOf(eventEmitter) === -1) {
            eventEmitters[event].push(eventEmitter);
        }
    }

    function emit(event, args) {
        var i, l,
            localEventEmitters = eventEmitters[event];


        args.unshift(event);
        if (localEventEmitters !== undefined) {
            for (i = 0, l = localEventEmitters.length; i < l; i += 1) {
                localEventEmitters[i].emit.apply(localEventEmitters[i], args);
            }
        }
    }

    return {
        register: register,
        emit: emit
    };

});

/*global define*/

/**
 * Provides an object that can be extended for listen 
 * and trigger custom events.
 *
 * @class event_emitter
 * @requires event_moderator
 */
define('ethon/event_emitter',['require','ethon/event_galaxy'],function (require) {
    

    var eventGalaxy = require("ethon/event_galaxy"),
        EventEmitter;

    EventEmitter = function () {
        this.listeners = {};
    };

    /**
     * Register a new callback for the given event.
     *
     * @method on
     * @param {String} event Identifier of event to listen
     * @param {Function} callback Function to be executed when
     * event is triggered.
     */
    EventEmitter.prototype.on = function (event, callback) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);
        eventGalaxy.register(event, this);
    };

    /**
     * Trigger an event passing an arbitrary number of arguments.
     *
     * @method trigger
     * @param {String} event Identifier of event to trigger
     */
    EventEmitter.prototype.emit = function (event) {
        var i, l,
            args = Array.prototype.slice.call(arguments, 1),
            callbacks = this.listeners[event];

        // Check for existing callbacks for this event
        if (callbacks !== undefined) {
            for (i = 0, l = callbacks.length; i < l; i += 1) {
                callbacks[i].apply(null, args);
            }
        }
    };

    // Alias function
    EventEmitter.prototype.trigger = EventEmitter.prototype.emit;
    /**
     * Trigger an event passing an arbitrary number of arguments.
     * Call all listeners for all objects registered to this event.
     *
     * @method broadcast
     * @param {String} event Identifier of event to trigger
     */
    EventEmitter.prototype.broadcast = function (event) {
        var args = Array.prototype.slice.call(arguments, 1);
        eventGalaxy.emit(event, args);
    };

    return EventEmitter;
});

/*global define*/

/**
 * Provides methods for using HTML5 API Canvas
 *
 * @class render_assistant
 */
define('ethon/render_assistant',[],function () {
    

    var RenderAssistant;

    RenderAssistant = function (canvas, width, height) {
        this.canvas = canvas;
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.zIndex = 1;
        this.ctx = this.canvas.getContext("2d");
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
    RenderAssistant.prototype.drawSubImage = function (x, y, image, frameId, frameWidth, frameHeight) {
        var sx,
            sy,
            rows,
            cols;

        cols = (image.width / frameWidth);
        rows = (image.height / frameHeight);

        sx = (frameId % cols) * frameWidth;
        sy = Math.floor(frameId / cols) * frameHeight;

        this.ctx.drawImage(image, sx, sy, frameWidth, frameHeight, x, y, frameWidth, frameHeight);
    };

    RenderAssistant.prototype.setOptions = function (options) {
        options = options || { mobile: false };
        this.mobile = options.mobile;
    };

    return RenderAssistant;
});

/*global define*/

/**
 * Provides a circle shape for testing collisions.
 *
 * @class CircleBody
 */
define('ethon/circle_body',[],function () {
    

    /**
     * Initialize a CircleBody
     *
     * @method CircleBody
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     * @param {Number} r Radius
     */
    var CircleBody = function (x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    };

    return CircleBody;
});

/*global define*/

/**
 * Provides a quad shape for testing collisions.
 *
 * @class QuadBody
 */
define('ethon/quad_body',[],function () {
    

    /**
     * Initialize a QuadBody
     *
     * @method QuadBody
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     * @param {Number} w Width of the shape
     * @param {Number} h Height of the shape
     * @param {String} collisionGroup Identifier of the collision group. Used
     * on collision testing.
     */
    var QuadBody = function (x, y, w, h, collisionGroup) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.collisionGroup = collisionGroup;
    };

    return QuadBody;
});

/*global define*/

/**
 * Provides methods for checking collisions quad vs quad,
 * quad vs circle and circle vs circle
 *
 * @class physics_assistant
 * @requires CircleBody
 * @requires QuadBody
 */
define('ethon/physics_assistant',['require','ethon/circle_body','ethon/quad_body'],function (require) {
    

    var CircleBody = require("ethon/circle_body"),
        QuadBody   = require("ethon/quad_body");

    /**
     * Checks for a collision between two quads
     *
     * @method quadsCollision
     * @param {Object} quad_1 Quad-like object 
     * @param {Object} quad_2 Quad-like object 
     */
    function quadsCollision(quad_1, quad_2) {
        var x1_1, y1_1, x1_2, y1_2,
            x2_1, y2_1, x2_2, y2_2;

        x1_1 = quad_1.x;
        y1_1 = quad_1.y;
        x2_1 = quad_1.x + quad_1.w;
        y2_1 = quad_1.y + quad_1.h;
        x1_2 = quad_2.x;
        y1_2 = quad_2.y;
        x2_2 = quad_2.x + quad_2.w;
        y2_2 = quad_2.y + quad_2.h;

        return (x1_1 < x2_2) && (x2_1 > x1_2) && (y1_1 < y2_2) && (y2_1 > y1_2);
    }

    /**
     * Checks for a collision between two circles, using
     * center distance compared to the radius sum.
     *
     * @method circlesCollision
     * @param {Object} circle_1 Circle-like object
     * @param {Object} circle_2 Circle-like object
     */
    function circlesCollision(circle_1, circle_2) {
        var dist;

        dist = Math.sqrt(Math.pow(circle_1.x - circle_2.x, 2) +
                Math.pow(circle_1.y - circle_2.y, 2));

        return dist < (circle_1.r + circle_2.r);
    }

    /**
     * Checks for a collision between a circle and a quad
     * Source: http://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection
     *
     * @method circleQuadCollision
     * @param {Object} circle Circle-like object
     * @param {Object} quad Quad-like object
     */
    function circleQuadCollision(circle, quad) {
        var dist, cornerDist;
        // Set quad x and y to the center
        quad.x = quad.x + quad.w / 2;
        quad.y = quad.y - quad.h / 2;

        // Compute distances
        dist = {
            x: Math.abs(circle.x - quad.x),
            y: Math.abs(circle.y - quad.y)
        };
        cornerDist = Math.pow(dist.x - quad.w / 2, 2) + Math.pow(dist.y - quad.h / 2, 2);

        // Restore quad x and y to the top left corner
        quad.x = quad.x - quad.w / 2;
        quad.y = quad.y + quad.h / 2;

        if ((dist.x > (quad.w / 2 + circle.r)) || (dist.y > (quad.h / 2 + circle.r))) {
            return false;
        }
        if ((dist.x <= (quad.w / 2)) || (dist.y <= (quad.h / 2))) {
            return true;
        }

        return (cornerDist <= (Math.pow(circle.r, 2)));
    }

    /**
     * Checks for a collision between two souls based on their body
     *
     * @method soulsCollision
     * @param {Object} soul1
     * @param {Object} soul2
     */
    function soulsCollision(soul1, soul2) {
        var body1 = soul1.getBody(),
            body2 = soul2.getBody(),
            result = false;

        // If any body is null return false because the collision
        // is impossible.
        if (body1 === null || body2 === null) {
            return false;
        }

        // Set temporary position for bodies
        body1.x += soul1.getPosition().x;
        body1.y += soul1.getPosition().y;
        body2.x += soul2.getPosition().x;
        body2.y += soul2.getPosition().y;

        if (body1 instanceof CircleBody) {
            if (body2 instanceof CircleBody) {
                result = circlesCollision(body1, body2);
            } else if (body2 instanceof QuadBody) {
                result = circleQuadCollision(body1, body2);
            } else {
                throw "TypeError";
            }
        } else if (body1 instanceof QuadBody) {
            if (body2 instanceof CircleBody) {
                result = circleQuadCollision(body2, body1);
            } else if (body2 instanceof QuadBody) {
                result = quadsCollision(body1, body2);
            } else {
                throw "TypeError";
            }
        }

        // Restore body position
        body1.x -= soul1.getPosition().x;
        body1.y -= soul1.getPosition().y;
        body2.x -= soul2.getPosition().x;
        body2.y -= soul2.getPosition().y;

        return result;
    }

    return {
        quadsCollision: quadsCollision,
        circlesCollision: circlesCollision,
        circleQuadCollision: circleQuadCollision,
        soulsCollision: soulsCollision
    };
});

/*jslint browser: true*/
/*global define*/

/**
 * Provides methods for keyboard and mouse interaction.
 *
 * @class input_assistant
 * @requires event_emitter
 */
define('ethon/input_assistant',['require','ethon/event_emitter','ethon/physics_assistant','ethon/inherit','ethon/proxy','jquery'],function (require) {
    

    var EventEmitter     = require("ethon/event_emitter"),
        physicsAssistant = require("ethon/physics_assistant"),
        inherit          = require("ethon/inherit"),
        proxy            = require("ethon/proxy"),
        $                = require("jquery"),
        lut = {
            32: "KEY_SPACEBAR",
            37: "KEY_LEFT_ARROW",
            38: "KEY_UP_ARROW",
            39: "KEY_RIGHT_ARROW",
            40: "KEY_DOWN_ARROW",
            65: "KEY_A",
            66: "KEY_B",
            77: "KEY_M",
            83: "KEY_S",
            0:  "MOUSE_LEFT",
            2:  "MOUSE_RIGHT"
        },
        reservedLut = {
            32: "KEY_SPACEBAR",
            37: "KEY_LEFT_ARROW",
            38: "KEY_UP_ARROW",
            39: "KEY_RIGHT_ARROW",
            40: "KEY_DOWN_ARROW"
        },
        InputAssistant;

    // Helper functions for manage events
    // Read document events and prevent default behavior
    function dismissEvent(event) {
        if ((event.target && event.target.tagName !== "INPUT") && event.preventDefault) {
            event.preventDefault();
            //event.stopPropagation();
        }
    }

    function onmousemove(inputAssistant, event) {
        inputAssistant.mouse.x = event.clientX;
        inputAssistant.mouse.y = event.clientY;
        inputAssistant.emit("mousemotion", inputAssistant.mouse);
    }

    function onmousedown(inputAssistant, event) {
        inputAssistant.mouse.x = event.clientX;
        inputAssistant.mouse.y = event.clientY;
        if (event.button === undefined) {
            event.button = 0; // FORCE MOUSE_LEFT if touch event
        }
        inputAssistant.mouse.buttons[event.button] = true;
        inputAssistant.emit("mousedown", inputAssistant.mouse, lut[event.button]);
        dismissEvent(event);
    }

    function onmouseup(inputAssistant, event) {
        inputAssistant.mouse.x = event.clientX;
        inputAssistant.mouse.y = event.clientY;
        if (event.button === undefined) {
            event.button = 0; // FORCE MOUSE_LEFT if touch event
        }
        inputAssistant.mouse.buttons[event.button] = false;
        inputAssistant.emit("mouseup", inputAssistant.mouse, lut[event.button]);
    }

    function reservedKey(keyCode) {
        var key;
        for (key in reservedLut) {
            if (reservedLut.hasOwnProperty(key) && parseInt(key, 10) === keyCode) {
                return true;
            }
        }
        return false;
    }

    function onkeydown(inputAssistant, event) {
        inputAssistant.keys[event.keyCode] = true;
        inputAssistant.emit("keydown", lut[event.keyCode]);
        clearInterval(inputAssistant.emitters[event.keyCode]);
        inputAssistant.emitters[event.keyCode] = setInterval(function () {
            inputAssistant.emit("keydown", lut[event.keyCode]);
        }, 1000 / 60);

        if (reservedKey(event.keyCode)) {
            dismissEvent(event);
        }
    }

    function onkeyup(inputAssistant, event) {
        inputAssistant.keys[event.keyCode] = false;
        inputAssistant.emit("keyup", lut[event.keyCode]);
        clearInterval(inputAssistant.emitters[event.keyCode]);
    }

    InputAssistant = function (canvas) {
        EventEmitter.call(this);
        this.canvas = canvas;

        if ('ontouchstart' in document.documentElement) {
            var lastTouch = null;

            $(canvas).on("touchstart", proxy(this, function (event) {
                onmousedown(this, event.originalEvent.touches[0]);
                dismissEvent(event);
            }));

            $(canvas).on("touchmove", proxy(this, function (event) {
                lastTouch = event.originalEvent.touches[0];
                onmousemove(this, lastTouch);
                dismissEvent(event);
            }));

            $(canvas).on("touchend", proxy(this, function (event) {
                if (lastTouch) {
                    onmouseup(this, lastTouch);
                    dismissEvent(event);
                    lastTouch = null;
                }
            }));
        } else {
            $(canvas).on("mousedown", proxy(this, function (event) {
                onmousedown(this, event);
            }));

            $(canvas).on("mousemove", proxy(this, function (event) {
                onmousemove(this, event);
            }));

            $(canvas).on("mouseup", proxy(this, function (event) {
                onmouseup(this, event);
            }));
        }

        $(canvas).on("contextmenu", proxy(this, function (event) {
            dismissEvent(event);
        }));

        // Register events callbacks
        $('body').on("keydown", proxy(this, function (event) {
            onkeydown(this, event);
        }));

        $('body').on("keyup", proxy(this, function (event) {
            onkeyup(this, event);
        }));

        this.keys = [];
        this.emitters = {};
        this.mouse = {
            x: -1,
            y: -1,
            buttons: []
        };
    };
    inherit(InputAssistant, EventEmitter);

    /**
     * Check if a key is pressed.
     *
     * @method isKeyPresseD
     * @param {String} keyCode Identifier of the key. See lut object.
     * @return true when key is pressed. 
     */
    InputAssistant.prototype.isKeyPressed = function (keyCode) {
        keyCode = lut[keyCode];
        return this.keys[keyCode];
    };

    /**
     * Returns true when mouse button is pressed
     *
     * @method isMouseButtonPressed
     * @param {String} mouseButton Mouse button identifier
     */
    InputAssistant.prototype.isMouseButtonPressed = function (mouseButton) {
        mouseButton = lut[mouseButton];
        return this.mouse.buttons[mouseButton];
    };

    /**
     * Returns mouse coordinates relative to client window
     *
     * @method getMousePosition
     */
    InputAssistant.prototype.getMousePosition = function () {
        return this.mouse;
    };

    // Helper function for translate mouse coordinates relative to the canvas position.
    InputAssistant.prototype.normalizeMouse = function (mouse) {
        var normalizedMouse = { x: -1, y: -1},
            canvasRect = this.canvas.getBoundingClientRect();

        normalizedMouse.x = mouse.x - canvasRect.left;
        normalizedMouse.y = mouse.y - canvasRect.top;

        return normalizedMouse;
    };

    InputAssistant.prototype.isMouseInsideQuad = function (quad, mouse) {
        var mouseQuad, normalizedMouse = this.normalizeMouse(mouse);

        if (quad.position) {
            quad.x = quad.position.x;
            quad.y = quad.position.y;
        }

        mouseQuad = { x: normalizedMouse.x, y: normalizedMouse.y, w: 1, h: 1 };
        return physicsAssistant.quadsCollision(quad, mouseQuad);
    };

    return InputAssistant;
});

/*global define*/

/**
 * Provides methods to register callback functions when actions
 * like key pressed happens.
 *
 * @class action_dispatcher
 * @requires input_assistant, event_emitter, physics_assistant
 * @requires render_assistant
 */
define('ethon/action_dispatcher',['require','ethon/proxy'],function (require) {
    

    var proxy            = require("ethon/proxy"),
        ActionDispatcher;

    ActionDispatcher = function (inputAssistant) {
        this.inputAssistant = inputAssistant;
    };

    /**
     * Register a callback function to be invoked when the given
     * key is pressed.
     *
     * @method registerKeyboardAction
     * @param {String} key Key identifier
     * @param {Function} callbackPressed Function to be invoked when action happens
     * @param {Function} callbackReleased (Optional) Function to be invoked when key is released
     */
    ActionDispatcher.prototype.registerKeyboardAction = function (key, callbackPressed, callbackReleased) {
        this.inputAssistant.on("keydown", proxy(this, function (keyPressed) {
            if (key === keyPressed) {
                callbackPressed();
            }
        }));

        if (callbackReleased !== undefined) {
            this.inputAssistant.on("keyup", proxy(this, function (keyReleased) {
                if (key === keyReleased) {
                    callbackReleased();
                }
            }));
        }
    };


    /**
     * Register a callback function to be invoked when mouse
     * moves over a quad.
     *
     * @method registerMouseMotionAction
     * @param {Object} quad Quad-like object with position and dimensions
     * @param {Function} callback Function to be invoked when action happens
     */
    ActionDispatcher.prototype.registerMouseMotionAction = function (quad, callback) {
        this.inputAssistant.on("mousemotion", proxy(this, function (mouse) {
            if (this.inputAssistant.isMouseInsideQuad(quad, mouse)) {
                callback(this.inputAssistant.normalizeMouse(mouse));
            }
        }));
    };

    /**
     * Register a callback function to be invoked when mouse
     * clicks inside a quad.
     *
     * @method registerMouseClickAction
     * @param {String} button Button identifier
     * @param {Object} quad Quad-like object with position and dimensions
     * @param {Function} callback Function to be invoked when action happens
     */
    ActionDispatcher.prototype.registerMouseClickAction = function (button, quad, callback) {
        this.inputAssistant.on("mousedown", proxy(this, function (mouse, buttonPressed) {
            if (button === buttonPressed) {
                if (this.inputAssistant.isMouseInsideQuad(quad, mouse)) {
                    callback(this.inputAssistant.normalizeMouse(mouse));
                }
            }
        }));
    };

    /**
     * Register a callback function to be invoked when mouse
     * button is released inside a quad.
     *
     * @method registerMouseReleaseAction
     * @param {String} button Button identifier
     * @param {Object} quad Quad-like object with position and dimensions
     * @param {Function} callback Function to be invoked when action happens
     */
    ActionDispatcher.prototype.registerMouseReleaseAction = function (button, quad, callback) {
        this.inputAssistant.on("mouseup", proxy(this, function (mouse, buttonReleased) {
            if (button === buttonReleased) {
                if (this.inputAssistant.isMouseInsideQuad(quad, mouse)) {
                    callback(this.inputAssistant.normalizeMouse(mouse));
                }
            }
        }));
    };

    return ActionDispatcher;
});

/*global define*/

/**
 * Minimum object used on a game.
 *
 * Represents a single point on a specific position
 * with a specific velocity.
 *
 * @class Soul
 * @extends event_emitter
 * @requires extend 
 */
define('ethon/soul',['require','ethon/inherit','ethon/event_emitter'],function (require) {
    

    var inherit      = require("ethon/inherit"),
        EventEmitter = require("ethon/event_emitter"),
        Soul;


    /**
     * Initialize name and position.
     *
     * @method Soul
     * @param {String} name Soul's identifier in game
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     */
    Soul = function (name, x, y) {
        EventEmitter.call(this);
        this.name = name;
        this.position = { x: x, y: y };
        this.velocity = { x: 0, y: 0 };
        this.body = null;
        this.collisionMap = null;
        this.checkCollision = true;
        this.remove = false;
    };

    // inherit EventEmitter for register and trigger custom events.
    inherit(Soul, EventEmitter);

    /**
     * Sets the soul position.
     *
     * @method setPosition
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     */
    Soul.prototype.setPosition = function (x, y) {
        this.position.x = x;
        this.position.y = y;
    };

    /**
     * Return the position vector
     * 
     * @method getPosition
     * @return The position of the soul
     */
    Soul.prototype.getPosition = function () {
        return this.position;
    };

    /**
     * Set the soul velocity given x and y
     *
     * @method setVelocity
     * @param {Number} x Velocity on the x-axis
     * @param {Number} y Velocity on the y-axis
     */
    Soul.prototype.setVelocity = function (x, y) {
        this.velocity.x = x;
        this.velocity.y = y;
    };

    /**
     * Return the velocity vector
     *
     * @method getVelocity
     * @return The velocity of the soul
     */
    Soul.prototype.getVelocity = function () {
        return this.velocity;
    };

    /**
     * Add vector to velocity vector
     *
     * @method addVelocity
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     */
    Soul.prototype.addVelocity = function (x, y) {
        this.velocity.y += x;
        this.velocity.y += y;
    };

    /**
     * Set the soul body for checking collisions.
     * 
     * @method setBody
     * @param {Object} body
     */
    Soul.prototype.setBody = function (body) {
        this.body = body;
    };

    /**
     * Return the soul body
     *
     * @method getBody
     * @return The soul body
     */
    Soul.prototype.getBody = function () {
        return this.body;
    };

    /**
     * Return the soul name
     *
     * @method getName
     * @return The soul name
     */
    Soul.prototype.getName = function () {
        return this.name;
    };

    /**
     * Set map to check collision against it.
     *
     * @method setCollisionMap
     * @param {CollisionMap} map
     */
    Soul.prototype.setCollisionMap = function (map) {
        this.collisionMap = map;
    };

    /**
     * Update the soul position based on current velocity.
     * Check collision against collision map and restore
     * position if collides.
     *
     * @method update
     * @param {Number} dt Milliseconds passed since last update
     */
    Soul.prototype.update = function (dt) {
        var x, y, collision;

        x = this.position.x + this.velocity.x * dt;
        y = this.position.y + this.velocity.y * dt;

        // Check collision against map if needed
        if (this.checkCollision && this.body !== null && this.collisionMap !== null) {
            collision = this.collisionMap.checkCollision(this);
            // Restore position if collision
            if (collision.x) {
                x = Math.round(this.position.x);
                if (this.velocity.x > 0) {
                    x -= x % 20;
                }
            }
            if (collision.y) {
                y = Math.round(this.position.y);
                y -= y % 20;
            }
        }

        this.position.x = x;
        this.position.y = y;
    };

    /**
     * Mark soul to be destroyed on the next loop.
     *
     * @method destroy
     */
    Soul.prototype.destroy = function () {
        this.remove = true;
    };

    return Soul;
});

/*jslint browser: true*/
/*global define*/

/**
 * Core class for all game scenes
 *
 * @class Scene
 * @requires physics_assistant
 * @requires extend
 * @requires event_emitter
 */

define('ethon/scene',['require','ethon/physics_assistant','ethon/inherit','ethon/event_emitter','ethon/soul','ethon/quad_body'],function (require) {
    

    var physicsAssistant = require("ethon/physics_assistant"),
        inherit          = require("ethon/inherit"),
        EventEmitter     = require("ethon/event_emitter"),
        Soul             = require("ethon/soul"),
        QuadBody         = require("ethon/quad_body"),
        Scene;

    /**
     * Constructor
     */
    Scene = function (game) {
        EventEmitter.call(this);
        this.game = game;
        this.souls = [];
    };

    // inherit EventEmitter for register and trigger custom events.
    inherit(Scene, EventEmitter);

    /**
     * TODO:
     *
     * @method init
     */
    Scene.prototype.init = function () {
        
    };

    /**
     * TODO:
     *
     * @method enter
     */
    Scene.prototype.enter = function () {
        
    };

    /**
     * TODO:
     *
     * @method exit
     */
    Scene.prototype.exit = function () {
        
    };

    /**
     * Add Soul for being processed by the game.
     *
     * @method addSoul
     * @param {Object} soul Soul to be added on the game loop.
     */
    Scene.prototype.addSoul = function (soul) {
        this.souls.push(soul);
    };

    /**
     * Update souls and check collisions between them.
     *
     * @method update
     */
    Scene.prototype.update = function (dt) {
        var i, l, j, ll, soul1, soul2;

        // Update all souls
        for (i = 0, l = this.souls.length; i < l; i += 1) {
            if (this.souls[i].remove) {
                this.souls.splice(i, 1);
                i -= 1;
                break;
            }
            this.souls[i].updateOrder = i;
            this.souls[i].update(dt);
        }

        // Check souls collisions
        for (i = 0, l = this.souls.length; i < l; i += 1) {
            if (this.souls[i].checkCollision) {
                for (j = 0, ll = this.souls.length; j < ll; j += 1) {
                    soul1 = this.souls[i];
                    soul2 = this.souls[j];

                    // Check for souls collision
                    // 
                    // If souls collide custom events are triggered based on souls name.
                    if (soul1 !== soul2) {
                        if (physicsAssistant.soulsCollision(soul1, soul2)) {
                            // Trigger event for name - name
                            this.trigger("collision_" + soul1.getName() + "_" + soul2.getName(), soul1, soul2);

                            // Trigger event for name - group
                            if (soul2.getBody().collisionGroup !== undefined) {
                                this.trigger("collision_" + soul1.getName() + "_" + soul2.getBody().collisionGroup, soul1, soul2);

                                // Trigger event for group - group
                                if (soul1.getBody().collisionGroup !== undefined) {
                                    this.trigger("collision_" + soul1.getBody().collisionGroup + "_" + soul2.getBody().collisionGroup, soul1, soul2);
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    /**
     * TODO:
     *
     * @method afterUpdate
     */
    Scene.prototype.afterUpdate = function () {
        
    };

    /**
     * TODO: 
     * Render map, souls and GUI in strict order. Use requestAnimationFrame for better
     * performance.
     *
     * @method render
     */
    Scene.prototype.render = function render(renderAssistant) {
        var i, l;

        // Clear the canvas
        renderAssistant.clear();

        // Render the map
        //map.render();

        // Render all souls
        for (i = 0, l = this.souls.length; i < l; i += 1) {
            this.souls[i].renderOrder = i;
            this.souls[i].render(renderAssistant);
        }

        // Render GUI
        //gui.render();
    };

    /**
     * TODO:
     *
     * @method afterUpdate
     */
    Scene.prototype.afterRender = function () {
        
    };

    /**
     * TODO:
     *
     */
    Scene.prototype.removeSoulsByGroup = function (group) {
        var i, l;

        for (i = 0, l = this.souls.length; i < l; i += 1) {
            if (this.souls[i] && this.souls[i].getBody() && this.souls[i].getBody().collisionGroup === group) {
                this.souls.splice(i, 1);
                i -= 1;
            }
        }
    };

    /**
     * TODO:
     *
     */
    Scene.prototype.removeSoulsByName = function (name) {
        var i, l;

        for (i = 0, l = this.souls.length; i < l; i += 1) {
            if (this.souls[i] && this.souls[i].name === name) {
                this.souls.splice(i, 1);
                i -= 1;
                break;
            }
        }
    };


    Scene.prototype.checkCollisionSoulMouse = function (mouse, onCollision, onNoCollision) {
        var i, l, mouseSoul;

        mouseSoul = new Soul("mouse", mouse.x, mouse.y);
        mouseSoul.setBody(new QuadBody(0, 0, 1, 1));

        for (i = 0, l = this.souls.length; i < l; i += 1) {
            if (physicsAssistant.soulsCollision(mouseSoul, this.souls[i])) {
                onCollision(this.souls[i]);
            } else {
                if (onNoCollision) {
                    onNoCollision(this.souls[i]);
                }
            }
        }
    };

    /**
     * TODO:
     *
     */
    Scene.prototype.onMouseDown = function (mouse) {
        this.checkCollisionSoulMouse(mouse, function (soul) {
            soul.emit("click", mouse);
            soul.emit("mousedown", mouse);
        });
        this.emit("mousedown", mouse);
    };

    Scene.prototype.onMouseMove = function (mouse) {
        this.checkCollisionSoulMouse(mouse, function (soul) {
            soul.emit("mousemove", mouse);
            if (!soul.mousein) {
                soul.emit("mousein", mouse);
                soul.mousein = true;
            }
        }, function (soul) {
            if (soul.mousein) {
                soul.emit("mouseout", mouse);
                soul.mousein = false;
            }
        });
        this.emit("mousemove", mouse);
    };

    Scene.prototype.onMouseUp = function (mouse) {
        this.checkCollisionSoulMouse(mouse, function (soul) {
            soul.emit("mouseup", mouse);
        });
        this.emit("mouseup", mouse);
    };

    return Scene;
});

/*jslint browser: true*/
/*global define*/

/**
 * Provides methods for loading and storing resources
 * for a further usage.
 *
 * @class resource_assistant
 */
define('ethon/resource_assistant',['require','jquery','ethon/scene'],function (require) {
    

    var settings     = {},
        imagesToLoad = 0,
        imagesLoaded = 0,
        soundsToLoad = 0,
        soundsLoaded = 0,
        images       = {},
        sounds       = {},
        files        = {},
        $            = require('jquery'),
        Scene        = require("ethon/scene");

    /**
     * Load an image and store it for a further usage.
     * A callback is called when the image is ready.
     *
     * @method loadImage
     * @param {String} path Image's path 
     * @param {Function} callback Function to be called when the 
     * imageresource is loaded.
     */
    function loadImage(path, callback) {
        var image = new window.Image();

        image.src = path;
        $(image).on("load", function () {
            callback(image);
        });
    }

    /**
     * Load an sound and store it for a further usage.
     * A callback is called when the sound is ready.
     *
     * @method loadSound
     * @param {String} path Sound's path 
     * @param {Function} callback Function to be called when the 
     * sound resource is loaded.
     */
    function loadSound(path, callback) {
        var sound = new window.Audio();

        sound.src = path;
        sound.type = "audio/mpeg";
        sound.load();
        $(sound).on("loadedmetadata", function () {
            callback(sound);
        });
    }

    /**
     * TODO
     */
    function loadAssets(object) {
        var prop,
            imageLoadedCallback = function (object, prop) {
                return function (image) {
                    imagesLoaded += 1;
                    images[prop] = image;
                };
            },
            soundLoadedCallback = function (object, prop) {
                return function (sound) {
                    soundsLoaded += 1;
                    sounds[prop] = sound;
                };
            };

        for (prop in object) {
            if (object.hasOwnProperty(prop)) {
                switch(object[prop].type) {
                    case "image":
                        imagesToLoad += 1;
                        loadImage(object[prop].url, imageLoadedCallback(object, prop));
                        break;
                    case "sound":
                        soundsToLoad += 1;
                        loadSound(object[prop].url, soundLoadedCallback(object, prop));
                        break;
                    default:
                        files[prop] = object[prop].url;
                        break;
                }
            }
        }
    }

    /**
     * TODO
     */
    function loadSettings(game, value, callback) {
        //console.log("Start load settings...");
        var loadingAssetsInterval,
            loadingAssetsCallback = function () {
                //console.log("Loading assets: " + imagesLoaded + "/" + imagesToLoad + " images and " + soundsLoaded + "/" + soundsToLoad + " sounds...");
                game.broadcast("loading_progress", ((imagesLoaded + soundsLoaded) / (imagesToLoad + soundsToLoad)) * 100);
                if (imagesToLoad === imagesLoaded && soundsToLoad === soundsLoaded) {
                    clearInterval(loadingAssetsInterval);
                    callback();
                }
            };

        if (typeof value === 'string') {
            settings = JSON.parse(value);
        } else {
            settings = value;
        }

        loadAssets(settings.assets);
        loadingAssetsInterval = setInterval(loadingAssetsCallback, 500);
    }

    function loadComponents(game, viewId, components) {
        var component, i, l;

        for (i = 0, l = components.length; i < l; i += 1) {
            component = components[i];
            game.gui.addElement(component.type, viewId, component);
        }
    }

    function loadTransitions(game, viewId, transitions) {
        var transition;

        function makeTransition(game, viewId, transition) {
            return function () {
                setTimeout(function () {
                    if (game.activeScene === viewId) {
                        game.setActiveScene(transition.scene);
                    }
                }, transition.delay || 0);
            };
        }

        for (transition in transitions) {
            if (transitions.hasOwnProperty(transition)) {
                game.on(transition, makeTransition(game, viewId, transitions[transition]));
            }
        }
    }

    /**
     * TODO
     */
    function loadGUI(game, callback) {
        var i, l, view;

        for (i = 0, l = settings.gui.length; i < l; i += 1) {
            view = settings.gui[i];

            game.addScene(view.name, new Scene(game));
            loadComponents(game, view.name, view.components);
            loadTransitions(game, view.name, view.transitions);
        }

        callback();
    }

    /**
     * TODO
     */
    function getData(name) {
        return settings.data[name];
    }

    function getImage(name) {
        return images[name];
    }

    function getSound(name) {
        return sounds[name];
    }

    function getFile(name) {
        return files[name];
    }

    return {
        loadSettings: loadSettings,
        loadGUI: loadGUI,
        getData: getData,
        getImage: getImage,
        getSound: getSound,
        getFile: getFile
    };

});

/*jslint browser: true, regexp: true, nomen: true*/
/*global define*/

/**
 * Acts as a container for all GUI elements
 *
 * @class GUI
 * @requires inherit
 * @requires EventEmitter
 * @requires proxy
 */
define('ethon/gui',['require','ethon/inherit','ethon/event_emitter','ethon/proxy','ethon/resource_assistant','ethon/soul','ethon/quad_body','ethon/physics_assistant','jquery'],function (require) {
    

    var inherit           = require("ethon/inherit"),
        EventEmitter      = require("ethon/event_emitter"),
        proxy             = require("ethon/proxy"),
        resourceAssistant = require("ethon/resource_assistant"),
        Soul              = require("ethon/soul"),
        QuadBody          = require("ethon/quad_body"),
        physicsAssistant  = require("ethon/physics_assistant"),
        $                 = require("jquery"),
        GUI;

    String.prototype.camelize = function () {
        var result = this.replace(/(?:^|[\-_])(\w)/g, function (_, c) {
            return c ? c.toUpperCase() : '';
        });
        return result.charAt(0).toLowerCase() + result.slice(1);
    };

    /**
     * Constructor
     *
     * @method GUI
     */
    GUI = function (container) {
        this.$container = $(container);
        this.views = {};
        this.activeView = null;
        this.addView("loading");
        this.addElement("progress", "loading", {
            "name": "loading",
            "pos_x": 297,
            "pos_y": 430,
            "width": 200,
            "height": 15,
            "action": "loading_progress",
            "style": {
                "color": "#000",
                "background-color": "#fff",
                "border": "1px solid #000"
            }
        });
        this.setActiveView("loading");
    };

    GUI.prototype.setOptions = function (options) {
        options = options || { mobile: false };
        this.mobile = options.mobile;
    };

    /**
     * TODO:
     */
    GUI.prototype.addView = function (viewId) {
        var view = document.createElement('div'),
            $view = $(view);

        $view.css('width', this.$container.clientWidth + "px");
        $view.css('height', this.$container.clientHeight + "px");
        $view.css('position', "absolute");
        $view.attr('id', viewId);

        this.views[viewId] = $view;
        this.hideView(viewId);
        this.$container.append(view);
    };

    /**
     * TODO:
     */
    GUI.prototype.hideView = function (viewId) {
        this.views[viewId].css('visibility', "hidden");
    };

    /**
     * TODO:
     */
    GUI.prototype.showView = function (viewId) {
        this.views[viewId].css('visibility', "visible");
    };


    /**
     * Add GUI element for being rendered.
     *
     * @method addElement
     */
    GUI.prototype.addElement = function (category, viewId, elementDesc) {
        if (!elementDesc.mobile || this.mobile) {
            var element;

            switch (category) {
            case "button":
                element = new GUI.Button(elementDesc);
                break;
            case "label":
                element = new GUI.Label(elementDesc);
                break;
            case "background":
                element = new GUI.Background(elementDesc);
                break;
            case "iframe":
                element = new GUI.iFrame(elementDesc);
                break;
            case "link":
                element = new GUI.Link(elementDesc);
                break;
            case "progress":
                element = new GUI.Progress(elementDesc);
                break;
            }

            element.view = this.views[viewId];
            this.views[viewId].rawElements = this.views[viewId].rawElements || [];
            this.views[viewId].rawElements.push(element);
            this.views[viewId].append(element.$el);

            if (element.action && category === "button") {
                element.$el.on("touchstart mousedown", proxy(element, function () {
                    element.isPressed = true;
                    element.broadcast(element.action);
                }));

                if (elementDesc.mobile) {
                    element.$el.on("touchend mouseup", proxy(element, function () {
                        element.isPressed = false;
                        element.broadcast(element.action + "_release");
                    }));

                    $(document).on("touchmove", proxy(element, function (event) {
                        if (element.isPressed) {
                            var lastTouch = event.originalEvent.touches[0],
                                coords = {
                                    x: lastTouch.clientX,
                                    y: lastTouch.clientY
                                },
                                mouseSoul,
                                elementSoul;

                            mouseSoul = new Soul("mouse", coords.x, coords.y);
                            mouseSoul.setBody(new QuadBody(0, 0, 1, 1));

                            elementSoul = new Soul("element", element.posX, element.posY);
                            elementSoul.setBody(new QuadBody(0, 0, element.width, element.height));

                            if (!physicsAssistant.soulsCollision(mouseSoul, elementSoul)) {
                                element.isPressed = false;
                                element.broadcast(element.action + "_release");
                            }
                        }

                        event.preventDefault();
                    }));
                }
            }

            return element;
        }
    };

    GUI.prototype.getElement = function (viewId, elementName) {
        var i, l;

        for (i = 0, l = this.views[viewId].rawElements.length; i < l; i += 1) {
            if (elementName === this.views[viewId].rawElements[i].name) {
                return this.views[viewId].rawElements[i];
            }
        }

        return false;
    };

    /**
     * TODO:
     */
    GUI.prototype.setActiveView = function (viewId) {
        if (this.activeView !== null) {
            this.hideView(this.activeView);
        }
        this.activeView = viewId;
        this.showView(this.activeView);
    };

    /**
     * TODO:
     */
    GUI.Element = function (elementDesc) {
        var image,
            prop,
            value;

        EventEmitter.call(this);

        if (elementDesc.image) {
            image = resourceAssistant.getImage(elementDesc.image);
        }

        this.name = elementDesc.name;
        this.action = elementDesc.action;
        this.posX = parseInt(elementDesc.pos_x, 10);
        this.posY = parseInt(elementDesc.pos_y, 10);
        this.width = parseInt(elementDesc.width, 10);
        this.height = parseInt(elementDesc.height, 10);
        this.$el = $(this.el);
        this.$el.addClass("component");
        this.$el.css('position', "absolute");
        this.$el.css('left', elementDesc.pos_x + "px");
        this.$el.css('top', elementDesc.pos_y + "px");
        this.$el.css('border', "0");
        this.$el.css('padding', "0");
        this.$el.css('z-index', 2);
        this.$el.css('text-indent', elementDesc.style['text-indent']);

        if (elementDesc.image !== "" && elementDesc.image !== undefined && elementDesc.image !== null) {
            this.$el.css("background-image", "url(" + image.src + ")");
            this.$el.css("background-color", "transparent");
        }
        this.$el.css('width', elementDesc.width + "px");
        this.$el.css('height', elementDesc.height + "px");

        for (prop in elementDesc.style) {
            if (elementDesc.style.hasOwnProperty(prop)) {
                value = elementDesc.style[prop];
                if (prop === 'font-size') {
                    value += 'px';
                }

                this.$el.css(prop, value);
            }
        }

        if (elementDesc.text !== undefined && elementDesc.text !== null) {

            var contentEl = document.createElement('div'),
                $contentEl = $(contentEl);

            $contentEl.addClass("content");
            $contentEl.css("display", "table-cell");
            $contentEl.css("text-align", "center");
            $contentEl.css("vertical-align", "middle");
            $contentEl.css("width", this.$el.css("width"));
            $contentEl.css("height", this.$el.css("height"));
            $contentEl.css("text-indent", this.$el.css("text-indent"));
            $contentEl.html(elementDesc.text);

            this.$el.append($contentEl);
        }
    };

    inherit(GUI.Element, EventEmitter);

    GUI.Element.prototype.destroy = function () {
        this.$el.remove();
    };

    GUI.Element.prototype.hide = function () {
        this.$el.css('display', 'none');
    };

    GUI.Element.prototype.show = function () {
        this.$el.css('display', 'block');
    };

    /**
     * TODO:
     */
    GUI.Label = function (labelDesc) {
        this.el = document.createElement('span');
        GUI.Element.call(this, labelDesc);

        this.el.innerHTML = labelDesc.text;

        this.on(labelDesc.action, proxy(this, function (text) {
            this.el.innerHTML = text;
        }));
    };
    inherit(GUI.Label, GUI.Element);

    /**
     * TODO:
     */
    GUI.Button = function (buttonDesc) {
        this.el = document.createElement('button');
        GUI.Element.call(this, buttonDesc);
        this.$el.css('cursor', "pointer");
        this.$el.css('-webkit-tap-highlight-color', 'rgba(0, 0, 0, 0)');
    };
    inherit(GUI.Button, GUI.Element);

    /**
     * TODO:
     */
    GUI.Background = function (backgroundDesc) {
        this.el = document.createElement('div');
        GUI.Element.call(this, backgroundDesc);
        this.$el.css('z-index', 0);
    };
    inherit(GUI.Background, GUI.Element);

    /**
     * TODO:
     */
    GUI.iFrame = function (iFrameDesc) {
        this.el = document.createElement('iframe');
        this.el.scrolling = "no";
        GUI.Element.call(this, iFrameDesc);
        this.$el.css('z-index', 1);

        this.on(iFrameDesc.action, proxy(this, function (url) {
            this.el.src = url;
        }));
    };
    inherit(GUI.iFrame, GUI.Element);

    /**
     * TODO:
     */
    GUI.Link = function (linkDesc) {
        this.el = document.createElement('a');
        this.el.target = "_blank";
        GUI.Element.call(this, linkDesc);
        this.el.href = linkDesc.url || resourceAssistant.getFile(linkDesc.file);
    };
    inherit(GUI.Link, GUI.Element);

    /**
     * TODO:
     */
    GUI.Progress = function (progressDesc) {
        this.progress = document.createElement('div');
        this.$progress = $(this.progress);
        this.el = document.createElement('div');
        GUI.Element.call(this, progressDesc);
        this.$el.append(this.$progress);

        this.$progress.css('width', "0%");
        this.$progress.css('height', this.$el.css('height'));
        this.$progress.css('background', this.$el.css('color'));

        this.on(progressDesc.action, proxy(this, function (value) {
            this.$progress.css('width', value + "%");
        }));
    };
    inherit(GUI.Progress, GUI.Element);

    return GUI;
});

/*jslint browser: true*/
/*global define*/

/**
 * Core class for all games developed using Ethon engine.
 *
 * @class Game
 * @requires request_animation_frame
 * @requires proxy
 * @requires extend
 * @requires event_emitter
 * @requires render_assistant
 * @requires map
 * @requires gui
 */
define('ethon/game',['require','ethon/request_animation_frame','ethon/proxy','ethon/inherit','ethon/event_emitter','ethon/render_assistant','ethon/input_assistant','ethon/action_dispatcher','ethon/resource_assistant','ethon/gui'],function (require) {
    

    var requestAnimationFrame = require("ethon/request_animation_frame"),
        proxy                 = require("ethon/proxy"),
        inherit               = require("ethon/inherit"),
        EventEmitter          = require("ethon/event_emitter"),
        RenderAssistant       = require("ethon/render_assistant"),
        InputAssistant        = require("ethon/input_assistant"),
        ActionDispatcher      = require("ethon/action_dispatcher"),
        resourceAssistant     = require("ethon/resource_assistant"),
        GUI                   = require("ethon/gui"),
        elapsedTime           = new Date(),
        lastUpdate            = new Date(),
        numFrames             = 0,
        fps                   = 60,
        showFPS,
        Game;

    /**
     * Constructor
     *
     * It initialize render_assistant with given canvas.
     *
     * @method Game
     * @param {Object} canvas Canvas object where the game will be rendered.
     * @param {Object} guiElement HTML element where the gui will be rendered.
     * @param {Number} width Canvas width
     * @param {Number} height Canvas height
     * @param {Object} options An options object used for configuration.
     */
    Game = function (canvas, guiElement, width, height, options) {
        var canvasRect;

        EventEmitter.call(this);
        options = options || { showFPS: false };

        this.renderAssistant = new RenderAssistant(canvas, width, height);
        this.inputAssistant = new InputAssistant(canvas);
        this.actionDispatcher = new ActionDispatcher(this.inputAssistant);
        this.guiElement = guiElement;

        this.gui = new GUI(this.guiElement);
        this.scenes = {};
        this.activeScene = null;
        this.gameLoaded = false;

        showFPS = options.showFPS;

        canvasRect = this.renderAssistant.getCanvasRect();
        this.actionDispatcher.registerMouseClickAction("MOUSE_LEFT", {
            x: 0,
            y: 0,
            w: canvasRect.width,
            h: canvasRect.height
        }, proxy(this, this.onMouseDown));

        this.actionDispatcher.registerMouseMotionAction({
            x: 0,
            y: 0,
            w: canvasRect.width,
            h: canvasRect.height
        }, proxy(this, this.onMouseMove));

        this.actionDispatcher.registerMouseReleaseAction("MOUSE_LEFT", {
            x: 0,
            y: 0,
            w: canvasRect.width,
            h: canvasRect.height
        }, proxy(this, this.onMouseUp));
    };

    // inherit EventEmitter for register and trigger custom events.
    inherit(Game, EventEmitter);

    // Helper function for update FPS calculation
    function updateFPS() {
        var now = new Date(),
            dt = new Date(now.getTime() - lastUpdate.getTime()).getMilliseconds() / 1000;

        numFrames += 1;

        // Update fps counter every 0.5 seconds
        if (dt > 0.5) {
            fps = Math.floor(numFrames / dt);
            lastUpdate = now;
            numFrames = 0;
        }
    }

    /**
     * TODO:
     * @method addScene
     */
    Game.prototype.addScene = function (name, scene) {
        this.scenes[name] = scene;
        this.gui.addView(name);

        if (this.activeScene === null && name !== "loading" && name !== "all") {
            this.setActiveScene(name);
        }
    };

    /**
     * Execute a update-render cycle
     *
     * @method loop
     */
    Game.prototype.loop = function () {
        this.update();
        this.render();
        updateFPS();
        requestAnimationFrame(proxy(this, this.loop));
    };

    /**
     * TODO:
     * Update souls and check collisions between them.
     *
     * @method update
     */
    Game.prototype.update = function () {
        var now           = new Date(),
            dt            = new Date(now.getTime() - elapsedTime.getTime()).getMilliseconds() / 1000;

        this.scenes[this.activeScene].update(dt);
        this.scenes[this.activeScene].afterUpdate(dt);
        elapsedTime = now;
    };

    /**
     * TODO: 
     * Render map, souls and GUI in strict order. Use requestAnimationFrame for better
     * performance.
     *
     * @method render
     */
    Game.prototype.render = function () {
        this.scenes[this.activeScene].render(this.renderAssistant);
        this.scenes[this.activeScene].afterRender(this.renderAssistant);

        if (showFPS) {
            this.renderAssistant.drawText(10, 10, "FPS: " + fps);
        }
    };

    /**
     * Starts the game:
     * - Start the update cycle
     * - Start the render cycle
     *
     * @method start
     */
    Game.prototype.start = function (settings, options) {
        this.gameLoaded = false;
        this.options = options;

        this.renderAssistant.setOptions(this.options);
        this.gui.setOptions(this.options);

        resourceAssistant.loadSettings(this, settings, proxy(this, function () {
            this.gui.getElement("loading", "loading").hide();
            resourceAssistant.loadGUI(this, proxy(this, function () {
                this.broadcast("game_loaded");
                var sceneId;
                for (sceneId in this.scenes) {
                    if (this.scenes.hasOwnProperty(sceneId)) {
                        this.scenes[sceneId].init();
                    }
                }
                this.gui.showView('all');
                requestAnimationFrame(proxy(this, this.loop));
            }));
        }));
    };

    /**
     * Set active scene for render and update cycle
     *
     * @method setActiveScene
     * @param {String} scene Scene's identifier
     */
    Game.prototype.setActiveScene = function (sceneId) {
        // Exit current scene
        if (this.activeScene !== null) {
            this.scenes[this.activeScene].exit();
            this.broadcast("exit_scene_" + this.activeScene);
        }
        // Set active scene
        this.activeScene = sceneId;
        this.gui.setActiveView(sceneId);
        // Enter current scene
        this.broadcast("enter_scene_" + sceneId);
        this.scenes[this.activeScene].enter();
    };

    Game.prototype.getScene = function (sceneId) {
        return this.scenes[sceneId];
    };

    Game.prototype.onMouseDown = function (mouse) {
        if (this.scenes[this.activeScene]) {
            this.scenes[this.activeScene].onMouseDown(mouse);
        }
    };

    Game.prototype.onMouseMove = function (mouse) {
        if (this.scenes[this.activeScene]) {
            this.scenes[this.activeScene].onMouseMove(mouse);
        }
    };

    Game.prototype.onMouseUp = function (mouse) {
        if (this.scenes[this.activeScene]) {
            this.scenes[this.activeScene].onMouseUp(mouse);
        }
    };

    return Game;
});

/*global define*/

/**
 * Provides a Class for handling 2d sprites.
 *
 * @class Sprite
 * @requires soul
 * @requires inherit
 * @requires resource_assistant
 * @requires render_assistant
 */
define('ethon/sprite',['require','ethon/soul','ethon/inherit'],function (require) {
    

    var Soul              = require("ethon/soul"),
        inherit           = require("ethon/inherit"),
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

/*global define*/

/**
 * Provides a method to extend objects. It copies properties
 * from a object to another object.
 *
 * Examples:
 * 
 * extend(Animal.prototype, Dog.prototype);
 * extend(eventEmitter, Dog.prototype);
 *
 * @class extend
 */
define('ethon/extend',[],function () {
    

    return function (object, methods) {
        var o = object || {},
            method;

        for (method in methods) {
            if (methods.hasOwnProperty(method)) {
                o[method] = methods[method];
            }
        }
        return o;
    };
});

define('ethon/particle',['require','ethon/soul','ethon/inherit'],function (require) {
    

    var Soul      = require("ethon/soul"),
        inherit   = require("ethon/inherit"),
        Particle;

    Particle = function (options) {
        var position = options.position || { x: 0, y: 0 };

        Soul.call(this, "Particle", position.x, position.y);

        this.color   = options.color;
        this.texture = options.texture;
    };

    inherit(Particle, Soul);

    Particle.prototype.render = function (renderAssistant) {
        var ctx = renderAssistant.getContext();

        ctx.save();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.translate(this.position.x, this.position.y);
        if (this.texture) {
            ctx.scale(this.size, this.size);
            ctx.drawImage(this.texture, 0, 0);
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
            ctx.fill();
        }
        ctx.restore();
    };

    Particle.prototype.update = function (dt) {
        var i, l;

        for (i = 0, l = this.forces.length; i < l; i += 1) {
            this.position.x += this.forces[i].x * dt;
            this.position.y += this.forces[i].y * dt;
        }

        this.life -= dt;
        if (this.life < 0) {
            this.life = 0;
        }
    };

    Particle.prototype.setLife = function (life) {
        this.maxLife = life;
        this.life = life;
    };

    Particle.prototype.setSize = function (size) {
        if (this.texture) {
            this.size = 0.5 + (size / 10);
        } else {
            this.size = size;
        }
    };

    return Particle;
});

define('ethon/particle_system',['require','ethon/inherit','ethon/soul','ethon/particle'],function (require) {
    
    
    var inherit  = require("ethon/inherit"),
        Soul     = require("ethon/soul"),
        Particle = require("ethon/particle"),
        ParticleSystem;

    function valueOrDefault(value, _default) {
        if (value === null || value === undefined) {
            return _default;
        }
        return value;
    }

    function random (min, max) {
        return min + (~~(Math.random() * (max - min + 1)));
    }

    ParticleSystem = function (options) {
        var position        = valueOrDefault(options.position, { x: 0, y: 0 }),
            nParticles      = valueOrDefault(options.nParticles, 10),
            particleColor   = valueOrDefault(options.particleColor, "#ffffff"),
            particleTexture = valueOrDefault(options.particleTexture, null),
            i,
            particle;

        Soul.call(this, "ParticleSystem", position.x, position.y);

        this.particles            = [];
        this.particleRespawn      = valueOrDefault(options.particleRespawn, false);
        this.minParticleSize      = valueOrDefault(options.minParticleSize, 1);
        this.maxParticleSize      = valueOrDefault(options.maxParticleSize, 5);
        this.minParticleLifeTime  = valueOrDefault(options.minParticleLifeTime, 1);
        this.maxParticleLifeTime  = valueOrDefault(options.maxParticleLifeTime, 4);
        this.minParticleVelocityX = valueOrDefault(options.minParticleVelocityX, -50);
        this.maxParticleVelocityX = valueOrDefault(options.maxParticleVelocityX, 50);
        this.minParticleVelocityY = valueOrDefault(options.minParticleVelocityY, -50);
        this.maxParticleVelocityY = valueOrDefault(options.maxParticleVelocityY, 50);
        this.particleForces       = valueOrDefault(options.particleForces, []);

        for (i = 0; i < nParticles; i += 1) {
            particle = new Particle({
                color: particleColor,
                texture: particleTexture
            });
            this.setParticleState(particle);
            this.particles.push(particle);
        }
    };
    inherit(ParticleSystem, Soul);

    ParticleSystem.prototype.render = function (renderAssistant) {
        var i, l;

        for (i = 0, l = this.particles.length; i < l; i += 1) {
            this.particles[i].render(renderAssistant);
        }
    };

    ParticleSystem.prototype.update = function (dt) {
        var i, l, deadParticles = [];

        for (i = 0, l = this.particles.length; i < l; i += 1) {
            this.particles[i].update(dt);

            if (this.particles[i].life <= 0) {
                if (this.particleRespawn) {
                    this.setParticleState(this.particles[i]);
                } else {
                    deadParticles.push(i);
                }
            }
        }

        for (i = 0, l = deadParticles.length; i < l; i += 1) {
            this.particles.splice(deadParticles[i], 1);
        }

        if (this.particles.length === 0) {
            this.remove = true;
        }
    };

    ParticleSystem.prototype.setParticleState = function (particle) {
        particle.position = { x: this.position.x, y: this.position.y };
        particle.setSize(random(this.minParticleSize, this.maxParticleSize));
        particle.setLife(random(this.minParticleLifeTime, this.maxParticleLifeTime));
        particle.forces =  [
            { 
                x: random(this.minParticleVelocityX, this.maxParticleVelocityX), 
                y: random(this.minParticleVelocityY, this.maxParticleVelocityY)
            }
        ].concat(this.particleForces);
    };

    return ParticleSystem;
});

define('ethon/sound_assistant',['require','jquery','ethon/resource_assistant'],function (require) {
    

    var $                 = require("jquery"),
        resourceAssistant = require("ethon/resource_assistant"),
        enabled           = false,
        muted             = false,
        backgroundMusic   = null;

    function setBackgroundMusic(music) {
        backgroundMusic = resourceAssistant.getSound(music);
        backgroundMusic.volume = 0.5;
        backgroundMusic.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);
    }

    function playBackgroundMusic() {
        if (backgroundMusic && !muted && enabled) {
            backgroundMusic.play();
        }
    }

    function stopBackgroundMusic() {
        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }
    }

    function playSoundEffect(soundEffect) {
        if (!muted && enabled) {
            resourceAssistant.getSound(soundEffect).play();
        }
    }

    function setEnabled (e) {
        enabled = e;
        if (enabled) {
            $('.audio-controls').show();
            $('.audio-controls').on('click', function () {
                toggleMute();
                $('.audio-controls .mute').toggle();
                $('.audio-controls .button').toggle();
                if (muted) {
                    stopBackgroundMusic();
                } else {
                    playBackgroundMusic();
                }
            });
        }
    }

    function toggleMute () {
        muted = !muted;
    }

    return {
        setBackgroundMusic: setBackgroundMusic,
        playBackgroundMusic: playBackgroundMusic,
        stopBackgroundMusic: stopBackgroundMusic,
        playSoundEffect: playSoundEffect,
        setEnabled: setEnabled, 
        toggleMute: toggleMute
    };
});

require(["ethon/game", "ethon/sprite", "ethon/extend", "ethon/particle_system", "ethon/sound_assistant"], function () {
    
});

define("main", function(){});
