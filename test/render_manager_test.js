describe("RenderManagerTest", function() {
  var canvas, ctx;

  beforeEach(function () {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext("2d");
  });

  describe("init", function() {
    it("should receive a canvas element", function() {
      expect(function() {
        ethon.render_manager.init("wrong");
      }).toThrow(new TypeError("init must receive a CanvasElement"));
    });
  });

  describe("draw_box", function() {
    it("should call canvas context fillRect with correct arguments", function() {
      spyOn(ctx, 'fillRect');
      ethon.render_manager.init(canvas);
      ethon.render_manager.draw_box(25, 25, 100, 100);
      expect(ctx.fillRect).toHaveBeenCalledWith(25, 25, 100, 100);
    });
  });

  describe("draw_circle", function() {
    beforeEach(function () {
      ethon.render_manager.init(canvas);
    });

    it("should call canvas context arc with correct arguments", function() {
      spyOn(ctx, 'arc');
      ethon.render_manager.draw_circle(100, 100, 5);
      expect(ctx.arc).toHaveBeenCalledWith(100, 100, 5, 0, 2 * Math.PI, true);
    });

    it("should call canvas context fill", function() {
      spyOn(ctx, 'fill');
      ethon.render_manager.draw_circle(100, 100, 5);
      expect(ctx.fill).toHaveBeenCalled();
    });
  });
});
