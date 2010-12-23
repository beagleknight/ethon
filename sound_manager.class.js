/**
  Class SoundManager
*/

var id = 0;

function SoundManager(ethon,canvas) {
  this.ethon = ethon;
  this.canvas = canvas;

  this.play_music = function(src) {
    // Get audio tag
    var music_audio_tag = this.canvas.parent().find('audio#music');
    if(music_audio_tag.length == 0) {
      this.canvas.parent().append('<audio id="music"></audio>');
      music_audio_tag = this.canvas.parent().find('audio#music');
      music_audio_tag.attr('autoplay',true);
      music_audio_tag.attr('loop',true);
      music_audio_tag.attr('src',this.ethon.path+src);
    }
  }

  this.play_fx = function(id,src) {
    var fx_audio_tag = this.canvas.parent().find('audio#'+id);
    if(fx_audio_tag.length != 0) {
      fx_audio_tag.remove();
    }
    this.canvas.parent().append('<audio id="'+id+'"></audio>');
    var fx_audio_tag = this.canvas.parent().find('audio#'+id);
    fx_audio_tag.attr('src',this.ethon.path+src);
    fx_audio_tag[0].play();
  }

  //console.log('Sound manager loaded succesfully');
}
