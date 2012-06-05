var AsteroidFactory = (function() {
  function buildAsteroid(size, position) {
    var asteroid;

    if(position === undefined) {
      asteroid = new Asteroid(size, { x: 640 * Math.random(), y: 480 * Math.random() }, 
          { x: 2 * Math.random() - 1, y: 2 * Math.random() - 1 });
    }
    else {
      asteroid = new Asteroid(size, { x: position.x, y: position.y }, 
          { x: 2 * Math.random() - 1, y: 2 * Math.random() - 1 });
    }
    asteroid.init();
    return asteroid;
  }

  return {
    buildAsteroid: buildAsteroid,
  }
});
