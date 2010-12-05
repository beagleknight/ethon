/**
 * Class Timer
 */

function Timer() {
  this.elapsed_time = new Date();

  this.update = function() {
    var now = new Date();
    var elapsed_time = 
      new Date(now.getTime()-this.elapsed_time.getTime()).getMilliseconds()/1000; 
    this.elapsed_time = now;
    return elapsed_time;
  }
}
