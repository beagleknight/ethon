/**
  Class Event
*/

var KEYBOARD = 0;
var MOUSE = 1;
var TIMED = 2; 

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
}
