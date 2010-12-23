/**
  Class SceneManager
*/

function SceneManager() {
  this.active_scene = null;
  this.scenes = new Hash();

  this.add_scene = function(id, draw, update) {
    this.scenes.setItem(id, new Scene(draw,update)); 
  }

  this.set_active = function(id) {
    this.active_scene = id;
  }

  this.draw = function() {
    this.scenes.getItem(this.active_scene).draw();
  }

  this.update = function(dt) {
    this.scenes.getItem(this.active_scene).update(dt);
  }
}
