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
};
