/**
  Class Vector2D
*/

var Vector2D = new Class({
  initialize: function(x,y) {
    this.x = x;
    this.y = y;
  },

  sum: function(v) {
    this.x += v.x;
    this.y += v.y;
  }
});
