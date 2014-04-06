var gulp          = require('gulp'),
    watch         = require('gulp-watch'),
    jshint        = require('gulp-jshint'),
    browserify    = require('gulp-browserify');

gulp.task('lint', function() {
    gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('build', function() {
    gulp.src('src/js/main.js')
        .pipe(browserify({
        }))
        .pipe(gulp.dest('./dist/js'));
});
