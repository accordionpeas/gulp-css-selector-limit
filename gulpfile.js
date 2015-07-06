var gulp = require('gulp'),
	cssSelectorLimit = require('./index');

gulp.task('css-selector-limit', function(){
	return gulp.src('node_modules/css-selector-limit/tests/**/*.css')
		.pipe(cssSelectorLimit())
		.pipe(cssSelectorLimit.reporter('default'))
		.pipe(cssSelectorLimit.reporter('fail'));
});

gulp.task('default', ['css-selector-limit']);