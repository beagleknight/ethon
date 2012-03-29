describe("RenderManager", function() {
  var canvas, ctx;

  beforeEach(function() {
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

  describe("setDefaultStyle", function() {
    it("should assign default styles", function() {
      ethon.render_manager.setDefaultStyle({
        fillStyle: "#00ff00",
        strokeStyle: "#ff0000"
      });
      var defaultStyle = ethon.render_manager.getDefaultStyle();
      expect(defaultStyle.fillStyle).toBe("#00ff00");
      expect(defaultStyle.strokeStyle).toBe("#ff0000");
    });
  });

  describe("drawBox", function() {
    it("should call canvas context fillRect with correct arguments", function() {
      spyOn(ctx, 'fillRect');
      ethon.render_manager.init(canvas);
      ethon.render_manager.drawBox(25, 25, 100, 100);
      expect(ctx.fillRect).toHaveBeenCalledWith(25, 25, 100, 100);
    });

    describe("with default style arguments", function() {
      it("should take manager default fillStyle value", function() {
        spyOn(ctx, 'fillStyle');
        ethon.render_manager.init(canvas);
        ethon.render_manager.setDefaultStyle({
          fillStyle: "#ff0000"
        });
        ethon.render_manager.drawBox(25, 25, 100, 100);
        expect(ctx.fillStyle).toBe("#ff0000");
      });
    });

    describe("with explicit fillStyle argument", function() {
      it("should use fillStyle argument value", function() {
        spyOn(ctx, 'fillStyle');
        ethon.render_manager.init(canvas);
        ethon.render_manager.setDefaultStyle({
          fillStyle: "#ff0000"
        });
        ethon.render_manager.drawBox(25, 25, 100, 100, {
          fillStyle: "#00ff00"
        });
        expect(ctx.fillStyle).toBe("#00ff00");
      });
    });
  });

  describe("drawCircle", function() {
    beforeEach(function () {
      ethon.render_manager.init(canvas);
    });

    it("should begin a new path for canvas context", function() {
      spyOn(ctx, 'beginPath');
      ethon.render_manager.drawCircle(100, 100, 5);
      expect(ctx.beginPath).toHaveBeenCalled();
    });

    it("should call canvas context arc with correct arguments", function() {
      spyOn(ctx, 'arc');
      ethon.render_manager.drawCircle(100, 100, 5);
      expect(ctx.arc).toHaveBeenCalledWith(100, 100, 5, 0, 2 * Math.PI, true);
    });

    it("should call canvas context stroke", function() {
      spyOn(ctx, 'stroke');
      ethon.render_manager.drawCircle(100, 100, 5);
      expect(ctx.stroke).toHaveBeenCalled();
    });

    describe("with default style arguments", function() {
      it("should take manager default strokeStyle value", function() {
        spyOn(ctx, 'strokeStyle');
        ethon.render_manager.init(canvas);
        ethon.render_manager.setDefaultStyle({
          strokeStyle: "#ff0000"
        });
        ethon.render_manager.drawCircle(100, 100, 5);
        expect(ctx.strokeStyle).toBe("#ff0000");
      });
    });

    describe("with explicit strokeStyle argument", function() {
      it("should use strokeStyle argument value", function() {
        spyOn(ctx, 'strokeStyle');
        ethon.render_manager.init(canvas);
        ethon.render_manager.setDefaultStyle({
          strokeStyle: "#ff0000"
        });
        ethon.render_manager.drawCircle(100, 100, 5, {
          strokeStyle: "#0000ff"
        });
        expect(ctx.strokeStyle).toBe("#0000ff");
      });
    });
  });
});
