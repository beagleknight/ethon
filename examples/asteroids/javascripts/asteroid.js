var asteroid = (function(_scale, _position, _direction) {
  var position, velocity;
  var speed, maxSpeed = 100;
  var image;
  var scale;
  var alive;

  function init() {
    scale = _scale;
    alive = true;

    position = { x: _position.x, y: _position.y };
    velocity = { x: 0, y: 0 };
    speed = maxSpeed;
    image = new Image();
    image.src = "images/asteroid.png";

    velocity.y = _direction.x * speed;
    velocity.x = _direction.y * speed;
  }

  function render(rm) {
    rm.drawImage(image, position.x, position.y, { scale: [scale, scale] });
  }

  function update(dt) {
    position.x += velocity.x * dt;
    position.y += velocity.y * dt;

    if(position.x > 640 + image.width) {
      position.x = -image.width;
    }
    else if(position.x < -image.width) {
      position.x = 640 + image.width;
    }
    
    if(position.y > 480 + image.height) {
      position.y = - image.height;
    }
    else if(position.y < -image.height) {
      position.y = 480 + image.height;
    }
  }

  return {
    init: init,
    render: render,
    update: update
  };
});
