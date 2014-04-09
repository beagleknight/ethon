var gulp          = require('gulp'),
    watch         = require('gulp-watch'),
    jshint        = require('gulp-jshint'),
    browserify    = require('gulp-browserify'),
    plumber       = require('gulp-plumber');

gulp.task('lint', function() {
    gulp.src('src/**/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('build', function() {
    gulp.src('src/js/main.js')
        .pipe(plumber())
        .pipe(browserify({
            standalone: 'ethon'
        }))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('default', function() {
    gulp.watch('src/**/*.js', ['lint', 'build']);
});
