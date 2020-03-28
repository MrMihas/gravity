'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%'], { cascade: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app/css'));

});



gulp.task('minify-css', () => {
  return gulp.src('app/css/main.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('app/css/minify/'));
});

gulp.task('watch', function () {
  gulp.watch('app/sass/**/*.scss', gulp.series('sass'));
  gulp.watch('app/css/*.css', gulp.series('minify-css'));
});