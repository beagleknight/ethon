/**
  Class Object2D
*/

var Object2D = new Class({
  initialize: function(x, y, w, h) {
    this.render = $('#game').ethon().render; //Ethon.getInstance().render
    this.pos = new Vector2D(x,y);
    this.vel = new Vector2D(0,0);
    this.w = w;
    this.h = h;
    this.alive = true;
    this.drawBB = false;
  },

  draw: function() {
    //if(this.drawBB) {
    //  render.basicShape(BOX, this.pos, this.w, this.h);
    //}
  },

  update: function() {

  },

  move: function() {
    //this.pos.sum(v);
  },

  insideCanvas: function() {
    //render = Game.getInstance().render;
    //return (this.pos.x > 0) && (this.pos.x < render.canvas_width) && 
    //(this.pos.y > 0) && (this.pos.y < render.canvas_height);
  }
});
