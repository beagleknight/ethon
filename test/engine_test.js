describe("Engine", function() {
  var engine, renderCallback, updateCallback;

  beforeEach(function() {
    renderCallback = function() {};
    updateCallback = function() {};
    engine = ethon.engine;
    engine.init(renderCallback, updateCallback);
  });

  describe("start", function() {
    it("should start the engine", function() {
      engine.start();
      expect(engine.running).toBeTruthy();
    });
  });

  describe("render", function() {
    it("should call renderCallback method", function() {
      spyOn(engine, 'renderCallback');
      engine.render();
      expect(engine.renderCallback).toHaveBeenCalled();
    });
  });

  describe("update", function() {
    it("should call updateCallback method", function() {
      spyOn(engine, 'updateCallback');
      engine.update();
      expect(engine.updateCallback).toHaveBeenCalled();
    });
  });
});
