/**
  Class explosion
*/

Explosion.prototype = new Object2D();

function Explosion(pos, n) {
  this.alive = true;

  Object2D.call(this, pos.x, pos.y, 0, 0);

  this.particles = new Array();
  for(var i = 0; i < n; i++) {
    var vel = new Vector2D(rand(1,50),rand(1,50));
    if(rand(100)%2 == 0) {
      vel.x = -vel.x;
    }
    if(rand(100)%2 == 0) {
      vel.y = -vel.y;
    }

    //var particle = new Particle(this.pos, vel, rand(3), rand(60), rand(3), 213-rand(10), 243, 255);
    //var particle = new Particle(this.pos, vel, rand(1,3), rand(0,60), rand(0,3), 255,0,0);
    var particle = new Particle(this.pos, vel, 3, 60, 3, 255,0,0);
    this.particles.push(particle);
  }

  this.draw = function() {
    for(var i in this.particles) {
      this.particles[i].draw();
    }
  }

  this.update = function(dt) {
    var allDead = true;
    for(var i in this.particles) {
      this.particles[i].update(dt);
      if(this.particles[i].alive) {
        allDead = false;
      }
    }

    this.alive = !allDead;
  }
}

