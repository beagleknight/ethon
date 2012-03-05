ethon.render_manager = (function() {
  function init(canvas) {
    if(!(canvas instanceof HTMLCanvasElement)) {
      throw new TypeError("init must receive a CanvasElement");
    }
    this.canvas = canvas;
    this.canvas.width = 500;
    this.canvas.height= 500;
    this.ctx = this.canvas.getContext("2d");
  }

  function draw_box(x, y, width, height) {
    this.ctx.fillRect(x, y, width, height);  
  }

  function draw_circle(x, y, radius) {
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
  }

  return {
    init: init,
    draw_box: draw_box,
    draw_circle: draw_circle 
  };
})();
