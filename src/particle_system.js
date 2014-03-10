define(function (require) {
    "use strict";
    
    var inherit  = require("ethon/inherit"),
        Soul     = require("ethon/soul"),
        Particle = require("ethon/particle"),
        QuadBody = require("ethon/quad_body"),
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

        this.setBody(new QuadBody(0, 0, 0, 0, "particles"));

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
