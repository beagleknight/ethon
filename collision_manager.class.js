/**
  Class CollisionManager
*/

function CollisionManager() {
  this.sprite_collision = function(sprite1, sprite2) {
    var x1_1 = sprite1.pos.x;
    var y1_1 = sprite1.pos.y;
    var x2_1 = sprite1.pos.x+sprite1.w;
    var y2_1 = sprite1.pos.y+sprite1.h;    
    var x1_2 = sprite2.pos.x;
    var y1_2 = sprite2.pos.y;
    var x2_2 = sprite2.pos.x+sprite2.w;
    var y2_2 = sprite2.pos.y+sprite2.h;

    return (x1_1 < x2_2) && (x2_1 > x1_2) && (y1_1 < y2_2) && (y2_1 > y1_2);
  }
}
