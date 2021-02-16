'use strict';
 
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
const jsdoc = require('gulp-jsdoc3');
const {src, task} = require('gulp');
const eslint = require('gulp-eslint');

sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./css/*.scss', gulp.series(['sass']));
});

gulp.task('serve', gulp.series(['sass'], function() {

  browserSync.init({
      server: "./"
  });

  gulp.watch("./css/*.scss", gulp.series(['sass']));
  gulp.watch("./index.html").on('change', browserSync.reload);
  gulp.watch("./js/*.js").on('change', browserSync.reload);
}));

gulp.task('doc', function (cb) {
  gulp.src(['README.md', './src/**/*.js'], {read: false})
      .pipe(jsdoc(cb));
});

task('default', () => {
  return src(['./js/*.js'])
      // eslint() attaches the lint output to the "eslint" property
      // of the file object so it can be used by other modules.
      .pipe(eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format())
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failAfterError last.
      .pipe(eslint.failAfterError());
}); 

gulp.task('default', gulp.series(['serve']));