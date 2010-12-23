/**
 * Class Button
 */

Button.prototype = new Object2D();

function Button(texture_id,x,y,w,h,n_frames,onclick) {
  Object2D.call(this,x,y,w,h);

  this.ethon = Ethon.getInstance();
  this.sprite = new Sprite(texture_id,this.w,this.h,0,0,n_frames,0);
  this.onclick = onclick;

  this.ethon.event_manager.register('click_button_'+this.id, MOUSE, this);
  this.ethon.event_manager.register('over_button_'+this.id, MOUSE_OVER, this);
  this.ethon.event_manager.register('out_button_'+this.id, MOUSE_OUT, this);

  this.draw = function() {
    this.sprite.draw(this.pos);
  }

  this.update = function(dt) {
    button = this.ethon.event_manager.happens('click_button_'+this.id);
    if(button != null) {
      this.onclick();      
    }

    button = this.ethon.event_manager.happens('over_button_'+this.id);
    if(button != null) {
      this.sprite.set_current(1);
    }
    else {
      button = this.ethon.event_manager.happens('out_button_'+this.id);
      if(button != null) {
        this.sprite.set_current(0);
      }
    }
  }
}
