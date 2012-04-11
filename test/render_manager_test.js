describe("RenderManager", function() {
  var canvas, ctx;

  beforeEach(function() {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext("2d");
    ethon.render_manager.init(canvas);
  });

  describe("init", function() {
    it("should receive a HTMLCanvasElement", function() {
      expect(function() {
        ethon.render_manager.init("wrong");
      }).toThrow(new TypeError("init must receive a HTMLCanvasElement"));
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
      ethon.render_manager.beginDrawContext({x: 25, y: 25});
      expect(ctx.translate).toHaveBeenCalledWith(25, 25);
    });

    it("should save and restore current transformation matrix", function() {
      spyOn(ctx, 'save');
      ethon.render_manager.beginDrawContext({x: 25, y: 25});
      expect(ctx.save).toHaveBeenCalled();
    });

    describe("with default style arguments", function() {
      it("should take manager default fillStyle value", function() {
        spyOn(ctx, 'fillStyle');
        ethon.render_manager.setDefaultStyle({
          fillStyle: "#ff0000"
        });
        ethon.render_manager.beginDrawContext({x: 25, y: 25});
        expect(ctx.fillStyle).toBe("#ff0000");
      });
    });

    describe("with explicit fillStyle argument", function() {
      it("should use fillStyle argument value", function() {
        spyOn(ctx, 'fillStyle');
        ethon.render_manager.setDefaultStyle({
          fillStyle: "#ff0000"
        });
        ethon.render_manager.beginDrawContext({
          x: 25,
          y: 25,
          fillStyle: "#00ff00"
        });
        expect(ctx.fillStyle).toBe("#00ff00");
      });
    });

    describe("with rotate argument given", function() {
      it("should call context rotate with given argument transformed to radians", function() {
        spyOn(ctx, 'rotate');
        ethon.render_manager.init(canvas);
        ethon.render_manager.beginDrawContext({
          x: 25,
          y: 25,
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

  describe("onDrawContext", function() {
    it("should call beginDrawContext with given arguments", function() {
      var options = {
        x: 100,
        y: 100,
        strokeStyle: "#ff0000"
      };
      spyOn(ethon.render_manager, 'beginDrawContext');
      ethon.render_manager.onDrawContext(options, function() {});
      expect(ethon.render_manager.beginDrawContext).toHaveBeenCalledWith(options);
    });

    it("should call endDrawContext", function() {
      spyOn(ethon.render_manager, 'endDrawContext');
      ethon.render_manager.onDrawContext({}, function() {});
      expect(ethon.render_manager.endDrawContext).toHaveBeenCalled();
    });
  });

  describe("drawLine", function() {
    it("should call onDrawContext", function() {
      spyOn(ethon.render_manager, 'onDrawContext');
      ethon.render_manager.drawLine(100, 100, 200, 200, { strokeStyle: "#ff0000" });
      expect(ethon.render_manager.onDrawContext).toHaveBeenCalled();
    });

    it("should begin a new path for canvas context", function() {
      spyOn(ctx, 'beginPath');
      ethon.render_manager.drawLine(100, 100, 200, 200);
      expect(ctx.beginPath).toHaveBeenCalled();
    });

    it("should call canvas moveTo with current matrix origin", function() {
      spyOn(ctx, 'moveTo');
      ethon.render_manager.drawLine(100, 100, 200, 200);
      expect(ctx.moveTo).toHaveBeenCalledWith(0, 0);
    });

    it("should call canvas lineTo with correct arguments", function() {
      spyOn(ctx, 'lineTo');
      ethon.render_manager.drawLine(100, 100, 200, 200);
      expect(ctx.lineTo).toHaveBeenCalledWith(100, 100);
    });

    it("should call canvas context stroke", function() {
      spyOn(ctx, 'stroke');
      ethon.render_manager.drawLine(100, 100, 200, 200);
      expect(ctx.stroke).toHaveBeenCalled();
    });
  });

  describe("drawBox", function() {
    it("should call onDrawContext", function() {
      spyOn(ethon.render_manager, 'onDrawContext');
      ethon.render_manager.drawBox(100, 100, 200, 200, { fillStyle: "#ff0000" });
      expect(ethon.render_manager.onDrawContext).toHaveBeenCalled();
    });

    it("should call canvas context fillRect with correct arguments", function() {
      spyOn(ctx, 'fillRect');
      ethon.render_manager.init(canvas);
      ethon.render_manager.drawBox(25, 25, 100, 100);
      expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 100, 100);
    });
  });

  describe("drawCircle", function() {
    it("should call onDrawContext", function() {
      spyOn(ethon.render_manager, 'onDrawContext');
      ethon.render_manager.drawCircle(100, 100, 5, { strokeStyle: "#ff0000" }); 
      expect(ethon.render_manager.onDrawContext).toHaveBeenCalled();
    });

    it("should begin a new path for canvas context", function() {
      spyOn(ctx, 'beginPath');
      ethon.render_manager.drawCircle(100, 100, 5);
      expect(ctx.beginPath).toHaveBeenCalled();
    });

    it("should call canvas context arc with correct arguments", function() {
      spyOn(ctx, 'arc');
      ethon.render_manager.drawCircle(100, 100, 5);
      expect(ctx.arc).toHaveBeenCalledWith(0, 0, 5, 0, 2 * Math.PI, true);
    });

    it("should call canvas context stroke", function() {
      spyOn(ctx, 'stroke');
      ethon.render_manager.drawCircle(100, 100, 5);
      expect(ctx.stroke).toHaveBeenCalled();
    });
  });

  describe("drawImage", function() {
    beforeEach(function() {
      image = new Image();
    });
    
    it("should receive an Image element", function() {
      expect(function() {
        ethon.render_manager.drawImage("wrong", 100, 100);
      }).toThrow(new TypeError("drawImage must receive an Image"));
    });

    it("should call onDrawContext", function() {
      spyOn(ethon.render_manager, 'onDrawContext');
      ethon.render_manager.drawImage(image, 100, 100, {});
      expect(ethon.render_manager.onDrawContext).toHaveBeenCalled();
    });

    it("should call canvas context drawImage with correct arguments", function() {
      spyOn(ctx, 'drawImage');
      ethon.render_manager.drawImage(image, 100, 100, {});
      expect(ctx.drawImage).toHaveBeenCalledWith(image, 0, 0);
    });
  });
});
