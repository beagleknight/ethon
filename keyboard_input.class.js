/**
  Class KeyboardInput
*/

function KeyboardInput() {
  this.onKeyDown = function(event) {
    if(event.keyCode == LEFT_ARROW || event.keyCode == RIGHT_ARROW || event.keyCode == DOWN_ARROW || event.keyCode == UP_ARROW || event.keyCode == SPACE || event.keyCode == ESCAPE) {
      event.preventDefault();
    }
  
    var event_manager = Ethon.getInstance().event_manager;
    var keyboard_events = event_manager.registered_events.getItem(KEYBOARD);
    for(id in keyboard_events.items) {
      if(keyboard_events.getItem(id).value == event.keyCode) {
        event_manager.happening_events.setItem(id, true);
        return;
      }
    }
  }
  
  this.onKeyUp = function(event) {
    var event_manager = Ethon.getInstance().event_manager;
    var keyboard_events = event_manager.registered_events.getItem(KEYBOARD);
    for(id in keyboard_events.items) {
      if(keyboard_events.getItem(id).value == event.keyCode) {
        event_manager.happening_events.removeItem(id);
        return;
      }
    }
  }
}

// Key list
var LEFT_ARROW = 37;
var RIGHT_ARROW = 39;
var UP_ARROW = 38;
var DOWN_ARROW = 40;
var SPACE = 32;
var ESCAPE = 27;
var MINUS_R = 82; 
var MINUS_W = 87; 
var MINUS_S = 83; 
var MINUS_A = 65; 
var MINUS_D = 68; 
var NUMBER_0 = 48;
var NUMBER_1 = 49;
var NUMBER_2 = 50;
var NUMBER_3 = 51;
var NUMBER_4 = 52;
var NUMBER_5 = 53;
var NUMBER_6 = 54;
var NUMBER_7 = 55;
var NUMBER_8 = 56;
var NUMBER_9 = 57;
var CTRL_R = 17;
