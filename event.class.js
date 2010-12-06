/**
  Class Event
*/

var KEYBOARD = 0;
var MOUSE = 1;
var TIMED = 2; 

function Event() {
  this.key_pressed = function(key) {
    this.type = KEYBOARD;
    this.value = key;
  }

  this.mouse_click = function(group) {
    this.type = MOUSE;
    this.value = group;
  }

  this.set_time = function(time) {
    this.type = TIMED;
    this.value = time;
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
