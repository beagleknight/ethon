module Ethon
  module Generators
    class GameGenerator < Rails::Generators::Base
      source_root File.expand_path("../templates/game", __FILE__)

      desc "Creates a Ethon game."

      argument :name, :required => true, :desc => "Game working name"

      def copy_views
        @name = name
        directory "app/views/", "app/views/#{name}"
        template "app/views/index.haml.erb", "app/views/#{name}/index.html.haml"
      end
    end
  end
end
