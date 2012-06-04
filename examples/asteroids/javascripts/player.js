var player = (function() {
  var x, y;
  var image;

  function init() {
    image = new Image();
    image.src = "images/ship.png";
    x = 320;
    y = 250;
  }

  function render(rm) {
    rm.drawImage(image, x, y, {
      scale: [0.5, 0.5]
    });
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
