/**
  Class Event
*/

var KEYBOARD = 0;
var MOUSE = 1;
var TIMED = 2; 
var MOUSE_OVER = 3;
var MOUSE_OUT = 4;

function Event(id, type, value) {
  this.id = id;
  this.type = type;
  this.value = value;
  
  if(this.type == TIMED) {
    this.counter = 0;
  }
 
  this.update = function(dt) {
    this.counter += dt;

    if(this.counter >= this.value) {
      Ethon.getInstance().event_manager.happening_events.setItem(this.id, true);   
      this.counter = 0;
    }
  }

  this.reset = function() {
    this.counter = 0;
  }
}
