/**
  Class TimerManager
*/

function TimerManager() {
  this.timers = new Hash();
  this.events = new Hash();

  this.addTimer = function(name, func, time) {
    var timer = new Timer(func, time);
    this.timers.setItem(name, timer);
  }

  this.changeTimer = function(name, time) {
    var timer = this.timers.getItem(name);
    timer.changeTime(time);
  }

  this.removeTimer = function(name) {
    var timer = this.timers.getItem(name);
    timer.stop();
    this.timers.removeItem(name);
  }

  this.stopAllTimers = function() {
    for(var i in this.timers.items) {
      this.timers.items[i].stop(); 
    } 
  }

  this.resumeAllTimers = function() {
    for(var i in this.timers.items) {
      this.timers.items[i].resume(); 
    }
  }

  this.executeOnce = function(func, time) {
    setTimeout(func, time);
  }

  this.addEvent = function(name) {
    this.events.setItem(name, new Date().getTime());
  }

  this.elapsedTime = function(name, time) {
    var now = new Date().getTime();
    if(now-this.events.getItem(name) > time) {
      this.events.setItem(name, now);
      return true;
    }
    return false;
  }

  this.clear = function() {
    for(var i in this.timers.items) {
      clearInterval(this.timers.items[i]);
    }
    this.timers.clear();
    this.events.clear();
  }
}
