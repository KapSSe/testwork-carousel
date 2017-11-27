var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', function () {
    runSequence(
        'copy',
        'minifycss',
        'minifyimg',
        'sass',
        'serve',
        'copy:watch',
        'sass:watch'
    );
});
