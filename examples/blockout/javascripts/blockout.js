$(function() {
  var paddle = (function() {
    var x, y;

    function init() {
      x = 200;
      y = 450;
    }

    function render(rm) {
      rm.drawBox(x, y, 100, 10);
    }

    function update(im, dt) {
      if(im.isKeyDown(ethon.input_manager.KEY_LEFT_ARROW) && x > 0) { 
        x -= 200 * dt; 
      }
      else if(im.isKeyDown(ethon.input_manager.KEY_RIGHT_ARROW) && x < 500 - 100) { 
        x += 200 * dt; 
      }
    }

    function getX() {
      return x;
    }

    function getY() {
      return y;
    }

    return {
      init: init,
      render: render,
      update: update,
      getX: getX,
      getY: getY
    };
  })();

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
    
    function update(im, dt) {
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

  var scene = (function() {
    function init() {
      paddle.init();
      ball.init();
    }

    function render(rm) {
      paddle.render(rm);
      ball.render(rm);
    }

    function update(dt) {
      var im = this.input_manager;
      paddle.update(im, dt);
      ball.update(im, dt);
      ball.checkPaddleCollision(paddle);

      if(ball.getY() + ball.getHeight() > 500) {
        init();
      }
    }

    return {
      init: init,
      render: render,
      update: update
    };
  })();

  var canvas = document.getElementById('game');
  var engine = ethon.engine;
  engine.init(canvas, 640, 480);
  engine.addScene("main", scene);
  engine.setActiveScene("main");
  engine.start();
});
