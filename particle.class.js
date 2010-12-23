/**
  Class particle
*/

Particle.prototype = new Object2D();

function Particle(pos,vel,scale,life,die,r,g,b) {
  this.alive = true;

  Object2D.call(this,pos.x,pos.y,0,0);

  this.ethon = Ethon.getInstance();

  this.vel = vel;
  this.scale = scale;
  this.life = life;
  this.max_life = life;
  this.die = die;
  this.r = r;
  this.g = g;
  this.b = b;

  this.draw = function() {
    var color = 'rgba('+this.r+','+this.g+','+this.b+','+(this.life/this.max_life)+')';
    this.ethon.render_manager.basicShape(CIRCLE, this.pos, 0, 0, this.scale, color);
  }

  this.update = function(dt) {
    this.pos.x = this.pos.x+this.vel.x*dt;
    this.pos.y = this.pos.y+this.vel.y*dt;
    this.life = this.life - this.die;
    this.alive = this.life > 0;
  }
}
