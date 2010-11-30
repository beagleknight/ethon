/**
  Class Sprite
*/

Sprite.prototype = new Object2D();

function Sprite(x,y,w,h) {
  Object2D.call(this, x, y, w, h);
  this.frames = new Array();
  this.current = 0;

  this.draw = function() {
    //render.renderImage(this.frames[this.current], this.pos);
    //Object2D.prototype.draw.call(this,render);
  };

  this.update = function() {

  };

  this.add_frame = function() {
    //var img = new Image();
    //img.src = url;
    //this.frames.push(img);
  };

  this.current_frame = function() {
    //return this.frames[this.current];
  };

  this.next_frame = function() {
    //this.current = (this.current+1) % this.frames.length;    
  };
};
