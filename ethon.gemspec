# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "ethon/version"

Gem::Specification.new do |s|
  s.name        = "ethon"
  s.version     = Ethon::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["David Morcillo"]
  s.email       = ["david@imesmes.com"]
  s.homepage    = "http://www.imesmes.com"
  s.summary     = %q{Rails engine wrapper for Ethon engine}
  s.description = %q{Ethon engine is an HTML5 game engine build with Javascript}

  s.rubyforge_project = "ethon"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  s.add_development_dependency "rspec"
end
