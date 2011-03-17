/**
  Class Object2D
*/

var object_id = 0;

function Object2D(x,y,w,h) {
  //console.log('Object with id #'+id+' created.');
  this.id = object_id++;
  this.pos = new Vector2D(x,y);
  this.vel = new Vector2D(0,0);
  this.w = w;
  this.h = h;
  this.alive = true;
  this.drawBB = false;

  this.draw = function() {
    //if(this.drawBB) {
    //  render.basicShape(BOX, this.pos, this.w, this.h);
    //}
  };

  this.update = function() {
    this.pos.sum(this.vel);
  };

  this.insideCanvas = function() {
    //render = Game.getInstance().render;
    //return (this.pos.x > 0) && (this.pos.x < render.canvas_width) && 
    //(this.pos.y > 0) && (this.pos.y < render.canvas_height);
  };
};
