TestCase("TestEngine", {
  "test start method should start the engine": function() {
    var engine = ethon.engine;
    var renderCallback = function() {};
    var updateCallback = function() {};
    engine.init(renderCallback, updateCallback);
    engine.start();
    assert(engine.running);
  },

  "test render should call renderCallback method": function() {
    var engine = ethon.engine;
    var rendered = false;
    var renderCallback = function() { 
      rendered = true; 
    };
    var updateCallback = function() {};
    engine.init(renderCallback, updateCallback);
    engine.render();
    assertTrue(rendered);
  },

  "test update should call updateCallback method": function() {
    var engine = ethon.engine;
    var updated = false;
    var renderCallback = function() {};
    var updateCallback = function() { 
      updated = true; 
    };
    engine.init(renderCallback, updateCallback);
    engine.update();
    assertTrue(updated);
  }
});
