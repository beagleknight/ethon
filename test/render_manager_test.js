TestCase("RenderManagerTest", {
  "test should be an object": function() {
    assertObject(ethon.render_manager);
  },

  "test init should receive a canvas element": function() {
    assertException(function() {
      ethon.render_manager.init("wrong");
    }, "TypeError");
  },

  "test draw box should use canvas context": function() {
    var canvas = document.createElement('canvas');
    ethon.render_manager.init(canvas);
    ethon.render_manager.draw_box(25, 25, 100, 100);
  }
});
