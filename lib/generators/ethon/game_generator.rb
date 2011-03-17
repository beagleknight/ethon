module Ethon
  module Generators
    class GameGenerator < Rails::Generators::Base
      source_root File.expand_path("../templates/game", __FILE__)

      desc "Creates a Ethon game."

      argument :name, :required => true, :desc => "Game working name"

      def add_routes
        route "match '#{name.downcase}', :to => '#{name.downcase}#index'"
      end

      def copy_controller
        template "app/controllers/game_controller.rb", "app/controllers/#{name.downcase}_controller.rb"
      end

      def copy_views
        empty_directory "app/views/#{name.downcase}"
        template "app/views/index.html.haml", "app/views/#{name.downcase}/index.html.haml"
      end

      def copy_javascripts
        empty_directory "public/javascripts/#{name.downcase}"
        empty_directory "public/javascripts/#{name.downcase}/sprites"
        empty_directory "public/javascripts/#{name.downcase}/gui"
        empty_directory "public/javascripts/#{name.downcase}/sounds"
        empty_directory "public/javascripts/#{name.downcase}/font"
        template "public/javascripts/game/main.js", "public/javascripts/#{name.downcase}/main.js"
      end

      def show_readme
        readme "README" if behavior == :invoke
      end
    end
  end
end
