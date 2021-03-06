(function () {
    "use strict";

    var physicsAssistant = require("./physics_assistant"),
        inherit          = require("./inherit"),
        EventEmitter     = require("./event_emitter"),
        Soul             = require("./soul"),
        QuadBody         = require("./quad_body"),
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
            if (this.souls[i] && this.souls[i].checkCollision) {
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

    module.exports = Scene;
}());
