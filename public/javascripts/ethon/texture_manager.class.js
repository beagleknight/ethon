/**
 * Class TextureManager
 */

function TextureManager(ethon) {
  this.ethon = ethon;
  this.textures = new Hash();

  this.add_texture = function(id,src) {
    var image = new Image();
    image.src = this.ethon.path+src;
    this.textures.setItem(id,image);
  }

  this.get_texture = function(id) {
    return this.textures.getItem(id);
  }

  this.remove_texture = function(id) {
    this.textures.removeItem(id);
  }
}
