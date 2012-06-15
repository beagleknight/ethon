var Asteroid = (function(_scale, _position, _direction) {
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
    rm.drawBox(getRect().x, getRect().y, getRect().w, getRect().h, {
      fillStyle: "#ff0000"
    });
    rm.drawImage(image, position.x, position.y, { scale: [scale, scale] });
  }

  function update(dt) {
    position.x += velocity.x * dt;
    position.y += velocity.y * dt;

    if(position.x > ethon.render_manager.getCanvasWidth() + image.width) {
      position.x = -image.width;
    }
    else if(position.x < -image.width) {
      position.x = ethon.render_manager.getCanvasWidth() + image.width;
    }
    
    if(position.y > ethon.render_manager.getCanvasHeight() + image.height) {
      position.y = - image.height;
    }
    else if(position.y < -image.height) {
      position.y = ethon.render_manager.getCanvasHeight() + image.height;
    }
  }

  function hit() {
    alive = false;
    return scale / 2;
  }

  function isAlive() {
    return alive;
  }

  function getPosition() {
    return position;
  }

  function getRect() {
    return {
      x: position.x,
      y: position.y,
      w: image.width * scale,
      h: image.height * scale
    }
  }

  return {
    init: init,
    render: render,
    update: update,
    hit: hit,
    isAlive: isAlive,
    getPosition: getPosition,
    getRect: getRect
  };
});
