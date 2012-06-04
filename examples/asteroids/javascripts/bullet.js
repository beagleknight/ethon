var bullet = (function(_position, _direction) {
  var position, velocity;
  var speed, maxSpeed = 500;
  var alive;

  function init() {
    alive = true;

    position = { x: _position.x, y: _position.y };
    velocity = { x: 0, y: 0 };
    speed = maxSpeed;

    velocity.y = _direction.x * speed;
    velocity.x = _direction.y * speed;
  }

  function render(rm) {
    rm.drawCircle(position.x, position.y, 2);
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

  return {
    init: init,
    render: render,
    update: update,
    isAlive: isAlive
  };
});
