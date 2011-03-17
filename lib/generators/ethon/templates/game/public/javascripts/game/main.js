$(document).ready(function() {
  var game = $('#game').ethon({
    path: 'javascripts/<%= name.downcase %>/',
    init: function() {
      //your code goes here
      this.box = new Object2D(10,10,50,50);
      this.box.vel = new Vector2D(2,5);

      //main scene 
      this.scene_manager.add_scene('main', {
          init: function() {
            this.box = new Object2D(100,100,25,25);
            this.box.vel = new Vector2D(4,10);
          },
          draw: function() { //render function
            //draw global game box
            this.ethon.box.draw();
            // draw local scene box
            this.box.draw();
          },
          update: function(dt) { //update function
            //update global game box
            this.ethon.box.update();
            //update local scene box
            this.box.update();
          }
        }
      );
      // set active scene
      this.scene_manager.set_active('main');
    }
  });

  //start game
  game.start();
});
