module EthonHelper
  def javascript_include_tag_for_ethon
    files = [ 'jquery-1.4.4.min.js',
              'ethon/functions', 
              'ethon/vector2d.class.js', 
              'ethon/hash.class.js', 
              #'ethon/tile_map.class', 
              'ethon/timer.class.js', 
              'ethon/timer_manager.class.js', 
              'ethon/keyboard_input.class.js',
              'ethon/mouse_input.class.js',
              'ethon/event.class.js', 
              'ethon/timed_event.class.js', 
              'ethon/event_manager.class.js', 
              'ethon/object_2d.class.js', 
              'ethon/particle.class.js', 
              'ethon/explosion.class.js', 
              'ethon/sprite.class.js', 
              'ethon/render_manager.class.js', 
              'ethon/collision_manager.class.js',
              'ethon/sound_manager.class.js',
              'ethon/scene.class.js',
              'ethon/scene_manager.class.js',
              'ethon/texture_manager.class.js',
              'ethon/button.class.js',
              'ethon/ethon.class.js']

    includes = []
    files.each do |file|
      includes.push(javascript_include_tag file)
    end
    return includes.join("\n").html_safe
  end
end
