ethon.input_manager = (function() {
  var canvas;
  var keys;

  function init(canvas) {
    if(!(canvas instanceof HTMLCanvasElement)) {
      throw new TypeError("init must receive a HTMLCanvasElement");
    }

    canvas = canvas;
    keys = new Array(256);
    for(var i = 0; i < 256; i++) { keys[i] = 0; }

    document.body.addEventListener('keydown', keydown);
    document.body.addEventListener('keyup', keyup);
    canvas.addEventListener('mousedown', mousedown);
  }

  function keydown(event) {
    keys[event.keyCode] = 1;
  }

  function keyup(event) {
    keys[event.keyCode] = 0;
  }

  function isKeyDown(key) {
    return keys[key] == 1;
  }

  function isKeyUp(key) {
    return keys[key] == 0;
  }

  function mousedown(event) {
    //TODO
  }

  return {
    init: init,
    isKeyDown: isKeyDown,
    isKeyUp: isKeyUp,
    KEY_A: 65,
    KEY_B: 66,
    KEY_LEFT_ARROW: 37,
    KEY_RIGHT_ARROW: 39
  };
})();
