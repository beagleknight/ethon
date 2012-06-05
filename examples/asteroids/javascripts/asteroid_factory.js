var AsteroidFactory = (function() {
  function buildAsteroid(size, position) {
    var asteroid;

    if(position === undefined) {
      var asteroidPosition = {
        x: -200,
        y: 0
      };
      asteroid = new Asteroid(size, { x: asteroidPosition.x, y: asteroidPosition.y }, 
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
