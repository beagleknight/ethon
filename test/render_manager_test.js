describe("RenderManager", function() {
  var canvas, ctx;

  beforeEach(function() {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext("2d");
    ethon.render_manager.init(canvas);
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

  describe("beginDrawContext", function() {
    it("should call canvas translate method with given x and y", function() {
      spyOn(ctx, 'translate');
      ethon.render_manager.beginDrawContext(25, 25, {});
      expect(ctx.translate).toHaveBeenCalledWith(25, 25);
    });

    it("should save and restore current transformation matrix", function() {
      spyOn(ctx, 'save');
      ethon.render_manager.beginDrawContext(25, 25, {});
      expect(ctx.save).toHaveBeenCalled();
    });

    describe("with default style arguments", function() {
      it("should take manager default fillStyle value", function() {
        spyOn(ctx, 'fillStyle');
        ethon.render_manager.setDefaultStyle({
          fillStyle: "#ff0000"
        });
        ethon.render_manager.beginDrawContext(25, 25, {});
        expect(ctx.fillStyle).toBe("#ff0000");
      });
    });

    describe("with explicit fillStyle argument", function() {
      it("should use fillStyle argument value", function() {
        spyOn(ctx, 'fillStyle');
        ethon.render_manager.setDefaultStyle({
          fillStyle: "#ff0000"
        });
        ethon.render_manager.beginDrawContext(25, 25, {
          fillStyle: "#00ff00"
        });
        expect(ctx.fillStyle).toBe("#00ff00");
      });
    });

    describe("with rotate argument given", function() {
      it("should call context rotate with given argument transformed to radians", function() {
        spyOn(ctx, 'rotate');
        ethon.render_manager.init(canvas);
        ethon.render_manager.beginDrawContext(25, 25, {
          rotate: 90
        });
        expect(ctx.rotate).toHaveBeenCalledWith(Math.PI / 2);
      });
    });
  });

  describe("endDrawContext", function() {
    it("should save and restore current transformation matrix", function() {
      spyOn(ctx, 'restore');
      ethon.render_manager.endDrawContext(25, 25);
      expect(ctx.restore).toHaveBeenCalled();
    });
  });

  describe("drawBox", function() {
    it("should call beginDrawContext with given arguments", function() {
      spyon(ethon.render_manager, 'beginDrawContext');
      ethon.render_manager.drawBox(25, 25, 100, 100, {
        fillStyle: "#ff0000",
        rotate: 45
      });
      expect(ethon.render_manager.beginDrawContext).toHaveBeenCalledWith(25, 25, {
        fillStyle: "#ff0000",
        rotate: 45
      });
    });

    it("should call canvas context fillRect with correct arguments", function() {
      spyOn(ctx, 'fillRect');
      ethon.render_manager.init(canvas);
      ethon.render_manager.drawBox(25, 25, 100, 100);
      expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 100, 100);
    });

    it("should call endDrawContext", function() {
      spyon(ethon.render_manager, 'beginDrawContext');
      ethon.render_manager.drawBox(25, 25, 100, 100, {
        fillStyle: "#ff0000",
        rotate: 45
      });
      expect(ethon.render_manager.endDrawContext).toHaveBeenCalled();
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
