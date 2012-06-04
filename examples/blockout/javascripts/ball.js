var ball = (function() {
  var x, y, radius, vx, vy;

  function init() {
    x = y = 100;
    radius = 10;
    vx = 200;
    vy = 300;
  }

  function render(rm) {
    rm.drawCircle(x, y, radius);
  }
  
  function update(dt) {
    x += vx * dt; 
    y += vy * dt; 

    if(x + 10 > 500 || x < 0) { vx = -vx }
    if(y + 10 > 500 || y < 0) { vy = -vy }
  }

  function checkPaddleCollision(paddle) {
    if((y + radius / 2) > paddle.getY() && x > paddle.getX() && x < paddle.getX() + 100) {
      vy = -vy;
      vx = Math.floor(-Math.random()*401 + Math.random()*401)
    }
  }

  function getY() {
    return y;
  }

  function getHeight() {
    return radius * 2;
  }

  return {
    init: init,
    render: render,
    update: update,
    checkPaddleCollision: checkPaddleCollision,
    getY: getY,
    getHeight: getHeight
  };
})();

