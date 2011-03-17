/**
 * Class Scene
*/

function Scene(params) {
  this.ethon = Ethon.getInstance();
  this.init = params.init;
  this.draw = params.draw;
  this.update = params.update;

  this.init();
}
