describe("Engine", function() {
  var engine, renderCallback, updateCallback;

  beforeEach(function() {
    engine = ethon.engine;
    canvas = document.createElement('canvas');
  });

  describe("init", function() {
    it("should initialize render_manager with given canvas", function() {
      spyOn(ethon.render_manager, 'init');
      engine.init(canvas);
      expect(ethon.render_manager.init).toHaveBeenCalledWith(canvas);
    });

    it("should initialize input_manager with given canvas", function() {
      spyOn(ethon.input_manager, 'init');
      engine.init(canvas);
      expect(ethon.input_manager.init).toHaveBeenCalledWith(canvas);
    });
  });
});
