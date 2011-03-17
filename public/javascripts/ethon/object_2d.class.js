/**
  Class Object2D
*/

var object_id = 0;

function Object2D(x,y,w,h) {
  this.id = object_id++;
  this.pos = new Vector2D(x,y);
  this.vel = new Vector2D(0,0);
  this.w = w;
  this.h = h;

  this.alive = true;
  this.collideWithCanvas = true;
  this.drawBB = true;


  this.draw = function() {
    if(this.drawBB) {
      Ethon.getInstance().render_manager.basicShape(BOX, this.pos, this.w, this.h);
    }
  };

  this.update = function() {
    this.pos.sum(this.vel);
    if(this.collideWithCanvas) {
      if(this.pos.x+this.w > 700 || this.pos.x < 0)
        this.vel.x = -this.vel.x;
      if(this.pos.y+this.h > 700 || this.pos.y < 0)
        this.vel.y = -this.vel.y;
    }
  };
};
