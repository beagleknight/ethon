/**
  Class Sprite
*/

var Sprite = new Class({
  Extends: Object2D,

  initialize: function(x, y, w, h) {
    this.parent(x, y, w, h);
    this.frames = new Array();
    this.current = 0;
  },

  draw: function() {
    //render.renderImage(this.frames[this.current], this.pos);
    //Object2D.prototype.draw.call(this,render);
  },

  update: function() {

  },

  add_frame: function() {
    //var img = new Image();
    //img.src = url;
    //this.frames.push(img);
  },

  current_frame: function() {
    //return this.frames[this.current];
  },

  next_frame: function() {
    //this.current = (this.current+1) % this.frames.length;    
  }
});
