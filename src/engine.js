ethon.engine = (function() {
  var render_manager = {};
  var input_manager = {};
  var scenes = {};
  var active_scene = null;

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
    scenes[id] = scene;
  }

  function setActiveScene(id) {
    active_scene = scenes[id];
  }

  function getActiveScene() {
    return active_scene;
  }

  return {
    init: init,
    scenes: scenes,
    addScene: addScene,
    setActiveScene: setActiveScene,
    getActiveScene: getActiveScene
  };
})();
