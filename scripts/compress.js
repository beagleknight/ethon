var compressor = require('node-minify');
var version = "0.0.1";

var source_dir = 'src';
var source_files = [
  'request_animation_frame.js',
  'ethon.js',
  'engine.js',
  'render_manager.js',
  'input_manager.js'
];

var dest_dir = 'release';
var dest_file = dest_dir + '/ethon-' + version + '-min.js';

var files = [];
var i, l;
for(i = 0, l = source_files.length; i < l; i++) {
  files.push(source_dir + "/" + source_files[i]);
}
  
new compressor.minify({
    type: 'uglifyjs',
    fileIn: files,
    fileOut: dest_file,
    callback: function(err){
        console.log(err);
    }
});
