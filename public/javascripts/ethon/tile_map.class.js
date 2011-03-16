/**
 * Class TileMap
*/

function TileMap(rows, cols, w, h, step_x, step_y) {
  this.rows = rows;
  this.cols = cols;
  this.tile_w = w;
  this.tile_h = h;
  this.alive = true;

  this.rows_per_canvas = Math.ceil(Game.getInstance().render.canvas_height/this.tile_h);
  this.cols_per_canvas = Math.ceil(Game.getInstance().render.canvas_width/this.tile_w);
  this.canvas_outside = (this.rows-this.rows_per_canvas)*this.tile_h;

  this.map = new Array(rows);
  for(var i = 0; i < rows; i++)
    this.map[i] = new Array(cols); 
  this.tiles = new Array();

  this.offset_x = 0;
  this.step_x = step_x;
  this.offset_y = 0;
  this.step_y = step_y;
}

TileMap.prototype.add_tile = function(url, w, h) {
  var sprite = new Sprite(0,0,w,h);
  sprite.add_frame(url);
  this.tiles.push(sprite);
}

TileMap.prototype.draw = function(render) {
  var x = 0; 
  var y = this.offset_y;

  for(var i = 0; i < this.rows; i++) {
    for(var j = 0; j < this.cols; j++) {
      var id = this.map[i][j];
      var tile = this.tiles[id];
      tile.pos.x = x;
      tile.pos.y = y;
      tile.draw(render);
      x += tile.w;
    }
    x = 0;
    y += tile.h;

    var canvas_height = Game.getInstance().render.canvas_height;
    if(y > canvas_height) {
      y = y-(canvas_height+this.canvas_outside);
    }
  }
}

TileMap.prototype.update = function() {
  var canvas_height = Game.getInstance().render.canvas_height;
  this.offset_y = this.offset_y+this.step_y; 

  if(this.step < 0) {
    if(this.offset_y < -this.canvas_outside) {
      this.offset_y = this.offset_y+canvas_height+this.canvas_outside;
    }
  }
  else {
    if(this.offset_y > canvas_height) {
      this.offset_y = this.offset_y-canvas_height-this.canvas_outside;
    }
  }
}
