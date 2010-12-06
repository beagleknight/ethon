/**
  Class EventManager
*/

var KEYBOARD = 0;
var MOUSE = 1;
var TIMED = 2;

function EventManager() {
  this.keyboard_input = new KeyboardInput();
  this.mouse_input = new MouseInput();
  this.events = new Array();

  this.assign = function(id, type, value, object_id) {
    if(object_id != undefined) {
      id = id+'_'+object_id;
    }
    //console.log('Event '+id+' assigned to '+type+' > '+value);
    if(type == TIMED) {
      this.events.push(new TimedEvent(type,id,value)); 
    }
    else {
      this.events.push(new Event(type,id,value));
    }
  }

  this.happens = function(id, object_id) {
    if(object_id != undefined) {
      id = id+'_'+object_id;
    }
    for(i = 0; i < this.events.length; i++) {
      if(this.events[i].id == id) {
        if(this.events[i].type == KEYBOARD) {
          return jQuery.inArray(this.events[i].value, this.keyboard_input.keys) != -1;
        }
        else if(this.events[i].type == TIMED) {
	  return this.events[i].happens();
        }
      }
    }
  }

  this.update = function(id, object_id, dt) {
    if(object_id != undefined) {
      id = id+'_'+object_id;
    }
    for(i = 0; i < this.events.length; i++) {
      if(this.events[i].id == id) {
        this.events[i].update(dt);
      }
    }
  }

  console.log('Event manager loaded succesfully');
}
