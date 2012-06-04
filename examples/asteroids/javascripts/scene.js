var scene = (function() {
  function init() {
    player.init();
    //TODO: I don't like this stuff
    player.im = this.input_manager;
  }

  function render(rm) {
    player.render(rm);
  }

  function update(dt) {
    player.update(dt);
  }

  return {
    init: init,
    render: render,
    update: update
  };
})();

