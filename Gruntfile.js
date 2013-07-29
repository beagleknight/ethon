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
        ethon: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: {
                src: ['src/**/*.js', 'test/**/*.js']
            }
        },
        gruntfile: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: {
                src: 'Gruntfile.js'
            }
        }
    },
    karma: {
        unit: {
            configFile: 'config/karma.conf.js',
            background: true,
        },
        build: {
            configFile: 'config/karma.conf.js',
            background: false,
            singleRun: true
        }
    },
    requirejs: {
        compile: {
            options: {
                baseUrl: "src",
                name: "main",
                paths: {
                    jquery: "empty:",
                    ethon: "."
                },
                out: "ethon.js",
                optimize: "none"
            }
        }
    },
    watch: {
        all: {
            files: '<%= jshint.ethon.files.src %>',
            tasks: ['jshint', 'karma:unit:run', 'requirejs']
        }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task.
  grunt.registerTask('dev', ['karma:unit', 'watch']);
  grunt.registerTask('default', ['jshint', 'karma:build', 'requirejs']);

};
