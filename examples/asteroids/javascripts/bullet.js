var Bullet = (function(_position, _direction) {
  var position, velocity;
  var speed, maxSpeed = 500;
  var radius;
  var alive;

  function init() {
    alive = true;
    radius = 2;

    position = { x: _position.x, y: _position.y };
    velocity = { x: 0, y: 0 };
    speed = maxSpeed;

    velocity.y = _direction.x * speed;
    velocity.x = _direction.y * speed;
  }

  function render(rm) {
    //rm.drawBox(getRect().x, getRect().y, getRect().w, getRect().h, {
    //  fillStyle: "#00ff00"
    //});
    rm.drawCircle(position.x, position.y, radius, { fillStyle: "#ffff00" });
  }

  function update(dt) {
    position.x += velocity.x * dt;
    position.y += velocity.y * dt;

    if(position.x > 640 || position.x < 0 || position.y > 480 || position.y < 0) {
      alive = false;
    }
  }

  function isAlive() {
    return alive;
  }

  function getRect() {
    return {
      x: position.x - radius,
      y: position.y - radius,
      w: radius * 2,
      h: radius * 2
    }
  }

  return {
    init: init,
    render: render,
    update: update,
    isAlive: isAlive,
    getRect: getRect
  };
});
