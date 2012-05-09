ethon.engine = (function() {
  var render_manager = {};
  var input_manager = {};

  function init(canvas) {
    // Set and initialize render manager
    render_manager = ethon.render_manager;
    render_manager.init(canvas);
    // Set and initialize input manager
    input_manager = ethon.input_manager;
    input_manager.init(canvas);
  }

  return {
    init: init
  };
})();
