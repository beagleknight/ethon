require 'ethon'
require 'rails'

module Ethon
  class Engine < Rails::Engine
    initializer "static assets" do |app|
      if app.config.serve_static_assets
        app.middleware.insert 0, ::ActionDispatch::Static, "#{root}/public"
      end
    end

    rake_tasks do 
      load "fb_master_contest/railties/tasks.rake"
    end
  end
end
