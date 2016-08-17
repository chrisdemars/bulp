'use strict';

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    cssmin      = require('gulp-cssmin'),
    rename      = require('gulp-rename'),
    prefix      = require('gulp-autoprefixer'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'js'], function() {

    browserSync.init({
        server: './',
        browser: "google chrome canary"
    });

    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});

// Configure CSS tasks.
gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Configure JS.
gulp.task('js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
  gulp.watch('dist/scss/**/*.scss', ['sass']);
  gulp.watch('dist/js/**/*.js', ['js']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve', 'sass', 'js']);
