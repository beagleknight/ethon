# encoding: utf-8
namespace :ethon do
  task :copy_assets do
    require 'rails/generators/base'
    origin      = File.join(Ethon::Engine.root, "public")
    destination = File.join(Rails.root, "public")
    Rails::Generators::Base.source_root(origin)
    copier = Rails::Generators::Base.new
    %w( stylesheets images javascripts ).each do |directory|
      Dir[File.join(origin,directory,'','*')].each do |file|
        relative = file.gsub(/^#{origin}\//, '')
        copier.copy_file(file, File.join(destination,relative))
      end
    end
  end
end
