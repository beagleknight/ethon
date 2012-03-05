TestCase("RenderManagerTest", {
  setUp: function() {
    this.canvas = document.createElement('canvas');
  },

  "test should be an object": function() {
    assertObject(ethon.render_manager);
  },

  "test init should receive a canvas element": function() {
    assertException(function() {
      ethon.render_manager.init("wrong");
    }, "TypeError");
  },

  "test draw box should use canvas context fillRect": function() {
    var fillRect = stubFn();
    this.canvas.getContext = stubFn({ fillRect: fillRect });

    ethon.render_manager.init(this.canvas);
    ethon.render_manager.draw_box(25, 25, 100, 100);
    assertTrue(fillRect.called);
    assertEquals(4, fillRect.args.length);
  },

  "test draw circle should use canvas context arc and fill": function() {
    var arc = stubFn();
    var fill = stubFn();
    this.canvas.getContext = stubFn({ arc: arc, fill: fill });

    ethon.render_manager.init(this.canvas);
    ethon.render_manager.draw_circle(100, 100, 5);
    assertTrue(arc.called);
    assertEquals(6, arc.args.length);
    assertTrue(fill.called);
  }
});
