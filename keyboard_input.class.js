/**
  Class KeyboardInput
*/

function KeyboardInput() {
  this.onKeyDown = keyboardOnKeyDown;
  this.onKeyUp = keyboardOnKeyUp;
  this.disable_input = false;
  this.keys = new Array();
}

function keyboardOnKeyDown(event) {
  //alert(event.keyCode);
  if(event.keyCode == LEFT_ARROW || event.keyCode == RIGHT_ARROW || event.keyCode == DOWN_ARROW || event.keyCode == UP_ARROW || event.keyCode == SPACE || event.keyCode == ESCAPE) {
    event.preventDefault();
  }

  this.keys.push(event.keyCode);
  this.keys = jQuery.unique(this.keys);
}

function keyboardOnKeyUp(event) {
  this.keys = jQuery.grep(this.keys, function(n, i) {
    return n != event.keyCode;
  });
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
