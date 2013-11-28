define(function (require) {
    "use strict";

    var Soul      = require("ethon/soul"),
        inherit   = require("ethon/inherit"),
        Particle;

    Particle = function (options) {
        var position = options.position || { x: 0, y: 0 };

        Soul.call(this, "Particle", position.x, position.y);

        this.color  = options.color;
        this.size   = options.size;
        this.forces = options.forces;
    };

    inherit(Particle, Soul);

    Particle.prototype.render = function (renderAssistant) {
        var ctx = renderAssistant.getContext();

        ctx.save();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.translate(this.position.x, this.position.y);
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
        ctx.fill();
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

    return Particle;
});
