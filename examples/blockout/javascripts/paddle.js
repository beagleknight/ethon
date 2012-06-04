var paddle = (function() {
  var x, y;

  function init() {
    x = 200;
    y = 450;
  }

  function render(rm) {
    rm.drawBox(x, y, 100, 10);
  }

  function update(dt) {
    if(this.im.isKeyDown(ethon.input_manager.KEY_LEFT_ARROW) && 
        x > 0) { 
      x -= 200 * dt; 
    }
    else if(this.im.isKeyDown(ethon.input_manager.KEY_RIGHT_ARROW) &&
        x < 500 - 100) { 
      x += 200 * dt; 
    }
  }

  function getX() {
    return x;
  }

  function getY() {
    return y;
  }

  return {
    init: init,
    render: render,
    update: update,
    getX: getX,
    getY: getY
  };
})();
