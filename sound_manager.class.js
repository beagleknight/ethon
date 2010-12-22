/**
  Class SoundManager
*/

var id = 0;

function SoundManager(canvas) {
  this.canvas = canvas;

  this.play_music = function(url) {
    // Get audio tag
    var music_audio_tag = this.canvas.parent().find('audio#music');
    if(music_audio_tag.length == 0) {
      this.canvas.parent().append('<audio id="music"></audio>');
      music_audio_tag = this.canvas.parent().find('audio#music');
      music_audio_tag.attr('autoplay',true);
      music_audio_tag.attr('loop',true);
      music_audio_tag.attr('src',url);
    }
  }

  this.play_fx = function(url) {
    this.canvas.parent().append('<audio id="fx_'+id+'"></audio>');
    var fx_audio_tag = this.canvas.parent().find('audio#fx_'+id);
    fx_audio_tag.attr('autoplay',true);
    fx_audio_tag.attr('src',url);
    fx_audio_tag.remove();
  }
  console.log('Sound manager loaded succesfully');
}
