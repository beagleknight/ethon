/**
  Class particle
*/

Particle.prototype = new Object2D();

function Particle(pos,vx,vy,scale,life,die,r,g,b) {
  Object2D.call(this,pos.x,pos.y,0,0);
  this.vx = vx;
  this.vy = vy;
  this.scale = scale;
  this.life = life;
  this.max_life = life;
  this.die = die;
  this.r = r;
  this.g = g;
  this.b = b;
}

Particle.prototype.draw = function(render) {
  var color = 'rgba('+this.r+','+this.g+','+this.b+','+(this.life/this.max_life)+')';
  render.basicShape(CIRCLE, this.pos, 0, 0, this.scale, color);
}

Particle.prototype.update = function() {
  this.move(new Vector2D(this.vx,this.vy))
  this.life = this.life - this.die;
  this.alive = this.life > 0;
}
