var Scene = (function() {
  var background;
  var asteroidFactory;
  var asteroids, maxAsteroids = 20;
  var player;
  var bullets;
  var bulletFactory;
  var fireTimer;
  var spawnTimer, spawnTime = 1;
  var i, l, j, ll;
  var restartGame;

  function init() {
    background = new Image();
    background.src = "images/background.png";

    player = new Player();
    player.init();
    player.im = this.input_manager;

    asteroidFactory = new AsteroidFactory();
    asteroids = [];
    for(i = 0; i < 5; i++) {
      asteroids.push(asteroidFactory.buildAsteroid(1));
    }

    bulletFactory = new BulletFactory();
    bullets = [];
    fireTimer = 0;
    spawnTimer = 0;

    restartGame = false;
  }

  function render(rm) {
    rm.drawImage(background, 0, 0);

    for(i = 0, l = asteroids.length; i < l; i++) {
      asteroids[i].render(rm);
    }

    for(i = 0, l = bullets.length; i < l; i++) {
      bullets[i].render(rm);
    }

    player.render(rm);
  }

  function update(dt) {
    for(i = 0, l = asteroids.length; i < l; i++) {
      asteroids[i].update(dt);
    }

    player.update(dt);

    for(i = 0, l = bullets.length; i < l; i++) {
      bullets[i].update(dt);
      if(!bullets[i].isAlive()) {
        delete bullets[i];
      }
    }

    for(j = 0, ll = asteroids.length; j < ll; j++) {
      if(collision(player.getRect(), asteroids[j].getRect())) {
        restartGame = true;
      }

      for(i = 0, l = bullets.length; i < l; i++) {
        if((bullets[i] !== undefined) && (asteroids[j] !== undefined) && collision(bullets[i].getRect(), asteroids[j].getRect())) {
          delete bullets[i];

          var new_size = asteroids[j].hit();
          if(new_size >= 0.25) {
            asteroids.push(asteroidFactory.buildAsteroid(new_size, asteroids[j].getPosition()));
            asteroids.push(asteroidFactory.buildAsteroid(new_size, asteroids[j].getPosition()));
          }
          if(!asteroids[j].isAlive()) {
            delete asteroids[j];
          }
        }
      }
    }

    bullets = bullets.filter(function(element) { return element !== undefined });
    asteroids = asteroids.filter(function(element) { return element !== undefined });
    
    fireTimer += dt;
    if(this.input_manager.isKeyDown(ethon.input_manager.KEY_SPACEBAR) 
        && fireTimer > player.getCadence()) { 
      bullets.push(bulletFactory.buildBullet(player)); 
      fireTimer = 0;
    }

    spawnTimer += dt;
    if(spawnTimer > spawnTime && asteroids.length < maxAsteroids) {
      asteroids.push(asteroidFactory.buildAsteroid(1));
      spawnTimer = 0;
    }

    if(restartGame) {
      this.init();
    }
  }

  function collision(rect1, rect2) {
    var x1_1 = rect1.x;
    var y1_1 = rect1.y;
    var x2_1 = rect1.x + rect1.w;
    var y2_1 = rect1.y + rect1.h;    
    var x1_2 = rect2.x;
    var y1_2 = rect2.y;
    var x2_2 = rect2.x + rect2.w;
    var y2_2 = rect2.y + rect2.h;

    return (x1_1 < x2_2) && (x2_1 > x1_2) && (y1_1 < y2_2) && (y2_1 > y1_2);
  }

  return {
    init: init,
    render: render,
    update: update
  };
});

