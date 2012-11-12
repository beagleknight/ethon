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

define(function (require) {
    "use strict";

    var physicsAssistant = require("ethon/physics_assistant"),
        extend           = require("ethon/extend"),
        eventEmitter     = require("ethon/event_emitter"),
        Scene;

    /**
     * Constructor
     */
    Scene = function (game) {
        this.game = game;
        this.souls = [];
    };

    // Extend Scene with the EventEmitter for register and trigger custom events.
    extend(eventEmitter, Scene.prototype);

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
    Scene.prototype.afterUpdate = function (dt) {
        
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
            this.souls[i].render(renderAssistant);
        }

        // Render GUI
        //gui.render();
    };

    return Scene;
});