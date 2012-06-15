var Player = (function() {
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
    rm.drawBox(position.x, position.y, image.width, image.height, {
      fillStyle: "#00ff00"
    });
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
      speed -= 150 * dt;
    }

    velocity.y = -Math.cos(rotation * (Math.PI / 180)) * speed;
    velocity.x = Math.sin(rotation * (Math.PI / 180)) * speed;

    position.x += velocity.x * dt;
    position.y += velocity.y * dt;

    if(position.x > ethon.render_manager.getCanvasWidth() + image.width) {
      position.x = -image.width;
    }
    else if(position.x < -image.width) {
      position.x = ethon.render_manager.getCanvasWidth();
    }
    
    if(position.y > ethon.render_manager.getCanvasHeight() + image.height) {
      position.y = 0;
    }
    else if(position.y < -image.height) {
      position.y = ethon.render_manager.getCanvasHeight();
    }
  }

  function getCenter() {
    return {
      x: position.x + image.width / 2,
      y: position.y + image.height / 2
    };
  }

  function getCadence() {
    return cadence;
  }

  function getRotation() {
    return rotation;
  }

  function getRect() {
    return {
      x: position.x,
      y: position.y,
      w: image.width,
      h: image.height
    }
  }

  return {
    init: init,
    render: render,
    update: update,
    getCenter: getCenter,
    getCadence: getCadence,
    getRotation: getRotation,
    getRect: getRect
  };
});
