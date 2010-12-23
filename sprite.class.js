/**
  Class Sprite
*/

var sprite_id = 0;

function Sprite(w,h,speed) {
  this.id = sprite_id++;
  this.w = w;
  this.h = h;
  this.image = new Image();
  this.current = 0;
  this.n_frames = 0;

  this.ethon = Ethon.getInstance();

  this.ethon.event_manager.register('animation_'+this.id, TIMED, speed);

  this.draw = function(pos) {
    Ethon.getInstance().render_manager.renderImage(this.image, pos, 
      new Vector2D(this.current*this.w,0), new Vector2D(this.w,this.h));
  };

  this.update = function(dt) {
    this.ethon.event_manager.update('animation_'+this.id,dt);
    if(this.ethon.event_manager.happens('animation_'+this.id)) {
      this.current = (this.current+1) % this.n_frames;    
    }
  };

  this.load_frames = function(url,n_frames) {
    this.image.src = url;
    this.n_frames = n_frames;
  };
};
