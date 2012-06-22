buster.spec.expose();

describe("Engine", function() {
  var engine, renderCallback, updateCallback;

  beforeEach(function() {
    engine = ethon.engine;
    canvas = document.createElement('canvas');
  });

  describe("init", function() {
    it("should initialize render_manager with given canvas, width and height", function() {
      this.stub(ethon.render_manager, 'init');
      engine.init(canvas, 640, 480);
      expect(ethon.render_manager.init).toHaveBeenCalledWith(canvas, 640, 480);
    });

    it("should initialize input_manager with given canvas", function() {
      this.stub(ethon.input_manager, 'init');
      engine.init(canvas);
      expect(ethon.input_manager.init).toHaveBeenCalledWith(canvas);
    });
  });

  describe("addScene", function() {
    it("should receive an object with init, render and update functions", function() {
      var bad_scene_1 = {
        render: function(rm) {}
      };
      var bad_scene_2 = {
        update: function(dt) {}
      };
      var bad_scene_3 = {
        init: function() {}
      };
      var good_scene = {
        init:   function()    {},
        render: function(rm)  {},
        update: function(dt)  {}
      };

      engine.init(canvas);

      expect(function() {
        engine.addScene("bad1", bad_scene_1);
      }).toThrow("TypeError");

      expect(function() {
        engine.addScene("bad2", bad_scene_2);
      }).toThrow("TypeError");

      expect(function() {
        engine.addScene("bad2", bad_scene_3);
      }).toThrow("TypeError");

      expect(function() {
        engine.addScene("good", good_scene);
      }).not.toThrow("TypeError");
    });

    it("should add scene to engine scenes object", function() {
      var scene = {
        init:   function()    {},
        render: function(rm)  {},
        update: function(dt)  {}
      };

      engine.init(canvas);
      engine.addScene("main", scene);
      expect(scene).toBe(engine.scenes["main"])
    });

    it("should call scene init when adding scene", function() {
      var scene = {
        init:   function()    {},
        render: function(rm)  {},
        update: function(dt)  {}
      };
      this.stub(scene, "init");
      engine.init(canvas);
      engine.addScene("main", scene);
      expect(scene.init).toHaveBeenCalled();
    });
  });

  describe("setActiveScene", function() {
    it("should assign scene to active scene", function() {
      var scene = {
        init:   function()    {},
        render: function(rm)  {},
        update: function(dt)  {}
      };

      engine.init(canvas);
      engine.addScene("main", scene);
      engine.setActiveScene("main");

      expect(engine.getActiveScene()).toBe(engine.scenes["main"])
    });
  });

  describe("start", function() {
    it("should start the engine loop", function() {
      engine.init(canvas);
      engine.start();
      expect(engine.isRunning()).toBeTruthy();
    });
  });
});
