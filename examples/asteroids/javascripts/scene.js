var scene = (function() {
  var asteroids;

  function init() {
    player.init();
    //TODO: I don't like this stuff
    player.im = this.input_manager;

    asteroids = [];
    var i;
    for(i = 0; i < 5; i++) {
      var a = asteroid(1, { x: 640 * Math.random(), y: 480 * Math.random() }, 
        { x: 2 * Math.random() - 1, y: 2 * Math.random() - 1 });
      a.init();
      asteroids.push(a);
    }
  }

  function render(rm) {
    var i, l;
    for(i = 0, l = asteroids.length; i < l; i++) {
      asteroids[i].render(rm);
    }
    player.render(rm);
  }

  function update(dt) {
    var i, l;
    for(i = 0, l = asteroids.length; i < l; i++) {
      asteroids[i].update(dt);
    }
    player.update(dt);
  }

  return {
    init: init,
    render: render,
    update: update
  };
})();

