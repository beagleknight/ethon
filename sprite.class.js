/**
  Class Sprite
*/

var sprite_id = 0;

function Sprite(texture_id,w,h,init_x,init_y,n_frames,speed) {
  this.ethon = Ethon.getInstance();

  this.id = sprite_id++;
  this.w = w;
  this.h = h;
  this.image = this.ethon.texture_manager.get_texture(texture_id);
  this.current = 0;

  this.init_x = init_x;
  this.init_y = init_y;
  this.n_frames = n_frames;

  this.ethon.event_manager.register('animation_'+this.id, TIMED, speed);

  this.draw = function(pos) {
    var crop = new Vector2D(this.init_x+(this.current*this.w),this.init_y+0);
    var dimension = new Vector2D(this.w,this.h);
    Ethon.getInstance().render_manager.renderImage(this.image,pos,crop,dimension);
  };

  this.update = function(dt) {
    this.ethon.event_manager.update('animation_'+this.id,dt);
    if(this.ethon.event_manager.happens('animation_'+this.id)) {
      this.current = (this.current+1) % this.n_frames;    
    }
  };

  this.set_current = function(current) {
    this.current = current;
  }

  this.get_current = function() {
    return this.current;
  }
};
