module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        qunit: {
            files: ['test/**/*.html']
        },

        watch: {
            files: ['test/*.js', 'test/*.html', 'src/*.js'],
            tasks: ['qunit']
        },

        jshint: {
            all: ['test/*.js', 'src/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', ['qunit', 'watch']);
    grunt.registerTask('hint', ['jshint']);

};