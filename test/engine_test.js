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

  describe("addScene", function() {
    it("should receive an object with render and update functions", function() {
      var bad_scene_1 = {
        render: function(rm) {}
      };
      var bad_scene_2 = {
        update: function(dt) {}
      };
      var good_scene = {
        render: function(rm) {},
        update: function(dt) {}
      };

      engine.init(canvas);

      expect(function() {
        engine.addScene(bad_scene_1);
      }).toThrow(new TypeError("scene given doesn't have render and update functions"));

      expect(function() {
        engine.addScene(bad_scene_1);
      }).toThrow(new TypeError("scene given doesn't have render and update functions"));

      expect(function() {
        engine.addScene(good_scene);
      }).not.toThrow(new TypeError("scene given doesn't have render and update functions"));
    });
  });
});
