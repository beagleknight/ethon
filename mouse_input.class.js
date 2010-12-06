/**
  Class MouseInput
*/

function MouseInput() {
  this.onClick = function(event) {
    console.log('X: '+event.offsetX+' Y: '+event.offsetY);
  }
}
