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
    if(rand(0,100)%2 == 0) {
      vel.x = -vel.x;
    }
    if(rand(0,100)%2 == 0) {
      vel.y = -vel.y;
    }

    var particle = new Particle(this.pos, vel, 
        rand(1,4), rand(1,10), rand(3,5), 
        rand(0,255),rand(0,255),rand(0,255));
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

