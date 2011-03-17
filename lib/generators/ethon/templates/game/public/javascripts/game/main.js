$(document).ready(function() {
  var game = $('#game').ethon({
    path: '../javascripts/<%= name.downcase %>/',
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
            this.ethon.render_manager.basicShape(BOX,
              this.ethon.box.pos, 
              this.ethon.box.w, 
              this.ethon.box.h);
            // draw local scene box
            this.ethon.render_manager.basicShape(BOX,
              this.box.pos, 
              this.box.w, 
              this.box.h);
          },
          update: function(dt) { //update function
            //update global game box
            this.ethon.box.update();
            //update local scene box
            this.box.update();

            //check local scene ethon.box collision
            if(this.ethon.box.pos.x+this.ethon.box.w > 700 || this.ethon.box.pos.x < 0)
              this.ethon.box.vel.x = -this.ethon.box.vel.x;
            if(this.ethon.box.pos.y+this.ethon.box.h > 700 || this.ethon.box.pos.y < 0)
              this.ethon.box.vel.y = -this.ethon.box.vel.y;

            //check local scene box collision
            if(this.box.pos.x+this.box.w > 700 || this.box.pos.x < 0)
              this.box.vel.x = -this.box.vel.x;
            if(this.box.pos.y+this.box.h > 700 || this.box.pos.y < 0)
              this.box.vel.y = -this.box.vel.y;
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
