var player = (function() {
  var position, velocity;
  var rotation, rotationSpeed = 200;
  var speed, maxSpeed = 200;
  var bullets;
  var timer, cadence = 0.15; 
  var image;

  function init() {
    position = { x: 320, y: 250 };
    velocity = { x: 0, y: 0 };
    speed = rotation = 0;
    bullets = [];
    image = new Image();
    image.src = "images/ship.png";
    timer = 0;
  }

  function render(rm) {
    // Render bullets
    var i, l;
    for(i = 0, l = bullets.length; i < l; i++) {
      bullets[i].render(rm);
    }

    rm.drawImage(image, position.x, position.y, { rotate: rotation });
  }

  function update(dt) {
    // Update fire timer
    timer += dt;

    // Update bullets
    var i, l;
    var removeIndexes = [];
    for(i = 0, l = bullets.length; i < l; i++) {
      bullets[i].update(dt);
      if(!bullets[i].isAlive()) {
        removeIndexes.push(i);
      }
    }

    //TODO: this can be problematic
    for(i = 0, l = removeIndexes.length; i < l; i++) {
      bullets.splice(removeIndexes[i], 1);
    }

    if(this.im.isKeyDown(ethon.input_manager.KEY_SPACEBAR) && timer > cadence) { 
      var bulletDirection = { 
        x: -Math.cos(rotation * (Math.PI / 180)),
        y: Math.sin(rotation * (Math.PI / 180)),
      };
      var bulletPosition = { 
        x: position.x + image.width / 2,
        y: position.y + image.height / 2 
      };
      var b = bullet(bulletPosition, bulletDirection)
      b.init();
      bullets.push(b); 
      timer = 0;
    }

    if(this.im.isKeyDown(ethon.input_manager.KEY_LEFT_ARROW)) { 
      rotation -= rotationSpeed * dt; 
    }
    else if(this.im.isKeyDown(ethon.input_manager.KEY_RIGHT_ARROW)) { 
      rotation += rotationSpeed * dt; 
    }

    if(this.im.isKeyDown(ethon.input_manager.KEY_UP_ARROW)) {
      speed = maxSpeed;
    }
    else if(speed > 0) {
      speed -= 150 * dt;
    }

    velocity.y = -Math.cos(rotation * (Math.PI / 180)) * speed;
    velocity.x = Math.sin(rotation * (Math.PI / 180)) * speed;

    position.x += velocity.x * dt;
    position.y += velocity.y * dt;

    if(position.x > 640 + image.width) {
      position.x = -image.width;
    }
    else if(position.x < -image.width) {
      position.x = 640;
    }
    
    if(position.y > 480 + image.height) {
      position.y = 0;
    }
    else if(position.y < -image.height) {
      position.y = 480;
    }
  }

  return {
    init: init,
    render: render,
    update: update,
    position: position
  };
})();
