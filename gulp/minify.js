var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
 
gulp.task('minifycss', function () {
    gulp.src('dist/css/**.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});