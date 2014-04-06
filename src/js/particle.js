(function () {
    "use strict";

    var Soul      = require("./soul"),
        inherit   = require("./inherit"),
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

    module.exports = Particle;
}());
