/**
 * Class Button
 */

Button.prototype = new Object2D();

function Button(x,y,w,h,path,onclick) {
  Object2D.call(this,x,y,w,h);

  this.ethon = Ethon.getInstance();
  this.sprite = new Sprite(this.w,this.h);
  this.sprite.load_frames(path);
  this.onclick = onclick;

  this.ethon.event_manager.register('click_button_'+this.id, MOUSE, this);

  this.draw = function() {
    this.sprite.draw(this.pos);
  }

  this.update = function(dt) {
    button = this.ethon.event_manager.happens('click_button_'+this.id);
    if(button != null) {
      this.onclick();      
    }
  }
}
