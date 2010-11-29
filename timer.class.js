/**
 * Class Timer
 */

function Timer(func, time) {
  this.func = func;
  this.time = time;
  this.intervalId = setInterval(this.func,this.time);
}

Timer.prototype.changeTime = function(time) {
  this.stop();
  this.time = time;
  this.intervalId = setInterval(this.func, this.time);
}

Timer.prototype.stop = function() {
  clearInterval(this.intervalId);
}

Timer.prototype.resume = function() {
  this.intervalId = setInterval(this.func, this.time);
}
