ethon.engine = (function() {
  function init(renderCallback, updateCallback) {
    this.renderCallback = renderCallback;
    this.updateCallback = updateCallback;
  }

  function start() {
    this.running = true; 
  }

  function render() {
    this.renderCallback();
  }

  function update() {
    this.updateCallback();
  }

  return {
    init: init,
    start: start,
    render: render,
    update: update,
    running: false
  };
})();
