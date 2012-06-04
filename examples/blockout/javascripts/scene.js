var scene = (function() {
  function init() {
    paddle.init();
    ball.init();
    //TODO: I don't like this stuff
    paddle.im = this.input_manager;
  }

  function render(rm) {
    paddle.render(rm);
    ball.render(rm);
  }

  function update(dt) {
    paddle.update(dt);
    ball.update(dt);

    // Game logic
    ball.checkPaddleCollision(paddle);
    if(ball.getY() + ball.getHeight() > 500) {
      this.init();
    }
  }

  return {
    init: init,
    render: render,
    update: update
  };
})();

