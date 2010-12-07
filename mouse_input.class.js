/**
  Class MouseInput
*/

function MouseInput() {
  this.onClick = function(event) {
    var point = new Object();
    point.pos = new Vector2D(event.offsetX, event.offsetY);
    point.w = 1
    point.h = 1
    
    var event_manager = Ethon.getInstance().event_manager;
    var mouse_events = event_manager.registered_events.getItem(MOUSE);
    for(id in mouse_events.items) {
      var objects = mouse_events.getItem(id).value;
      for(var i = 0; i < objects.length; i++) {
        if(Ethon.getInstance().collision_manager.sprite_collision(objects[i],point)) {
	  event_manager.happening_events.setItem(id,objects[i]);
        }
      }
    }
  }
}
