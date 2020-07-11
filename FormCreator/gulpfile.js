'use strict';

var gulp = require('gulp');

var sass = require('gulp-sass');

gulp.task('sass', function(){
    return gulp.src('src/scss/*.scss')
      .pipe(sass()) // Converts Sass to CSS with gulp-sass
      .pipe(gulp.dest('dist/styles'))
  });

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var paths = {
    pages: ['src/*.html']
};

gulp.task('copy-html', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series(gulp.parallel('copy-html'), function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/index.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
}));