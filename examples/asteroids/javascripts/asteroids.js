window.addEventListener('load', function() {
  ethon.engine.init(document.getElementById('game'), 800, 600);
  ethon.engine.addScene("main", new Scene());
  ethon.engine.setActiveScene("main");
  ethon.engine.start();
});
