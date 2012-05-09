ethon.engine = (function() {
  var render_manager = {};
  var input_manager = {};
  var scenes = {};
  var active_scene = null;
  var elapsed_time = new Date();
  var running = false;

  function init(canvas) {
    // Set and initialize render manager
    render_manager = ethon.render_manager;
    render_manager.init(canvas);
    // Set and initialize input manager
    input_manager = ethon.input_manager;
    input_manager.init(canvas);
  }

  function addScene(id, scene) {
    if(typeof scene.render != "function" || typeof scene.update != "function") {
      throw TypeError("scene given doesn't have render and update functions");
    }
    scene.input_manager = input_manager;
    scenes[id] = scene;
  }

  function setActiveScene(id) {
    active_scene = scenes[id];
  }

  function getActiveScene() {
    return active_scene;
  }

  function start() {
    requestAnimationFrame(loop);
    running = true;
  }

  function loop() {
    render();
    update();
    requestAnimationFrame(loop);
  }

  function render() {
    render_manager.clear();
    active_scene.render(render_manager);
  }

  function update() {
    var now = new Date();
    var dt = new Date(now.getTime() - elapsed_time.getTime()).getMilliseconds() / 1000;
    active_scene.update(dt);
    elapsed_time = now;
  }

  function isRunning() {
    return running;
  }

  return {
    init: init,
    scenes: scenes,
    addScene: addScene,
    setActiveScene: setActiveScene,
    getActiveScene: getActiveScene,
    start: start,
    isRunning: isRunning
  };
})();
