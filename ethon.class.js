/**
  Class Ethon
**/
var Ethon = (function(){
  //args: an object containing arguments for the singleton
  function Singleton(canvas, args) {
    console.log('Initializing game...');
    //set args variable to args passed or empty object if none provided.
    var args = args || {};

    this.init = args.init;
    this.draw = args.draw;
    this.update = args.update;
    this.elapsed_time = new Date();
    this.render_manager = new RenderManager(canvas);
    this.timer_manager = new TimerManager();
    
    //attributes
    this.debug = false;
    this.running = false;

    //methods
    this.start = function() {
      console.log('Game started!');
      this.init();
      this.timer_manager.addTimer('game_loop',this.loop, 1000/30);
      this.running = true; 
    };

    this.loop = function() {
      var ethon = Ethon.getInstance();

      var now = new Date();
      var elapsed_time = 
        new Date(now.getTime()-ethon.elapsed_time.getTime()).getMilliseconds()/1000; 
      ethon.elapsed_time = now;

      ethon.update(elapsed_time);
      ethon.draw();
    };
  }
   
  //this is our instance holder
  var instance;
 
  //this is an emulation of static variables and methods
  var _static = {
    name: 'Ethon',
    //This is a method for getting an instance
    //It returns a singleton instance of a singleton object
    getInstance: function (canvas, args){
      if (instance === undefined) {
        instance = new Singleton(canvas, args);
      }
      return instance;
    }
  };
  return _static;
})();
 
jQuery.fn.ethon = function(args) {
  return Ethon.getInstance(this, args);
}

//OLD Implementation, is like a zombie
//var Game = (function() {
//  var instance = null;
//
//  function PrivateConstructor(canvas) {
//    this.render = new Render(canvas);
//    this.eventManager = new EventManager();
//    this.collisionManager = new CollisionManager();
//    this.timerManager = new TimerManager();
//    this.debug_mode = false;
//    this.objects = new Hash();
//    this.counter = 0;
//    
//    this.addObject = function(name, object) {
//      if(this.objects.hasItem(name)) {
//        name = name+'_'+this.counter;
//        this.counter += 1;
//      }
//      object.name = name;
//      this.objects.setItem(name, object);
//    }
//
//    this.removeObject = function(name) {
//      this.objects.removeItem(name);
//    }
//
//    this.getObject = function(name) {
//      return this.objects.getItem(name);
//    }
//
//    this.draw = function() {
//      if(this.debug_mode) {
//        this.render.clear("#123456");
//      }
//      else {
//        this.render.clear();
//      }
//      for(var i in this.objects.items) {
//        this.objects.items[i].draw(this.render);
//        //this.render.drawText(i, this.objects.items[i].x, this.objects.items[i].y+this.objects.items[i].h+10);
//      }
//    }
//
//    this.update = function() {
//      for(var i in this.objects.items) {
//        if(this.objects.items[i].alive) {
//          this.objects.items[i].update();
//        }
//        else {
//          this.removeObject(i);
//        }
//      }
//    }
//
//    this.start = function() {
//      this.init();
//      this.intervalId = setInterval(this.loop, 1000/30);
//      this.running = true; 
//    }
//
//    this.stop = function() {
//      this.render.clear();
//      this.objects.clear();
//      this.timerManager.clear();
//      this.running = false;
//    }
//
//    this.pause = function() {
//      this.running = !this.running;
//      if(this.running) {
//        this.timerManager.resumeAllTimers();
//      }
//      else {
//        this.timerManager.stopAllTimers();
//      }
//    }
//
//    this.restart = function() {
//      this.stop();
//      clearInterval(this.intervalId);
//      this.start();
//    }
//  }
//
//  return new function() {
//    this.getInstance = function(canvas) {
//      if(instance == null) {
//        instance = new PrivateConstructor(canvas);
//        instance.constructor = null;
//      }
//      return instance;
//    }
//  }
//})();
//    
//jQuery.fn.game = function() {
//  return Game.getInstance(this);
//}
//
//$(document).keydown(onKeyDown);
//$(document).keyup(onKeyUp);
//
//function onKeyDown(event) {
//  Game.getInstance().eventManager.keyboardInput.onKeyDown(event);
//}
//
//function onKeyUp(event) {
//  Game.getInstance().eventManager.keyboardInput.onKeyUp(event);
//}
