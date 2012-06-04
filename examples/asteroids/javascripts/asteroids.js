window.addEventListener('load', function() {
  ethon.engine.init(document.getElementById('game'), 640, 480);
  ethon.engine.addScene("main", scene);
  ethon.engine.setActiveScene("main");
  ethon.engine.start();
});
