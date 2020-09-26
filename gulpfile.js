const gulp = require('gulp');
const jshint = require('gulp-jshint');

gulp.task('processHTML', () => {
	gulp.src('*.html')
		.pipe(gulp.dest('dist'));
});

gulp.task('processJS', () => {
	gulp.src('*.js')
		.pipe(jshint({
			esversion: 6
		}))
		.pipe(gulp.dest('dest'));
});

