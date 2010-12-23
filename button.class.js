/**
 * Class Button
 */

Button.prototype = new Object2D();

function Button(texture_id,x,y,w,h,onclick) {
  Object2D.call(this,x,y,w,h);

  this.ethon = Ethon.getInstance();
  this.sprite = new Sprite(texture_id,this.w,this.h,0,0,1,0);
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
