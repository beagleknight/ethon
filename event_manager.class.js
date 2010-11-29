/**
  Class EventManager
*/

var KEYBOARD = 0;
var MOUSE = 1;

function EventManager() {
  this.keyboardInput = new KeyboardInput();
  this.events = new Array();

  this.assign = function(id, type, value) {
    this.events.push(new Event(type,id,value));
  }

  this.happens = function(id) {
    for(i = 0; i < this.events.length; i++) {
      if(this.events[i].id == id) {
        if(this.events[i].type == KEYBOARD) {
          return jQuery.inArray(this.events[i].value, this.keyboardInput.keys) != -1;
        }
      }
    }
  }
}
