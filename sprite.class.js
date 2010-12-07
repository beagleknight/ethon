/**
  Class Sprite
*/

function Sprite(w,h,speed) {
  this.w = w;
  this.h = h;
  this.image = new Image();
  this.current = 0;

  this.ethon = Ethon.getInstance();

  this.ethon.event_manager.register('animation', function(event) {
    event.set_time(speed);
  });

  this.draw = function(pos) {
    var crop = new Vector2D();
    crop.x = this.current*this.w;
    crop.y = 0;
    var dimension = new Vector2D(this.w, this.h);
    Ethon.getInstance().render_manager.renderImage(this.image, pos, crop, dimension);
  };

  this.update = function(dt) {
    this.ethon.event_manager.update('animation',dt);
    if(this.ethon.event_manager.happens('animation')) {
      this.current = (this.current+1) % 5;    
    }
  };

  this.load_frames = function(url) {
    this.image.src = url;
  };
};
