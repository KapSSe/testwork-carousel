var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var pump = require('pump');

 
gulp.task('minifycss', function () {
    gulp.src('dist/css/**.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minifyimg', function() {
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});
 
gulp.task('minifyjs', function (cb) {
  pump([
        gulp.src('dist/js/*.js'),
        uglify(),
        gulp.dest('dist/js/')
    ],
    cb
  );
});