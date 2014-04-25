var gulp          = require('gulp'),
    watch         = require('gulp-watch'),
    jshint        = require('gulp-jshint'),
    browserify    = require('gulp-browserify'),
    plumber       = require('gulp-plumber');

gulp.task('lint', function() {
    return gulp.src('src/**/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('build:js', function() {
    return gulp.src('src/js/main.js')
        .pipe(plumber())
        .pipe(browserify({
            standalone: 'ethon'
        }))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('build', [
    'lint',
    'build:js'
]);

gulp.task('dev', ['build'], function() {
    gulp.watch('src/**/*.js', ['build']);
});
