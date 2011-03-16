/**
  Class Vector2D
*/

function Vector2D(x,y) {
  this.x = x;
  this.y = y;

  this.sum = function(v) {
    this.x += v.x;
    this.y += v.y;
  };

  this.module = function() {
    return Math.sqrt((this.x*this.x)+(this.y*this.y));
  };

  this.normalize = function() {
    var module = this.module();
    this.x = this.x/module;
    this.y = this.y/module;
  };
};
