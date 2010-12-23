/**
 * Class Scene
*/

function Scene(draw,update) {
  this.ethon = Ethon.getInstance();
  this.draw = draw;
  this.update = update;
}
