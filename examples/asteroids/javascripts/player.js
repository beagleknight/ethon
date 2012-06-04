var player = (function() {
  var position = { x: 0, y: 0 }, velocity;
  var rotation, rotationSpeed = 100;
  var speed, maxSpeed = 200;
  var image;

  function init() {
    image = new Image();
    image.src = "images/ship.png";
    position = { x: 320, y: 250 };
    velocity = { x: 0, y: 0 };
    speed = rotation = 0;
  }

  function render(rm) {
    rm.drawImage(image, position.x, position.y, { rotate: rotation });
  }

  function update(dt) {
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
      speed -= 50 * dt;
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
