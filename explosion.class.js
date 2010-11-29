/**
  Class explosion
*/

Explosion.prototype = new Object2D();

function Explosion(x, y, n) {
  Object2D.call(this, x, y, 0, 0);

  this.particles = new Array();
  for(var i = 0; i < n; i++) {
    var vx = rand(3);
    var vy = rand(3);
    if(rand(100)%2 == 0) {
      vx = -vx;
    }
    if(rand(100)%2 == 0) {
      vy = -vy;
    }

    var particle = new Particle(this.pos, vx, vy, rand(3), rand(60), rand(3), 213-rand(10), 243, 255);
    this.particles.push(particle);
  }
  this.n_particles = n;
}

Explosion.prototype.draw = function(render) {
  for(var i in this.particles) {
    this.particles[i].draw(render);
  }
}

Explosion.prototype.update = function() {
  var allDead = true;
  for(var i in this.particles) {
    this.particles[i].update();
    if(this.particles[i].alive) {
      allDead = false;
    }
  }

  this.alive = !allDead;
}
