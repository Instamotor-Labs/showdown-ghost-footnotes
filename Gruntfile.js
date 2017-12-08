/**
 * Created by Estevao on 23-07-2015.
 */
module.exports = function (grunt) {
  'use strict';
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    pkgName: grunt.file.readJSON('package.json').name.split('/')[1],
    simplemocha: {
      test: {
        src: 'test/node.js',
        options: {
          globals:     ['should', 'showdown'],
          timeout:     3000,
          ignoreLeaks: false,
          reporter:    'spec'
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },
    concat: {
      options: {
        sourceMap: true,
        banner: ';/*! <%= pkgName %> <%= grunt.template.today("dd-mm-yyyy") %>',
      },
      dist: {
        src: [
          'src/*.js'
        ],
        dest: 'dist/<%= pkgName %>.js'
      }
    },
    uglify: {
      options: {
        sourceMap: true,
        banner: '/*! <%= pkgName %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkgName %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint', 'simplemocha']);
  grunt.registerTask('build', ['test', 'concat', 'uglify']);
  grunt.registerTask('default', ['build']);
};
