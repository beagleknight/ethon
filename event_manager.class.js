/**
  Class EventManager
*/

function EventManager() {
  this.keyboard_input = new KeyboardInput();
  this.mouse_input = new MouseInput();

  this.registered_events = new Hash();
  this.registered_events.setItem(KEYBOARD, new Hash());
  this.registered_events.setItem(MOUSE, new Hash());
  this.registered_events.setItem(TIMED, new Hash());

  this.happening_events = new Hash();

  this.register = function(id, setup_event) {
    var event = new Event();
    event.id = id;
    setup_event(event);
    this.registered_events.getItem(event.type).setItem(id, event);
    //console.log('Event "'+id+'" registered successfully');
  }

  this.happens = function(id) {
    return this.happening_events.getItem(id); 
  }

  this.update = function(id, dt) {
    this.registered_events.getItem(TIMED).getItem(id).update(dt);    
  }
 
  this.clear = function() {
    this.happening_events.clear();
  }

  console.log('Event manager loaded successfully');
}
