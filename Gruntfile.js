/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    jshint: {
      options: grunt.file.readJSON('.jshintrc'),
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['src/**/*.js', 'test/**/*.js']
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "src/ethon",
          name: "main",
          paths: {
            ethon: ".",
            jquery: "../../bower_components/jquery/jquery"
          },
          mainConfigFile: "app.build.js",
          out: "dist/ethon.<%= pkg.version %>.js"
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: false,
        singleRun: true
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      jshint: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test']
      },
      karma: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['karma:unit:run'] //NOTE the :run flag
      }
    },
    plato: {
        options: {
            title: 'Ethon',
            jshint: grunt.file.readJSON('.jshintrc')
        },
        metrics: {
            files: {
                'dist/metrics': ['src/**/*.js']
            }
        }
    },
    clean: ['dist/*.js', 'dist/metrics']
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-plato');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task.
  grunt.registerTask('default', ['jshint', 'karma', 'clean', 'requirejs']);

};
