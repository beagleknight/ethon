/**
  Class TimedEvent
*/

TimedEvent.prototype = new Event();

function TimedEvent(type, id, value) {
  Event.call(this,type,id,value);
  this.counter = 0;

  this.update = function(dt) {
    this.counter += dt;
  }

  this.happens = function() {
    if(this.counter >= this.value) {
      this.counter = 0;
      return true;
    }
    return false; 
  }
}
