ethon.render_manager = (function() {
  function init(canvas) {
    if(!(canvas instanceof HTMLCanvasElement)) {
      throw new TypeError("init must receive a CanvasElement");
    }
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
  }

  function draw_box(x, y, width, height) {
    this.ctx.fillRect(x, y, width, height);  
  }

  return {
    init: init,
    draw_box: draw_box 
  };
})();
